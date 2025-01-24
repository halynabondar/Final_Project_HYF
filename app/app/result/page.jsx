import React from 'react'
import clsx from 'clsx'
import { style } from '@/app/style';
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';


export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow-xl">
      <h1 className='text-center'>Dine Resultater</h1>

      {/* User Results Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <TableContainer>
          <Table className="w-full border-collapse border border-gray-300 text-center ">
            {/* Table Header */}
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

            {/*Table Body */}

            <TableBody>
              <TableRow>
                <TableCell className="border border-gray-300 px-4 py-2">12.3.2024</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2 flex items-center justify-center gap-2">
                  <span>Full Name</span>
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">36</TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">4</TableCell>
              </TableRow>
            </TableBody>
          </ Table>
        </TableContainer>
      </div>

      {/* Incorrect Answers Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className='text-center text-black text-bold'>Forkerte svar</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Example of One Answer Block */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={clsx(
                'p-4 rounded-lg bg-gray-100'
              )}
            >
              {/* question  */}
              <h3
                className={clsx(
                  'text-lg font-semibold mb-2',
                  'text-black'
                )}
              >
                {index + 1}. Question
              </h3>
              <p className="text-red-500">
                <span className="font-semibold">Dit svar: </span>
                A : Spain
              </p>
              <p
                className={clsx(
                  'text-green-500',
                  'font-semibold'
                )}
              >
                <span>Korrekt svar: </span>
                C : Germany
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}