import Button from '@/components/Button';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';

export default function Address() {
  const [formMode, setFormMode] = useState('show');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formMode === 'show') {
      setFormMode('edit');
    } else {
      setFormMode('show');
      // TODO send data to backend
    }
  };

  return (
    <div className="flex w-full flex-col justify-between rounded-xl bg-white p-5">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-gray-700">Address</h3>
        <Button
          value={formMode === 'edit' ? 'Gem' : 'Redigere'}
          onClick={formSubmitHandler}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 text-gray-700">
          <div>
            <PublicIcon className="mr-2 text-blue-500" />
            Land
          </div>
          <div>
            <HomeIcon className="mr-2 text-blue-500" />
            Adresse
          </div>
        </div>
        <div className="flex flex-col gap-2 text-blue-500">
          <div>
            {formMode === 'show' ? (
              <div>Denmark</div>
            ) : (
              <input
                className="rounded-lg border px-2"
                value="Country"
                placeholder="Dit land"
              />
            )}
          </div>
          <div>
            {' '}
            {formMode === 'show' ? (
              <div>North Las Vegas, NV</div>
            ) : (
              <input
                className="rounded-lg border px-2"
                value="address"
                placeholder="Din adresse"
              />
            )}
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
}
