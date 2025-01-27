import PersonalInfo from '@/components/PersonalInfo';
import Address from '@/components/Address';
import { useState, useEffect } from 'react';
import ProfileImageWrapper from '@/components/ProfileImageWrapper';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PropTypes from 'prop-types';

export default function Profile({ userID = 5 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    country: '',
    town: '',
    address: '',
    image: '',
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async (userID) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/user/${userID}`);
        const data = await response.json();
        setProfileData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone_number: data.phone_number || '',
          email: data.email || '',
          country: data.country || '',
          town: data.town || '',
          address: data.address || '',
          image: data.image || '',
          id: data.id,
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!profileData.id) {
      fetchUserData(userID);
    }
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/user/${profileData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setIsLoading(false);
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
    <div className="flex flex-col gap-7 p-6">
      <ProfileImageWrapper user={profileData}></ProfileImageWrapper>
      <PersonalInfo
        profileData={profileData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Address
        profileData={profileData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

Profile.propTypes = {
  userID: PropTypes.string.isRequired, // Assuming userID is a required string
};
