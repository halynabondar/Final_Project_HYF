import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

export async function GET() {
  try {
    const result = await knex('result_history').select('*');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching results:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
