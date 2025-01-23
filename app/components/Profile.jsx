import ProfileImage from '@/components/ProfileImage';
import EditProfileImage from '@/components/EditProfileImage';
import PersonalInfo from '@/components/PersonalInfo';
import Address from '@/components/Address';
import { useState, useEffect } from 'react';

export default function Profile({ userID = 5 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    country: '',
    address: '',
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
        const response = await fetch(
          `http://localhost:3000/api/user/${userID}`,
        );
        const data = await response.json();
        setProfileData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone_number: data.phone_number || '',
          email: data.email || '',
          country: data.country || '',
          address: data.address || '',
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
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${profileData.id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        },
      );
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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-7 p-6">
      <ProfileImage />
      <EditProfileImage />
      <PersonalInfo
        profileData={profileData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Address profileData={profileData} handleChange={handleChange} />
    </div>
  );
}
