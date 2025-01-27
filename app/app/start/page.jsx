'use client';

import Button from '@/components/Button';
import Explore from '../../components/Explore.jsx';
import {
  faCircleDollarToSlot,
  faList,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';

function WelcomePage() {
  const exploreFeatures = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faVolumeUp} />,
      title: 'Text to Speech',
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faList} />,
      title: 'Results history',
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faCircleDollarToSlot} />,
      title: 'Free of Charge',
    },
  ];

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-10 py-2 sm:py-4 md:flex-row">
        <div className="flex max-w-[600px] flex-col items-center justify-center md:max-w-[400px] lg:max-w-[600px]">
          <h1 className="xs:text-[48px] xs:leading-[77px] w-full font-poppins text-[40px] font-semibold leading-[67px]">
            Velkommen <br /> til DKTestPrep
          </h1>
          <p className="font-poppins text-[18px] font-normal leading-[30px]">
            Bliv klar til den danske indfødsretsprøve med selvtillid! Forbereder
            du dig på den danske indfødsretsprøve? DKTestPrep er her for at
            hjælpe dig med at få succes. Med vores interaktive øvequizzer og
            engagerende fællesskabsblog vil du få den viden og selvtillid, der
            er nødvendig for at bestå prøven.
          </p>
          <Link href="/signin">
            <Button value="Log ind" styles={`mt-5`} />
          </Link>
        </div>
        <div className="flex max-w-[600px] flex-col items-center justify-center rounded-2xl">
          <Image
            src="/imageWelcome.jpg"
            alt="welcome"
            className="rounded-2xl"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>
      <div className="ss:flex-wrap xs:flex-wrap ss:gap-10 xs:gap-8 my-4 flex flex-row justify-center sm:my-10 sm:flex-wrap sm:gap-10 md:gap-20">
        {exploreFeatures.map((feature) => (
          <Explore key={feature.id} icon={feature.icon} title={feature.title} />
        ))}
      </div>
    </section>
  );
}

export default WelcomePage;
