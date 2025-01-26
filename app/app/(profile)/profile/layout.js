import PropTypes from 'prop-types';

export const metadata = {
  title: 'HackYourFuture',
};

export default function UserLayout({ children }) {
  return children;
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
