import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

export async function GET(req, { params }) {
  const { id } = params; // Extract `id` from the URL

  try {
    // Fetch the user with the given id
    const user = await knex('users').where({ id }).first();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
