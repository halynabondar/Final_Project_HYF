import Image from 'next/image';
import Button from '@/components/Button';

export default function ProfileImage({ handleFormStateChange, user }) {
  const imagePreview = user?.image || '/userImage.jpg';

  return (
    <div className="flex w-full justify-between rounded-xl bg-blue-100 p-5">
      <div className="flex gap-5">
        <div className="size-[100px] overflow-hidden rounded-3xl object-cover">
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
      <div>
        <Button value="Redigere" onClick={handleFormStateChange} />
      </div>
    </div>
  );
}
