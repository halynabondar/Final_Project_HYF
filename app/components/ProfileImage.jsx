import Image from 'next/image';
import Button from '@/components/Button';
import PropTypes from 'prop-types';

export default function ProfileImage({ handleFormStateChange, user }) {
  const imagePreview = user?.image || '/userImage.jpg';

  return (
    <div className="flex flex-row justify-between rounded-xl bg-blue-50 p-5 xs:flex-col sm:flex-row">
      <div className="flex gap-5">
        <div className="size-[100px] overflow-hidden rounded-3xl">
          <Image
            className="size-full rounded-3xl object-cover"
            src={imagePreview}
            alt="profilePicture"
            width={100}
            height={100}
            priority
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-500">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-700">
            {user.country}, {user.town}
          </p>
        </div>
      </div>
      <div className="mt-0 xs:mt-4 xs:self-start sm:self-start">
        <Button value="Redigere" onClick={handleFormStateChange} />
      </div>
    </div>
  );
}

ProfileImage.propTypes = {
  handleFormStateChange: PropTypes.func.isRequired,
  user: PropTypes.shape({
    image: PropTypes.string,
    first_name: PropTypes.string.isRequired, // Add first_name
    last_name: PropTypes.string.isRequired, // Add last_name
    country: PropTypes.string, // Add country (not required)
    town: PropTypes.string, // Add town (not required)
  }).isRequired, // `user` is required
};
