import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

// GET endpoint: Fetch user by ID
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    // Fetch the user with the given id
    const user = await knex('users').where({ email: id }).first();

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

// PUT endpoint: Update user data
export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  try {
    const updatesRows = await knex('users').where({ id }).update(body);

    if (!updatesRows) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const updateUser = await knex('users').where({ id }).first();
    return NextResponse.json(updateUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
