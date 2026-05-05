import { NextRequest, NextResponse } from 'next/server';
import { decrypt, TOKEN_NAME } from '@/lib/auth';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const publicRoutes = ['/login', '/register', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get(TOKEN_NAME)?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // 4. Redirect to /login if the user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

// 5. Redirect behavior logic
  if (
    isPublicRoute &&
    session &&
    !path.startsWith('/dashboard') &&
    path !== '/' // Allow dashboard users to see home if they want
  ) {
    // Prevent logged-in users from seeing login/register pages
    if (path === '/login' || path === '/register') {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
