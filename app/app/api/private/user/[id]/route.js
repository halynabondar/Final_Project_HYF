import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';
import { auth } from '@/auth';

// GET endpoint: Fetch user by ID
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
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

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    // Fetch the user with the given id
    const user = await knex('users').where({ email: id }).first();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // delete related content
    // auth records
    await knex('accounts').where({ userId: user.id }).del();
    await knex('sessions').where({ userId: user.id }).del(); // should also destroy session
    // test related data
    await knex('result_history').where({ user_id: user.id }).del();
    await knex('test_sessions').where({ user_id: user.id }).del();
    // delete user itself
    await knex('users').where({ id: user.id }).del();

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
