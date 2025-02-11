/* eslint-disable @next/next/no-img-element -- Disabling because this i am having problems using the optimized component for images */
'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faClock,
  faForward,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button';

const ExamInstructions = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center rounded-lg">
        <div className="mb-6 flex w-full justify-center">
          <img
            src="/istructionImage.jpg"
            width={500}
            height={300}
            className="max-h-60 w-1/2 rounded-lg object-cover"
            alt="Instruction"
          />
        </div>

        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
          Velkommen til Testen
        </h1>

        <div className="mb-6 grid grid-cols-1 gap-6 text-lg text-gray-700 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <FontAwesomeIcon
              icon={faArrowsRotate}
              className="size-6 text-blue-500"
            />
            <span>
              <h2 className="font-bold">Undgå at opdatere eller genindlæse:</h2>{' '}
              Hvis du opdaterer eller genindlæser testsiden, vil du miste alt
              dit fremskridt. Undgå at gøre dette under testen.
            </span>
          </div>
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faClock} className="size-6 text-green-500" />
            <span>
              <h2 className="font-bold">Timeren starter:</h2> Testens timer
              begynder, så snart du klikker på knappen “Start”.
            </span>
          </div>
          <div className="flex items-start gap-4">
            <FontAwesomeIcon
              icon={faForward}
              className="size-6 text-purple-500"
            />
            <span>
              <h2 className="font-bold">Spring spørgsmål over:</h2> Hvis du er
              usikker på et spørgsmål, kan du springe det over og vende tilbage
              til det senere. Du kan også gå tilbage til tidligere spørgsmål for
              at ændre dine svar.
            </span>
          </div>
          <div className="flex items-start gap-4 ">
            <FontAwesomeIcon
              icon={faListCheck}
              className="size-6 text-red-500"
            />
            <span>
              <h2 className="font-bold">Testoversigt:</h2> Brug testoversigten
              til at følge dit fremskridt og holde styr på besvarede og
              ubesvarede spørgsmål. Klik på et nummer for at gå til et
              spørgsmål, og husk at klikke på “Indsend svar” for at registrere
              dit resultat.
            </span>
          </div>
        </div>

        <Link href="/questions">
          <Button variant="default" styles={`px-8`} value="Start" />
        </Link>
      </div>
    </section>
  );
};

export default ExamInstructions;
