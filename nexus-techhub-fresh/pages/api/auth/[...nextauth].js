import NextAuth from 'next-auth';
import { supabase } from '../../../lib/supabase';

export default NextAuth({
  providers: [
    // Supabase Auth Provider
    {
      id: 'supabase',
      name: 'Supabase',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            console.error('Supabase auth error:', error);
            return null;
          }

          if (data.user) {
            // Get additional user data from our users table
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('email', data.user.email)
              .single();

            if (userError) {
              console.error('Error fetching user data:', userError);
            }

            return {
              id: data.user.id,
              email: data.user.email,
              name: userData ? `${userData.first_name} ${userData.last_name}` : data.user.email,
              image: null,
              role: userData?.is_admin ? 'admin' : 'user',
              firstName: userData?.first_name,
              lastName: userData?.last_name,
              phone: userData?.phone,
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    },
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      // Clear any Supabase session
      await supabase.auth.signOut();
    },
  },
});
