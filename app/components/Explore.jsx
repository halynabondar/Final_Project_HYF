import PropTypes from 'prop-types';

export default function Explore({ icon, title }) {
  return (
    <>
      <div className="flex min-h-[150px] min-w-[150px] flex-col items-center justify-center gap-3 rounded-2xl bg-blue-100 p-3 text-center duration-500 hover:bg-blue-200">
        <div className="flex size-12 items-center justify-center rounded-full bg-blue-500 p-3 text-blue-50">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </>
  );
}

Explore.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
