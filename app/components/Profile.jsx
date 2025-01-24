import PersonalInfo from '@/components/PersonalInfo';
import Address from '@/components/Address';
import { useState, useEffect } from 'react';
import ProfileImageWrapper from '@/components/ProfileImageWrapper';

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
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${profileData.id}`,
        {
          method: 'PUT',
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
