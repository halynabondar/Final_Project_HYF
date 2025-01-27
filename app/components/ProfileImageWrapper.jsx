import { useState } from 'react';
import ProfileImage from '@/components/ProfileImage';
import EditProfileImage from '@/components/EditProfileImage';
import PropTypes from 'prop-types';

export default function ProfileImageWrapper({ user }) {
  const [formMode, setFormMode] = useState('show');

  const handleFormStateChange = () => {
    if (formMode === 'edit') {
      setFormMode('show');
    } else {
      setFormMode('edit');
    }
  };
  return (
    <>
      {formMode === 'show' ? (
        <ProfileImage
          handleFormStateChange={handleFormStateChange}
          user={user}
        />
      ) : (
        <EditProfileImage
          handleFormStateChange={handleFormStateChange}
          user={user}
        />
      )}
    </>
  );
}

ProfileImageWrapper.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string.isRequired, // Validate that `image` is a required string
    name: PropTypes.string.isRequired, // Validate that `name` is a required string
  }).isRequired, // Ensure `user` is a required object
};
