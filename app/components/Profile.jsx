import ProfileImage from '@/components/ProfileImage';
import EditProfileImage from '@/components/EditProfileImage';
import PersonalInfo from '@/components/PersonalInfo';
import Address from '@/components/Address';

export default function Profile() {
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
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  };

  const [userData, setUserData] = useState({});

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        const data = await response.json();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col gap-7">
      <ProfileImage />
      <EditProfileImage />
      <PersonalInfo />
      <Address />
    </div>
  );
}
