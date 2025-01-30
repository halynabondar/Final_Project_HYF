import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import knex from '@/app/api/knex';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials:', credentials);

        try {
          const { email, password } = credentials;

          const user = await knex('users')
            .select('email', 'password')
            .where({ email })
            .first();

          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Compare hashed password using bcrypt
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error('Invalid email or password');
          }

          return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
          console.error('Error fetching user:', error.message);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
