import { NextResponse } from 'next/server';
import knex from '@/app/api/knex';
import { auth } from '@/auth';


export async function GET() {

  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    }

    

    const questions = await knex('questions')
      .select('id', 'question', 'answers')
      .orderByRaw('RANDOM()')
      .limit(45);

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
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userAnswers } = await req.json();
    const finalUserId = session.user.id;
    console.log(finalUserId)

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
    console.error('Error processing request:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

