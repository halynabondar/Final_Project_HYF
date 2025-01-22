import Image from 'next/image';
import Button from '@/components/Button';

export default function EditImage() {
  return (
    <div>
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
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-blue-500">Profilbillede</h3>
            <p className="text-xl text-gray-700">Upload dit billede</p>
            <p className="text-gray-700">
              Dit billede skal være i PNG- eller JPG-format
            </p>
            <div className="mt-4 flex gap-5">
              <Button
                value="Vælg billede"
                styles={`border border-blue-500 bg-white text-blue-500 hover:text-white`}
                onClick={() => {}}
              />
              <Button
                value="Fjerne"
                styles={`border border-red-500 bg-white text-red-500 hover:text-white hover:bg-red-500`}
              />
            </div>
          </div>
        </div>
        <div>
          <Button value="Gem" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
