import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

// GET endpoint: Fetch user by ID
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

// PUT endpoint: Update user data
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.body;

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

// POST endpoint: Update image
export async function POST(req, { params }) {
  const { id } = params;

  try {
    const formData = await req.formData();
    const file = formData.get('image');

    console.log(`Received file for user ID: ${id}`, file);

    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 },
    );
  }
}
