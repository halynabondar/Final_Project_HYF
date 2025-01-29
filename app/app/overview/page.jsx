'use client';
import { useState } from 'react';
import clsx from 'clsx';

const OverviewPage = () => {
  const [questions] = useState(
    Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      answered: i === 0, //first question as answered
    })),
  );

  const handleQuestionClick = (id) => {
    console.log(`Question ${id} clicked.`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-10 ">
      <div className="flex max-w-7xl flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        {/* Left Section: Text */}
        <div className="w-full md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">Din spørgsmåloversigt</h1>
          <p className="text-lg">
            Spørgsmåloversigten giver dig et overblik over dine besvarede og
            ubesvarede spørgsmål. Du skal trykke på et nummer for at gå til
            spørgsmålet.
          </p>
          <div>
            <div className="mb-2 flex items-center">
              <div className="mr-2 mt-7 size-6 rounded border border-gray-500 p-2"></div>
              <span className="mt-7 ">Ikke besvaret</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 mt-1 size-6 rounded bg-gray-400 p-2"></div>
              <span className="mt-1 ">Besvaret</span>
            </div>
          </div>
        </div>

        {/* Right Section: Grid */}
        <div className="w-1/2">
          <div
            className="grid gap-4 "
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(2.5rem, 1fr))',
            }}
          >
            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                className={clsx(
                  'aspect-square rounded border border-gray-500 text-center',
                  {
                    'bg-gray-400 border-gray-400': question.answered, // answered
                    'border-gray-500': !question.answered, //not answered
                  },
                )}
              >
                {question.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
