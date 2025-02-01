'use client';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@/components/Button';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function DeleteAccount() {
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/private/user/${session.user.email}`);
        const data = await response.json();
        setUserId(data.email);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'loading') return;

    fetchUserData();
  }, [session.user.email, status]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Er du sikker på, at du vil slette din konto?',
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/private/user/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        setTimeout(() => {
          // make sure the session indeed terminated, also force a redirection
          signOut();
        }, 3000);
      }

      setMessage(data?.message);
      alert(message); // TODO: add a snackbar instead
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-5 text-lg">
        <AutorenewIcon className="mr-2" />
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-blue-50 p-5 shadow-xl">
        <div className="flex size-14 items-center justify-center rounded-full bg-blue-100">
          <DeleteForeverIcon className="text-3xl text-red-500" />
        </div>
        <h1 className="my-1 text-3xl font-bold">Slet konto</h1>
        <p className="text-center text-lg text-red-700">
          <b>ADVARSEL</b>
          <br /> dette er permanent og kan ikke fortrydes!
        </p>
        <div className="">
          <label htmlFor="delete" className="ml-1 font-bold">
            Bekræft dit email
          </label>
          <input
            autoComplete="email"
            id="delete"
            name="delete"
            className="mt-2 w-full rounded-xl border-2 px-3 py-2"
            placeholder="Іndtast dit email"
          ></input>
        </div>
        <div className="flex gap-5">
          <Button value="Slet konto" variant="delete" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
