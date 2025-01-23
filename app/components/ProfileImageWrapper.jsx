import { useState } from 'react';
import ProfileImage from '@/components/ProfileImage';
import EditProfileImage from '@/components/EditProfileImage';

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
        <ProfileImage handleFormStateChange={handleFormStateChange} />
      ) : (
        <EditProfileImage handleFormStateChange={handleFormStateChange} />
      )}
    </>
  );
}
