import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from './supabase';
import * as bcrypt from 'bcryptjs';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

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
          const isValid = await bcrypt.compare(credentials.password, user.password || '');
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            wholesaleApproved: user.wholesale_approved,
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
        token.wholesaleApproved = user.wholesaleApproved;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.role = token.role;
      session.user.wholesaleApproved = token.wholesaleApproved;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-key-change-in-production',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
