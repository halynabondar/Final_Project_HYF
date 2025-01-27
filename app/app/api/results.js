import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

export async function GET() {
  try {
    // Fetch results from the 'result_history' table.
    const results = await knex('result_history')
      .join('users', 'result_history.user_id', '=', 'users.id')
      .select(
        'result_history.id',
        'users.name as user_name',
        'result_history.score',
        'result_history.wrong_answers',
        'result_history.test_date',
      )
      .orderBy('test_date', 'desc');

    // Return the results as JSON.
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
