import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/profile'];

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie; // conform in boolean
  const isOnProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname); // conform in boolean
  const inOnAuthRoute = nextUrl.pathname.startsWith('/auth');

  if (!isLoggedIn && isOnProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isLoggedIn && inOnAuthRoute) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return res;
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
