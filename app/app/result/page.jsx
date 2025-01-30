'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const Results = () => {
  const [score, setScore] = useState(null);
  const [results, setResults] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const score = sessionStorage.getItem('score');
    const results = sessionStorage.getItem('results');
    const totalQuestions = sessionStorage.getItem('totalQuestions');

    if (score && results && totalQuestions) {
      setScore(score);
      setResults(JSON.parse(results));
      setTotalQuestions(totalQuestions);
    }

    const date = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setCurrentDate(date);
  }, []);

  const handleTakeAnotherTest = () => {
    sessionStorage.clear();
  };

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="text-center text-2xl font-bold text-blue-600">
        Dine resultater
      </h1>

      <div className="mt-6 w-full overflow-hidden rounded-lg border shadow-md">
        <Table className="w-full bg-white text-gray-600">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell
                className="p-4 font-bold"
                style={{ border: '1px solid #ddd' }}
              >
                Dato
              </TableCell>
              <TableCell
                className="p-4 font-bold"
                style={{ border: '1px solid #ddd' }}
              >
                Bruger
              </TableCell>
              <TableCell
                className="p-4 font-bold"
                style={{ border: '1px solid #ddd' }}
              >
                Korrekt
              </TableCell>
              <TableCell
                className="p-4 font-bold"
                style={{ border: '1px solid #ddd' }}
              >
                Ukorrekt
              </TableCell>
              <TableCell
                className="p-4 font-bold"
                style={{ border: '1px solid #ddd' }}
              >
                Resultater
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="p-4" style={{ border: '1px solid #ddd' }}>
                {currentDate}
              </TableCell>
              <TableCell className="p-4" style={{ border: '1px solid #ddd' }}>
                Nav
              </TableCell>
              <TableCell className="p-4" style={{ border: '1px solid #ddd' }}>
                {score}
              </TableCell>
              <TableCell className="p-4" style={{ border: '1px solid #ddd' }}>
                {totalQuestions - score}
              </TableCell>
              <TableCell
                className="p-4 text-blue-500"
                style={{ border: '1px solid #ddd' }}
              >
                ✅ Done
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 rounded-lg bg-gray-100 p-6">
        <h2 className="text-center text-xl font-bold text-blue-600">
          Forkerte svar
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {results
            .filter((result) => !result.isCorrect)
            .map((result) => (
              <div key={result.id} className="rounded-lg  p-4">
                <h3 className="rounded bg-blue-300 p-2 text-center font-semibold">
                  {result.question}
                </h3>
                <div className="mt-2">
                  <p className="text-red-600">
                    Dit svar: {result.answers[result.userAnswer]}
                  </p>
                  <p className="text-green-600">
                    Korrekt svar: {result.answers[result.correctAnswer]}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleTakeAnotherTest}
          className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        >
          <Link href="/test">Genstart</Link>
        </button>
      </div>
    </section>
  );
};

export default Results;
