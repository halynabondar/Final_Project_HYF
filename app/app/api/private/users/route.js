import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const result = await knex('users');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
