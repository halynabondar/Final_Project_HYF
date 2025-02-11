'use client';

import { signIn } from 'next-auth/react';
import Button from '@/components/Button';
import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/start',
    });

    if (response?.error) {
      setError('Email or password is incorrect');
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-7 shadow-xl">
        <h1 className="w-full text-center font-poppins text-[36px] font-semibold leading-[67px] xs:text-[40px] xs:leading-[70px]">
          Log ind
        </h1>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleSignIn} className="flex flex-col gap-5">
          <div className="flex w-full flex-col gap-5">
            <div className="mb-3 flex flex-col gap-1">
              <label htmlFor="email" className="ml-1 font-bold">
                E-mail
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                placeholder="eksempel@gmail.com"
              />
            </div>
            <div className="mb-3 flex flex-col gap-1">
              <label htmlFor="password" className="ml-1 font-bold">
                Adgangskode
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                minLength="8"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                placeholder="Indtast mindst 8+ tegn"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <Button styles={`mb-3`} type="submit" value="Log ind" />
          </div>
          <div className="flex items-center justify-center gap-5">
            <p>Opret ny konto</p>
            <Link href="/signup" className="text-blue-400">
              Tilmeld dig
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
