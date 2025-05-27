import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  // Customer protected routes
  '/dashboard': ['customer', 'admin'],
  '/profile': ['customer', 'admin'],
  '/orders': ['customer', 'admin'],
  '/quotes': ['customer', 'admin'],

  // Admin protected routes
  '/admin': ['admin'],
  '/admin/dashboard': ['admin'],
  '/admin/inventory': ['admin', 'inventory_manager'],
  '/admin/orders': ['admin', 'customer_service'],
  '/admin/customers': ['admin', 'customer_service'],
  '/admin/quotes': ['admin', 'customer_service'],
  '/admin/users': ['admin'],
  '/admin/settings': ['admin'],

  // API protected routes
  '/api/admin': ['admin'],
  '/api/dashboard': ['customer', 'admin'],
  '/api/orders': ['customer', 'admin'],
  '/api/quotes': ['customer', 'admin'],
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/iphone-parts',
  '/samsung-parts',
  '/ipad-parts',
  '/repair-tools',
  '/lcd-buyback',
  '/genuine-parts-program',
  '/contact',
  '/auth/signin',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/error',
  '/auth/verify-request',
  '/auth/unauthorized',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/images',
  '/fonts',
  '/assets',
];

export async function middleware(request) {
  // Get the request path
  const path = request.nextUrl.pathname;

  // Skip middleware for static assets and Next.js internals
  if (
    path.startsWith('/_next/') ||
    path.startsWith('/api/auth/') ||
    path.startsWith('/images/') ||
    path.startsWith('/fonts/') ||
    path.startsWith('/assets/') ||
    path.includes('.') // Skip files with extensions (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if this is a public route (exact match or starts with)
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    path === route || path.startsWith(route + '/')
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if this is a protected route
  const isProtectedRoute = Object.keys(PROTECTED_ROUTES).some(route =>
    path.startsWith(route)
  );

  // Handle authentication for protected routes only
  if (isProtectedRoute) {
    try {
      // Get the user's token
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // If no token, redirect to login
      if (!token) {
        const signInUrl = new URL('/auth/signin', request.url);
        signInUrl.searchParams.set('callbackUrl', request.url);
        return NextResponse.redirect(signInUrl);
      }

      // Find the matching protected route
      const matchingRoute = Object.keys(PROTECTED_ROUTES).find(route =>
        path.startsWith(route)
      );

      if (matchingRoute) {
        const requiredRoles = PROTECTED_ROUTES[matchingRoute];
        const userRole = token.role || 'customer';

        if (!requiredRoles.includes(userRole)) {
          // User doesn't have required role, redirect to unauthorized page
          return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
        }
      }

      // Add user info to request headers for downstream use
      const response = NextResponse.next();
      response.headers.set('x-user-id', token.id || '');
      response.headers.set('x-user-role', token.role || 'customer');
      response.headers.set('x-user-email', token.email || '');

      return response;
    } catch (error) {
      console.error('Authentication middleware error:', error);
      // On error, redirect to login only if not already on auth page
      if (!path.startsWith('/auth/')) {
        const signInUrl = new URL('/auth/signin', request.url);
        signInUrl.searchParams.set('callbackUrl', request.url);
        return NextResponse.redirect(signInUrl);
      }
      return NextResponse.next();
    }
  }

  // For all other routes, just continue with basic security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Apply to all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|bmp|tiff)).*)',
  ],
};
