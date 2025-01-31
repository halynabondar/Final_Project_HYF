import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';

export async function GET() {
  try {
    const questions = await knex('questions')
      .select('id', 'question', 'answers')
      .orderByRaw('RANDOM()')
      .limit(40);

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const { user_id, userAnswers } = await req.json();

    const finalUserId = user_id;

    const questionIds = Object.keys(userAnswers).map(Number);

    const questions = await knex('questions')
      .whereIn('id', questionIds)
      .select('id', 'question', 'answers', 'correctanswer');

    const results = questions.map((question) => ({
      id: question.id,
      question: question.question,
      answers: question.answers,
      correctAnswer: question.correctanswer,
      userAnswer: userAnswers[question.id],
      isCorrect: userAnswers[question.id] === question.correctanswer,
    }));

    const score = results.filter((result) => result.isCorrect).length;
    const wrong_answers = questions.length - score;

    await knex('result_history').insert({
      user_id: finalUserId,
      score,
      wrong_answers,
    });

    return NextResponse.json({ results, score });
  } catch (error) {
    console.error('Error validating answers:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
