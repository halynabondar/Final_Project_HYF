'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Overview = ({ questions, userAnswers, onQuestionClick }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const userAnswersById = {};
      questions.forEach((question, index) => {
        userAnswersById[question.id] = userAnswers[index];
      });

      const user_id = sessionStorage.getItem('user_id') || 5; // Temporary user ID until authentication is implemented

      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, userAnswers: userAnswersById }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }

      const data = await response.json();

      sessionStorage.setItem('score', data.score);
      sessionStorage.setItem('results', JSON.stringify(data.results));
      sessionStorage.setItem('totalQuestions', questions.length);

      window.location.href = '/result';
    } catch (error) {
      console.error('Error submitting answers:', error.message);
      alert('There was an error submitting your answers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <div className=" flex max-w-4xl flex-col  gap-20 space-y-8 rounded-lg  p-6 sm:flex-row sm:space-x-6 sm:space-y-0">
        <div className="w-full ">
          <h1 className="mb-6 text-center text-2xl font-bold text-blue-600 sm:text-left sm:text-2xl">
            Din Spørgsmålsoversigt
          </h1>
          <p className="mb-10 text-center text-lg text-gray-700 sm:text-left sm:text-xl">
            Spørgsmåloversigten giver dig et overblik over dine besvarede og
            ubesvarede spørgsmål. Tryk på et nummer for at gå til spørgsmålet.
          </p>
          <div className="flex justify-center sm:justify-start">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 size-8 rounded-md border border-gray-500 bg-white"></div>
                <span className="text-gray-600">Ikke besvaret</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 size-8 rounded-md bg-gray-400"></div>
                <span className="text-gray-600">Besvaret</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-3xl sm:w-1/2">
          <div
            className="grid gap-5 p-2
           "
            style={{
              gridTemplateColumns: 'repeat(5, minmax(2.5rem, 1fr))',
            }}
          >
            {questions.map((_, index) => (
              <button
                key={index}
                className={` flex size-10 items-center justify-center rounded-md border text-sm font-medium ${
                  userAnswers[index]
                    ? 'bg-gray-400 text-white'
                    : 'border-gray-300 bg-white text-black hover:bg-gray-200'
                }`}
                onClick={() => onQuestionClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Indsender...' : 'Indsend svar'}
        </button>
      </div>
    </section>
  );
};

Overview.propTypes = {
  questions: PropTypes.array.isRequired,
  userAnswers: PropTypes.object.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
};

export default Overview;
