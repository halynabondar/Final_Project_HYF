import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserFromDb } from '@/utils/db';
import { verifyPassword } from '@/utils/password';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await getUserFromDb(credentials.email);

          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Compare hashed password using bcrypt
          const isValidPassword = await verifyPassword(
            credentials.password,
            user.password_hash,
          );
          if (!isValidPassword) {
            throw new Error('Invalid email or password');
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          console.error('Error fetching user:', error.message);
          return null;
        }
      },
      pages: {
        signIn: '/signin',
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
});
