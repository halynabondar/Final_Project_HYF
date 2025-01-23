import React from 'react'
import clsx from 'clsx'
import { style } from '@/app/style';


export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow-xl">
      <h1 className={`${style.heading} text-center`}>Dine Resultater</h1>

      {/* User Results Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Dato</th>
              <th className="border border-gray-300 px-4 py-2">Bruger</th>
              <th className="border border-gray-300 px-4 py-2">Korrekt</th>
              <th className="border border-gray-300 px-4 py-2">Ukorrekt</th>
              <th className="border border-gray-300 px-4 py-2">Resultater</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">12.3.2024</td>
              <td className="border border-gray-300 px-4 py-2 flex items-center justify-center gap-2">
                <img
                  src=""
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <span>Full Name</span>
              </td>
              <td className="border border-gray-300 px-4 py-2">36</td>
              <td className="border border-gray-300 px-4 py-2">4</td>
              <td
                className={clsx(
                  'border border-gray-300 px-4 py-2 font-semibold',
                  'text-blue-500' 
                )}
              >
                ✔ Done
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Incorrect Answers Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-6">Forkerte svar</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Example of One Answer Block */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={clsx(
                'p-4 rounded-lg',
                index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
              )}
            >
              <h3
                className={clsx(
                  'text-lg font-semibold mb-2',
                  'text-blue-800' 
                )}
              >
                {8 + index * 4}. Question
              </h3>
              <p className="text-red-500">
                <span className="font-semibold">Dit svar: </span>
                lalalalalalalala
              </p>
              <p
                className={clsx(
                  'text-green-500',
                  'font-semibold' 
                )}
              >
                <span>Korrekt svar: </span>
                dududududududududdu
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}