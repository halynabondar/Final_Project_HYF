'use client';

import Button from '@/components/Button';
import { style } from '@/app/style';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    if (userData.password !== userData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    delete userData.repeatPassword;

    try {
      const response = await fetch('api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sign up');
      }

      // Redirect user to sign-in page upon successful signup
      router.push('/signin');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form: ' + error.message);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-xl">
        <h1 className={`${style.heading} text-center`}>Tilmeld dig</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="mt-5 flex w-full flex-row gap-5">
            <div className="flex grow flex-col gap-1">
              <label className="ml-1 font-bold" htmlFor="name">
                Fornavn
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                autoComplete="given-name"
                type="text"
                name="first_name"
                id="name"
                required
                placeholder="Indtast fornavn"
              />
            </div>
            <div className="flex grow flex-col gap-1">
              <label className="ml-1 font-bold" htmlFor="surname">
                Efternavn
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                autoComplete="family-name"
                type="text"
                name="last_name"
                id="surname"
                required
                placeholder="Indtast efternavn"
              />
            </div>
          </div>
          <div className="mt-2 flex w-full flex-row gap-5">
            <div className="flex grow flex-col gap-1">
              <label className="ml-1 font-bold" htmlFor="land">
                Land
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                autoComplete="country-name"
                type="text"
                name="country"
                id="land"
                required
                placeholder="Indtast land"
              />
            </div>
            <div className="mb-3 flex grow flex-col gap-1">
              <label htmlFor="town" className="ml-1 font-bold">
                By
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                type="town"
                name="town"
                id="town"
                autoComplete="address-level2"
                required
                placeholder="Indtast by"
              />
            </div>
          </div>
          <div className="mt-2 flex w-full flex-row gap-5">
            <div className="flex grow flex-col gap-1">
              <label className="ml-1 font-bold" htmlFor="adresse">
                Adresse
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                autoComplete="street-address"
                type="text"
                name="address"
                id="address"
                required
                placeholder="Indtast adresse"
              />
            </div>
            <div className="mb-3 flex grow flex-col gap-1">
              <label htmlFor="tel" className="ml-1 font-bold">
                Telefonnummer
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                type="tel"
                name="phone_number"
                id="tel"
                autoComplete="tel"
                required
                placeholder="Indtast telefonnummer"
              />
            </div>
          </div>
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
                autoComplete="new-password"
                required
                placeholder="Indtast mindst 8+ tegn"
              />
            </div>
            <div className="mb-3 flex flex-col gap-1">
              <label htmlFor="repeatPassword" className="ml-1 font-bold">
                Bekræft adgangskode
              </label>
              <input
                className="rounded-xl border p-2 duration-300 hover:border-blue-300"
                minLength="8"
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                autoComplete="new-password"
                required
                placeholder="Indtast mindst 8+ tegn"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              name="checkbox"
              type="checkbox"
              id="terms"
              required
              className="size-4"
            />
            <label htmlFor="terms">
              Ved at tilmelde mig, accepterer jeg Vilkårene for brug og
              Privatlivspolitik
            </label>
          </div>
          <div className="mt-3 flex justify-center">
            <Button styles={`mb-3`} type="submit" value="Tilmeld dig" />
          </div>
          <div className="flex items-center justify-center gap-5">
            <p>Har du allerede en konto?</p>
            <Link href="/signin" className="text-blue-400">
              Log ind
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
