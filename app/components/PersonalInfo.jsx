import Button from '@/components/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

export default function PersonalInfo() {
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
        <h3 className="text-lg font-bold text-gray-700">
          Personlige oplysninger
        </h3>
        <Button
          value={formMode === 'edit' ? 'Gem' : 'Redigere'}
          onClick={formSubmitHandler}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 text-gray-700">
          <div>
            <AccountCircleIcon className="mr-2 text-blue-500" />
            Fornavn
          </div>
          <div>
            <AccountCircleIcon className="mr-2 text-blue-500" />
            Efternavn
          </div>
          <div>
            <LocalPhoneIcon className="mr-2 text-blue-500" />
            Telefonnummer
          </div>
          <div>
            <EmailIcon className="mr-2 text-blue-500" />
            E-mail
          </div>
        </div>
        <div className="flex flex-col gap-3 text-blue-500">
          <div>
            {formMode === 'show' ? (
              <div>Name</div>
            ) : (
              <input
                className="rounded-lg border px-2"
                value="Name"
                placeholder="Dit fornavn"
              />
            )}
          </div>
          <div>
            {formMode === 'show' ? (
              <div>Last Name</div>
            ) : (
              <input
                className="rounded-lg border px-2"
                value="Last Name"
                placeholder="Dit efternavn"
              />
            )}
          </div>
          <div>
            {formMode === 'show' ? (
              <div>(430) 065-7387</div>
            ) : (
              <input
                className="rounded-lg border px-2"
                value="Telefonnummer"
                placeholder="Dit telefonnummer"
              />
            )}
          </div>
          <div>
            {formMode === 'show' ? (
              <div>main@domain.com</div>
            ) : (
              <input
                className="rounded-lg border px-2"
                value="Email"
                placeholder="Dit email"
              />
            )}
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
}
