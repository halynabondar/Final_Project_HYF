import Button from './Button';
import PropTypes from 'prop-types';

function PreviousNext({ showPrevious, showNext, onPrevious, onNext }) {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-[738px] items-center justify-between">
      {showPrevious ? (
        <Button
          styles="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          value="Tilbage"
          onClick={onPrevious}
        />
      ) : (
        <div className="w-24" />
      )}

      {showNext ? (
        <Button
          styles=" pl-7 pr-100 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          value="Næste"
          onClick={onNext}
        />
      ) : (
        <div className="w-24" />
      )}
    </div>
  );
}

PreviousNext.propTypes = {
  showPrevious: PropTypes.bool.isRequired,
  showNext: PropTypes.bool.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default PreviousNext;
