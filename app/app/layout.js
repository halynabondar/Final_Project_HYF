import './globals.css';
import Navbar from '@/components/Navbar';
import PropTypes from 'prop-types';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'HackYourFuture',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
