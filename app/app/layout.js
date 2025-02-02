import './globals.css';
import Navbar from '@/components/Navbar';
import PropTypes from 'prop-types';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'DKTestPrep',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SessionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
