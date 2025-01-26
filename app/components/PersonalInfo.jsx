import Button from '@/components/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function PersonalInfo({
  profileData,
  handleChange,
  handleSubmit,
}) {
  const [formMode, setFormMode] = useState('show');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formMode === 'show') {
      setFormMode('edit');
    } else {
      handleSubmit();
      setFormMode('show');
    }
    handleSubmit();
  };

  return (
    <div className="flex w-full flex-col justify-between rounded-xl bg-blue-50 p-5">
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
              <div>{profileData.first_name}</div>
            ) : (
              <input
                className="rounded-lg border bg-white px-2"
                name="first_name"
                value={profileData.first_name}
                onChange={handleChange}
                placeholder="Dit fornavn"
              />
            )}
          </div>
          <div>
            {formMode === 'show' ? (
              <div>{profileData.last_name}</div>
            ) : (
              <input
                className="rounded-lg border bg-white px-2"
                name="last_name"
                value={profileData.last_name}
                onChange={handleChange}
                placeholder="Dit efternavn"
              />
            )}
          </div>
          <div>
            {formMode === 'show' ? (
              <div>{profileData.phone_number}</div>
            ) : (
              <input
                className="rounded-lg border bg-white px-2"
                name="phone_number"
                value={profileData.phone_number}
                onChange={handleChange}
                placeholder="Dit telefonnummer"
              />
            )}
          </div>
          <div>
            {formMode === 'show' ? (
              <div>{profileData.email}</div>
            ) : (
              <input
                className="rounded-lg border bg-white px-2"
                name="email"
                value={profileData.email}
                onChange={handleChange}
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

PersonalInfo.propTypes = {
  profileData: PropTypes.shape({
    first_name: PropTypes.string.isRequired, // Required string
    last_name: PropTypes.string.isRequired, // Required string
    phone_number: PropTypes.string.isRequired, // Required string
    email: PropTypes.string.isRequired, // Required string
  }).isRequired, // `profileData` object is required
  handleChange: PropTypes.func.isRequired, // Function type
  handleSubmit: PropTypes.func.isRequired, // Function type
};
