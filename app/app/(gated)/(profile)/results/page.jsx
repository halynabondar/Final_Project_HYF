'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const columns = [
  { id: 'dato', label: 'Dato', minWidth: 100, align: 'center' },
  {
    id: 'korrekt',
    label: 'Korrekt',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'ukorrekt',
    label: 'Ukorrekt',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'resultater',
    label: 'Resultater',
    minWidth: 100,
    align: 'center',
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/private/results?userId=${userId}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch results: ${errorText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);

        const formattedRows = data.map((item) => ({
          dato: new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).format(new Date(item.test_date)),
          korrekt: item.score,
          ukorrekt: item.wrong_answers,
          resultater:
            item.score > 38 ? (
              <DoneIcon className="text-green-600" />
            ) : (
              <CloseIcon className="text-red-600" />
            ),
        }));

        setRows(formattedRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);
  // Fetch data from the database
  useEffect(() => {
    if (status === 'loading') return; // Wait until session is resolved

    const fetchUserData = async () => {
      const response = await fetch(`/api/private/user/${session.user.email}`);
      if (response.ok) {
        const userData = await response.json();
        setUserId(userData.id);
      }
    };

    fetchUserData();
  }, [session.user.email, status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {loading ? (
        <div className="flex items-center justify-center p-5 text-lg">
          <AutorenewIcon className="mr-2" />
          Loading...
        </div>
      ) : (
        <>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="bg-blue-50 font-bold text-gray-700">
                <TableRow className="bg-blue-50 font-bold text-gray-700">
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className="bg-blue-50 font-bold text-gray-700"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="bg-white">
                {rows.length === 0 && !loading && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      className="text-lg text-gray-700"
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      className="text-gray-700"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            className="text-gray-700"
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[4, 8]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
