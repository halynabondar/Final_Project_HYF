'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
}

function CountdownTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  return (
    <div className="flex justify-center">
      <div className="max-w-xl rounded-xl border-2 bg-indigo-500 px-4 py-2 text-center text-lg font-bold text-white shadow-xl">
        Tid Tilbage: {formatTime(timeLeft)}
      </div>
    </div>
  );
}

CountdownTimer.propTypes = {
  duration: PropTypes.number.isRequired,
  onTimeUp: PropTypes.func.isRequired,
};

export default CountdownTimer;
