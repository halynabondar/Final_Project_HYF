import { getUserFromDb } from '@/utils/db';
import { NextResponse } from 'next/server';
import { verifyPassword } from '@/utils/password';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Fetch user from DB
    const user = await getUserFromDb(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(
      password,
      user.salt,
      user.password_hash,
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // Login successful
    return NextResponse.json(
      { message: 'Login successful', user: { email: user.email } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
