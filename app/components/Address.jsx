import Button from '@/components/Button';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Address({ profileData, handleChange, handleSubmit }) {
  const [formMode, setFormMode] = useState('show');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formMode === 'show') {
      setFormMode('edit');
    } else {
      setFormMode('show');
    }
    handleSubmit(profileData);
  };

  return (
    <div className="flex w-full flex-col justify-between rounded-xl border bg-white p-5">
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
            <PublicIcon className="mr-2 text-blue-500" />
            By
          </div>
          <div>
            <HomeIcon className="mr-2 text-blue-500" />
            Adresse
          </div>
        </div>
        <div className="flex flex-col gap-2 text-blue-500">
          <div>
            {formMode === 'show' ? (
              <div>{profileData.country}</div>
            ) : (
              <input
                className="rounded-lg border bg-white px-2"
                value={profileData.country}
                placeholder="Dit land"
                name="country"
                onChange={handleChange}
              />
            )}
          </div>
          <div>
            {formMode === 'show' ? (
              <div>{profileData.town}</div>
            ) : (
              <input
                className="rounded-lg border bg-white px-2"
                value={profileData.town}
                placeholder="Dit land"
                name="town"
                onChange={handleChange}
              />
            )}
          </div>
          <div>
            {' '}
            {formMode === 'show' ? (
              <div>{profileData.address}</div>
            ) : (
              <input
                className="rounded-lg border bg-white px-2"
                value={profileData.address}
                placeholder="Din adresse"
                name="address"
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
}

Address.propTypes = {
  profileData: PropTypes.shape({
    country: PropTypes.string.isRequired,
    town: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
