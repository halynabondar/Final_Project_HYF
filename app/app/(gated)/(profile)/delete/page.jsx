'use client';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function DeleteAccount() {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Er du sikker på, at du vil slette din konto?',
    );
    if (!confirmed) return;

    try {
      const response = await fetch('/api/delete', { method: 'DELETE' });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push('/start');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

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
