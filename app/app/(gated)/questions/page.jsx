'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '@/components/Questioncard';
import PreviousNext from '@/components/Prevnext';
import Button from '@/components/Button';
import CountdownTimer from '@/components/Countdowntimer';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Overview from '../../../components/Overview';
import handleSubmit from '@/components/Handlesubmit';

const apiUrl = '/api/questions';

function Exam() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOverview, setIsOverview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
        setError(null);
      } catch {
        setError(
          'Unable to fetch questions. Please check your internet connection or try again later.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const newStartTime = Date.now();
    setStartTime(newStartTime);
    localStorage.setItem('startTime', newStartTime);

    return () => {
      localStorage.removeItem('startTime');
    };
  }, []);

  const handleAnswer = (answer) => {
    const updatedAnswers = { ...userAnswers, [currentQuestionIndex]: answer };
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      speechSynthesis.cancel();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      speechSynthesis.cancel();
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setIsOverview(false);
  };

  const handleOverviewButtonClick = () => {
    setIsOverview(true);
  };

  if (isOverview) {
    return (
      <Overview
        questions={questions}
        userAnswers={userAnswers}
        onQuestionClick={handleQuestionClick}
        setIsSubmitting={setIsSubmitting}
        handleSubmit={handleSubmit}
        timeExpired={timeExpired}
      />
    );
  }

  if (isSubmitting) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <AutorenewIcon
          className="animate-spin text-blue-500"
          style={{ fontSize: 40 }}
        />
        {'Submitting...'}
      </div>
    );
  }

  const timeUpSubmit = () => {
    setIsOverview(true);
    setTimeExpired(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <AutorenewIcon
          className="animate-spin text-blue-500"
          style={{ fontSize: 40 }}
        />
        {'Loading...'}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-center">
        <div className="max-w-md rounded-lg bg-red-100 p-5 text-red-700">
          <h2 className="text-lg font-bold">Error</h2>
          <p>{error}</p>
          <Button
            styles="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => window.location.reload()}
            value="Try again"
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion.answers;
  const selectedAnswer = userAnswers[currentQuestionIndex] || null;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:flex-row">
      <div className="absolute left-1/2 top-4 flex w-full max-w-[740px] -translate-x-1/2 flex-col items-center sm:flex-row sm:justify-between">
        <div className="flex w-full items-center justify-between">
          <CountdownTimer
            duration={2700}
            startTime={startTime}
            onTimeUp={timeUpSubmit}
          />
          <div className="ml-4">
            <Button
              variant="primary"
              value="Oversigt"
              onClick={handleOverviewButtonClick}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-4xl rounded-xl p-6 sm:p-10">
        <QuestionCard
          question={currentQuestion.question}
          answers={answers}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
        />

        <div className="mt-4 sm:mt-5">
          <PreviousNext
            showPrevious={currentQuestionIndex > 0}
            showNext={currentQuestionIndex < questions.length - 1}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center text-center text-sm text-gray-600 sm:mt-5">
          <strong>
            {currentQuestionIndex + 1} / {questions.length}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default Exam;
