import '../globals.css';
import clsx from 'clsx';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ResultsPage = () => {
  return (
    <section className="mx-auto max-w-4xl rounded-2xl p-10">
      <h1 className="text-center text-2xl font-semibold">Dine Resultater</h1>

      {/* User Results Table */}
      <div className="mb-10 rounded-lg p-6 shadow-md">
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
                <TableCell className="border border-gray-300 px-4 py-2">
                  12.3.2024
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2">
                  <span>Full Name</span>
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  36
                </TableCell>
                <TableCell className="border border-gray-300 px-4 py-2">
                  4
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Incorrect Answers Section */}
      <div className="rounded-lg p-6 shadow-md">
        <h2 className="text-center  text-2xl font-semibold">Forkerte svar</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Example of One Answer Block */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={clsx('rounded-lg bg-gray-200 p-4')}>
              {/* question  */}
              <h3 className={clsx('mb-2 text-lg font-semibold', 'text-black')}>
                {index + 1}. Question
              </h3>
              <p className="text-red-500">
                <span className="font-semibold">Dit svar: </span>A : Spain
              </p>
              <p className={clsx('text-green-500', 'font-semibold')}>
                <span>Korrekt svar: </span>C : Germany
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
