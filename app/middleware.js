'use server';

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export const runtime = 'nodejs';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  console.warn(`Secret: ${process.env.AUTH_SECRET}`);
  console.warn(`Token: ${token}`);

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// Match only routes that need protection
export const config = {
  matcher: '/api/private/(.*)',
};
