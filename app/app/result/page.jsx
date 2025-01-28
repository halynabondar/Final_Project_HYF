'use client';
import clsx from 'clsx';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useEffect, useState } from 'react';

const ResultsPage = () => {
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await fetch('/api/results');
        if (!res.ok) {
          throw new Error('Failed to load results, please try again later');
        }
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      }
    };
    getResults();
  }, []);
  return (
    <section className="mx-auto max-w-4xl rounded-2xl p-4 sm:p-6 lg:p-10">
      <h1 className="text-center text-xl font-semibold sm:text-2xl">
        Dine Resultater
      </h1>
      {error ? (
        <div className="mt-6 text-center text-red-500">
          <p className="text-lg font-semibold">Noget gik galt!</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="mb-10 rounded-lg p-6 shadow-md">
            <div className="overflow-x-auto">
              <Table className="w-full border-collapse border border-gray-300 text-center">
                <TableHead>
                  <TableRow className="bg-gray-200">
                    <TableCell className="border border-gray-300 px-4 py-2 font-bold">
                      Dato
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2 font-bold">
                      Bruger
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2 font-bold">
                      Korrek
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2 font-bold">
                      Ukorrekt
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="border border-gray-300 px-4 py-2">
                        {new Date(result.test_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">
                        {result.user_name}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">
                        {result.score}
                      </TableCell>
                      <TableCell className="border border-gray-300 px-4 py-2">
                        {result.wrong_answers}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-md">
            <h2 className="mb-5 text-center text-xl font-semibold sm:text-2xl">
              Forkerte svar
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-lg bg-gray-200 p-4">
                  <h3 className="mb-2 text-base font-semibold text-black sm:text-lg">
                    {index + 1}. Question
                  </h3>
                  <p className="text-red-500">
                    <span className="font-semibold">Dit svar: </span>A : Spain
                  </p>
                  <p className="font-semibold text-green-500">
                    <span>Korrekt svar: </span>C : Germany
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ResultsPage;
