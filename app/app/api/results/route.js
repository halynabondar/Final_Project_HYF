import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      );
    }

    const result = await knex('result_history')
      .where({ user_id: userId })
      .select('*');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching results:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
