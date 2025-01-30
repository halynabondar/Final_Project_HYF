import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-blue-50 p-5">
        <div className="flex size-14 items-center justify-center rounded-full bg-gray-200">
          <DeleteForeverIcon className="text-3xl text-red-500" />
        </div>
        <h1 className="my-2 text-3xl font-bold text-blue-700">Slet konto</h1>
        <p className="text-center text-lg text-red-700">
          <b>ADVARSEL</b>
          <br /> dette er permanent og kan ikke fortrydes!
        </p>
        <p className="text-lg">
          Alle resultathistorikker vil blive slettet med det samme.
        </p>
        <div className="">
          <label htmlFor="delete" className="font-bold">
            Bekræft brugernavn
          </label>
          <input
            id="delete"
            name="delete"
            className="mt-2 w-full rounded-xl px-3 py-2"
            placeholder="Іndtast dit fornavn og efternavn"
          ></input>
        </div>
        <div className="mt-2 flex gap-5">
          <Button value="Slet konto" onClick={handleDelete} />
          {/*<Link href="/start">*/}
          {/*  <Button value="Tilbage til start" />*/}
          {/*</Link>*/}
        </div>
      </div>
    </div>
  );
}
