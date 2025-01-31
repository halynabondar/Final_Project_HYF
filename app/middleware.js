import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// Match only routes that need protection
export const config = {
  matcher: ['/api/private/:path'], // Applies middleware to all pages inside /gated
};
