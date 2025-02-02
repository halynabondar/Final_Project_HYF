'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
}

function CountdownTimer({ duration, startTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(duration - elapsed, 0);
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="flex justify-center py-2">
      <div className="w-full max-w-xl rounded-xl border-2 bg-blue-400 p-0 px-10 py-2 text-center text-lg font-bold text-white shadow-xl duration-500 hover:bg-blue-500 sm:w-full sm:px-4 sm:py-2">
        <span className="hidden sm:inline">Tid Tilbage: </span>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}

CountdownTimer.propTypes = {
  duration: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  onTimeUp: PropTypes.func.isRequired,
};

export default CountdownTimer;
