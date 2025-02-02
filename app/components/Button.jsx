'use client';

import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
  styles,
  value,
  onClick,
  type = 'button',
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-blue-500 hover:bg-blue-700',
    primary: 'bg-blue-50 hover:bg-blue-100',
    delete: 'bg-red-500 hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        'w-fit rounded-[10px] px-6 py-2 text-[18px] font-bold text-white outline-none duration-500',
        variantClasses[variant],
        styles,
      )}
    >
      {value}
    </button>
  );
};

Button.propTypes = {
  styles: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  value: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Button;
