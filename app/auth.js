import NextAuth from 'next-auth';
import { ZodError } from 'zod';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './lib/zod';
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from '@/utils/password';
import { verifyPassword } from '@/utils/password';
import { getUserFromDb } from '@/utils/db';
import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from '@neondatabase/serverless';
import type { Provider } from "next-auth/providers";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return {
    adapter: PostgresAdapter(pool),
    providers: [
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          try {
            let user = null;

            const { email, password } =
              await signInSchema.parseAsync(credentials);

            // logic to salt and hash password
            const pwHash = saltAndHashPassword(password);

            // logic to verify if the user exists
            user = await getUserFromDb(email, pwHash);

            if (!user) {
              throw new Error('Invalid credentials.');
            }

            // Verify the password
            const isValid = await verifyPassword(password, user.password);
            if (!isValid) {
              throw new Error('Invalid credentials.');
            }

            // return JSON object with the user data
            return user;
          } catch (error) {
            if (error instanceof ZodError) {
              // Return `null` to indicate that the credentials are invalid
              return null;
            }
            throw error;
          }
        },
      }),
    ],
    pages: {
      signIn: "/signin",
      error: "/error",
    },
    callbacks: {
      authorized: async ({ auth }) => {
        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth;
      },
    },
  };
});

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      };
    },
  })
];

export const providerMap = providers
    .map((provider) => {
      if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
      } else {
        return { id: provider.id, name: provider.name }
      }
    })
    .filter((provider) => provider.id !== "credentials")
