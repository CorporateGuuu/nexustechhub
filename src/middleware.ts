import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimitStore, logRequest, handleCors } from './lib/api';

// =============================================================================
// Nexus Tech Hub - API Middleware
// =============================================================================

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  // General API rate limit
  api: {
    limit: 100, // requests per window
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // Auth endpoints rate limit (more restrictive)
  auth: {
    limit: 5, // requests per window (reduced for security)
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // File upload endpoints
  upload: {
    limit: 20, // requests per window
    windowMs: 60 * 60 * 1000, // 1 hour
  },
};

// Routes that don't require rate limiting
const PUBLIC_ROUTES = [
  /^\/$/,
  /^\/_next\//,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
  /^\/sitemap\.xml$/,
];

// Routes that get stricter rate limiting
const AUTH_ROUTES = [
  /^\/api\/auth\//,
];

// Get client identifier (IP address)
function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIp = request.headers.get('x-client-ip');

  // Use the first available IP, fallback to a generic identifier
  const ip = forwarded?.split(',')[0]?.trim() ||
             realIp ||
             clientIp ||
             request.ip ||
             'unknown';

  return ip;
}

// Check if route should be rate limited
function shouldRateLimit(pathname: string): boolean {
  return !PUBLIC_ROUTES.some(pattern => pattern.test(pathname));
}

// Get rate limit config for route
function getRateLimitConfig(pathname: string) {
  if (AUTH_ROUTES.some(pattern => pattern.test(pathname))) {
    return RATE_LIMIT_CONFIG.auth;
  }
  return RATE_LIMIT_CONFIG.api;
}

// Handle rate limiting
function checkRateLimit(request: NextRequest): boolean {
  const identifier = getClientIdentifier(request);
  const config = getRateLimitConfig(request.nextUrl.pathname);

  return rateLimitStore.check(identifier, config.limit, config.windowMs);
}

// Main middleware function
export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { method, nextUrl } = request;
  const { pathname } = nextUrl;

  // Handle CORS preflight requests
  if (method === 'OPTIONS') {
    return handleCors();
  }

  // Skip rate limiting for public routes
  if (!shouldRateLimit(pathname)) {
    // Still log the request for public routes
    const duration = Date.now() - startTime;
    logRequest(method, pathname, undefined, duration);

    return NextResponse.next();
  }

  // Check rate limit
  if (!checkRateLimit(request)) {
    const duration = Date.now() - startTime;
    logRequest(method, pathname, 'rate-limited', duration);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again later.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      {
        status: 429,
        headers: {
          'Retry-After': '900', // 15 minutes in seconds
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  // Log successful requests
  const duration = Date.now() - startTime;
  logRequest(method, pathname, undefined, duration);

  // Continue with the request
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Add CORS headers to all responses
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
