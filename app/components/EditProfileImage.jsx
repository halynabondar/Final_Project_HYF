import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PropTypes from 'prop-types';

export default function EditProfileImage({ handleFormStateChange, user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.image || '/userImage.jpg');
  const [alert, setAlert] = useState({
    message: '',
    severity: '',
    visible: false,
  });

  // Handle file selection
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();

      // Event listener for when the file is fully read
      reader.onload = (event) => {
        const base64String = event.target.result; // This is the Base64 string
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(image);
      setPreview(URL.createObjectURL(image)); // Create a preview URL for the selected file
    }
  };

  // Show alert message
  const showAlert = (message, severity) => {
    setAlert({ message, severity, visible: true });
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000); // Auto-hide alert after 3 seconds
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile) {
      showAlert('Please select an image to upload', 'warning');
      return;
    }

    const formData = { image: selectedFile };
    try {
      const response = await fetch(`/api/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showAlert('Image uploaded successfully', 'success');
      } else {
        showAlert('Failed to upload image', 'error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      showAlert('Error uploading image', 'error');
    } finally {
      handleFormStateChange();
    }
  };

  return (
    <div>
      {alert.visible && (
        <Alert severity={alert.severity} className="mb-4">
          <AlertTitle>
            {alert.severity === 'success' ? 'Success' : 'Error'}
          </AlertTitle>
          {alert.message}
        </Alert>
      )}
      <div className="flex w-full justify-between rounded-xl bg-blue-100 p-5">
        <div className="flex gap-5">
          <div className="size-[100px] overflow-hidden rounded-3xl object-cover">
            <Image
              className="size-full rounded-3xl object-cover"
              src={preview}
              alt="profilePicture"
              width={100}
              height={100}
              priority
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-blue-500">Profilbillede</h3>
            <p className="text-xl text-gray-700">Upload dit billede</p>
            <p className="text-gray-700">
              Dit billede skal være i PNG- eller JPG-format
            </p>
            <div className="mt-4 flex gap-5">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  value="Vælg billede"
                  styles={`border border-blue-500 bg-white text-blue-500 hover:text-white`}
                  onClick={() => {
                    document.querySelector('input[type=file]').click();
                  }}
                />
              </label>
              <Button
                value="Fjerne"
                styles={`border border-red-500 bg-white text-red-500 hover:text-white hover:bg-red-500`}
                onClick={() => {
                  setSelectedFile(null);
                  setPreview('/userImage.jpg');
                  handleFormStateChange(); // Reset to default image
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <Button value="Gem" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

EditProfileImage.propTypes = {
  handleFormStateChange: PropTypes.func.isRequired, // Ensure it's a function
  user: PropTypes.shape({
    image: PropTypes.string, // `image` can be null or undefined
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // `id` must be string or number
  }).isRequired, // Entire `user` object is required
};
