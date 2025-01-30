import { NextResponse } from 'next/server';
import { saltAndHashPassword } from '@/utils/password';
import { db } from '@/utils/db';

export async function POST(req) {
  try {
    const {
      first_name,
      last_name,
      country,
      town,
      address,
      phone_number,
      email,
      password,
    } = await req.json();

    // Basic validation
    if (
      !first_name ||
      !last_name ||
      !country ||
      !town ||
      !address ||
      !phone_number ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      );
    }

    // Hash password and generate salt
    const hash = await saltAndHashPassword(password);

    // Save user to database
    await db('users').insert({
      first_name,
      last_name,
      country,
      town,
      address,
      phone_number,
      email,
      password_hash: hash,
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
