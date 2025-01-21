/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faClock,
  faForward,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';

const ExamInstructions = () => {
  const router = useRouter();

  const handleBeginExam = () => {
    router.push('/questions');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl flex-col items-center justify-center rounded-lg bg-gray-100 p-8">
        <div className="mb-6 flex w-full justify-center">
          <img
            src="https://c8.alamy.com/comp/2YXN0R4/edtech-concept-student-undertaking-an-online-test-with-a-ticking-clock-signaling-limited-time-efficient-assessment-in-digital-education-vector-illustration-2YXN0R4.jpg"
            alt="Exam Instructions"
            className="max-h-60 w-1/2 rounded-lg object-cover"
          />
        </div>

        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
          Velkommen til din eksamen
        </h1>

        <div className="mb-6 grid grid-cols-1 gap-6 text-lg text-gray-700 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <FontAwesomeIcon
              icon={faArrowsRotate}
              className="size-6 text-blue-500"
            />
            <span>
              <strong>Undgå at opdatere eller genindlæse:</strong> Hvis du
              opdaterer eller genindlæser eksamenssiden, vil du miste alt dit
              fremskridt. Undgå at gøre dette under eksamen.
            </span>
          </div>
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faClock} className="size-6 text-green-500" />
            <span>
              <strong>Timeren starter:</strong> Eksamens timeren begynder, så
              snart du klikker på knappen “Start Eksamen”.
            </span>
          </div>
          <div className="flex items-start gap-4">
            <FontAwesomeIcon
              icon={faForward}
              className="size-6 text-purple-500"
            />
            <span>
              <strong>Spring spørgsmål over:</strong> Hvis du er usikker på et
              spørgsmål, kan du springe det over og vende tilbage til det
              senere. Du kan også gå tilbage til tidligere spørgsmål for at
              ændre dine svar.
            </span>
          </div>
          <div className="flex items-start gap-4 ">
            <FontAwesomeIcon
              icon={faListCheck}
              className="size-6 text-red-500"
            />
            <span>
              <strong>Eksamensoversigt:</strong> Brug eksamensoversigten til at
              overvåge dit fremskridt. Den giver et klart overblik over
              besvarede og ubesvarede spørgsmål, så du kan holde dig organiseret
              under testen. Ved at klikke på et nummer i oversigten vil du blive
              ført til det spørgsmål.
            </span>
          </div>
        </div>

        <Button
          value="Start Eksamen"
          onClick={handleBeginExam}
          styles="mt-10"
        />
      </div>
    </div>
  );
};

export default ExamInstructions;
