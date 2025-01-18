import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

export async function GET() {
  try {
    await knex('data').insert({ data: 'test' });
    const data = await knex('data').select('*');

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching questions:', err.message);

    return NextResponse.error(err);
  }
}
