import Image from 'next/image';
import Button from '@/components/Button';

export default function ProfileImage() {
  return (
    <div className="flex w-full justify-between rounded-xl bg-blue-100 p-5">
      <div className="flex gap-5">
        <div className="rounded-3xl">
          <Image
            className="rounded-3xl"
            src="/userImage.jpg"
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
        <Button value="Redigere" onClick={() => {}} />
      </div>
    </div>
  );
}
