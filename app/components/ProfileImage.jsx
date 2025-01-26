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
            Ms. Kroger Rutherford
          </h3>
          <p className="text-gray-700">Denmark, Copenhagen</p>
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
  }).isRequired,
};
