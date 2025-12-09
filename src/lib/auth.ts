import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabaseClient';
import { AuthError } from './errors';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from './supabaseClient';
import * as bcrypt from 'bcryptjs';

// =============================================================================
// Nexus Tech Hub - Authentication Utilities
// =============================================================================

/**
 * Get user from Supabase auth token in cookies
 * @param req Optional Request object for API routes
 */
export async function getUserFromCookie(req?: Request) {
  try {
    let token: string | undefined;

    if (req) {
      // Extract token from request cookies
      const cookieHeader = req.headers.get('cookie');
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        token = cookies['supabase-auth-token'];
      }
    } else {
      // Use Next.js cookies API for server components/middleware
      const cookieStore = cookies();
      token = cookieStore.get('supabase-auth-token')?.value;
    }

    if (!token) {
      throw new AuthError('No authentication token provided');
    }

    // Verify the session using the service role client
    const { data: { user }, error: sessionError } = await supabaseAdmin.auth.getUser(token);

    if (sessionError || !user) {
      throw new AuthError('Invalid or expired session');
    }

    return user;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Authentication failed');
  }
}

/**
 * Get user profile with role information
 */
export async function getUserProfile(userId: string) {
  const { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new AuthError('Failed to fetch user profile');
  }

  return profile as any;
}

/**
 * Check if user has admin role
 * @param userId User ID to check admin role for
 */
export async function requireAdmin(userId: string) {
  const profile = await getUserProfile(userId);

  if (profile.role !== 'admin') {
    throw new AuthError('Admin access required', 403);
  }

  return profile;
}

// =============================================================================
// NextAuth Configuration
// =============================================================================

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-client-secret',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Query user from Supabase
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (error || !user) return null;

          // For demo purposes, we're using bcrypt to compare passwords
          // In production, Supabase Auth handles this automatically
          const userData = user as any;
          const isValid = await bcrypt.compare(credentials.password, userData.password || '');
          if (!isValid) return null;

          return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            wholesaleApproved: userData.wholesale_approved,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.wholesaleApproved = user.wholesale_approved;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.role = token.role;
      session.user.wholesaleApproved = token.wholesale_approved;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-key-change-in-production',
};
