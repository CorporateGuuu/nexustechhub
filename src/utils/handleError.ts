import { ZodError } from 'zod';

// Error types for different services
export interface StandardizedError {
  error: string;
  code?: string;
  details?: any;
  retryable?: boolean;
}

// Stripe error mappings
const STRIPE_ERROR_MAP: Record<string, StandardizedError> = {
  card_declined: {
    error: 'Your card was declined. Please try a different payment method.',
    code: 'card_declined',
    retryable: true,
  },
  insufficient_funds: {
    error: 'Insufficient funds on your card. Please check your balance or try a different card.',
    code: 'insufficient_funds',
    retryable: true,
  },
  expired_card: {
    error: 'Your card has expired. Please update your payment method.',
    code: 'expired_card',
    retryable: false,
  },
  incorrect_cvc: {
    error: 'The CVC code is incorrect. Please check and try again.',
    code: 'incorrect_cvc',
    retryable: true,
  },
  processing_error: {
    error: 'Payment processing failed. Please try again.',
    code: 'processing_error',
    retryable: true,
  },
  incorrect_number: {
    error: 'The card number is incorrect. Please check and try again.',
    code: 'incorrect_number',
    retryable: true,
  },
  generic_decline: {
    error: 'Payment was declined. Please contact your bank or try a different card.',
    code: 'generic_decline',
    retryable: true,
  },
};

// PayPal error mappings
const PAYPAL_ERROR_MAP: Record<string, StandardizedError> = {
  INVALID_PAYMENT_METHOD: {
    error: 'PayPal account issue. Please check your PayPal account or try a different payment method.',
    code: 'INVALID_PAYMENT_METHOD',
    retryable: false,
  },
  PAYPAL_REQUEST_ID_REQUIRED: {
    error: 'PayPal request failed. Please try again.',
    code: 'PAYPAL_REQUEST_ID_REQUIRED',
    retryable: true,
  },
  INVALID_RESOURCE_ID: {
    error: 'PayPal session expired. Please try again.',
    code: 'INVALID_RESOURCE_ID',
    retryable: true,
  },
  INSTRUMENT_DECLINED: {
    error: 'Payment method was declined. Please try a different payment method.',
    code: 'INSTRUMENT_DECLINED',
    retryable: true,
  },
};

// Supabase Auth error mappings
const SUPABASE_AUTH_ERROR_MAP: Record<string, StandardizedError> = {
  'Email not confirmed': {
    error: 'Please check your email and click the confirmation link before signing in.',
    code: 'email_not_confirmed',
    retryable: false,
  },
  'Invalid login credentials': {
    error: 'Invalid email or password. Please check your credentials and try again.',
    code: 'invalid_credentials',
    retryable: true,
  },
  'User already registered': {
    error: 'An account with this email already exists. Please sign in instead.',
    code: 'user_exists',
    retryable: false,
  },
  'Password should be at least 6 characters': {
    error: 'Password must be at least 6 characters long.',
    code: 'weak_password',
    retryable: false,
  },
  'Unable to validate email address: invalid format': {
    error: 'Please enter a valid email address.',
    code: 'invalid_email',
    retryable: false,
  },
  'Signup is disabled': {
    error: 'New account registration is currently disabled. Please contact support.',
    code: 'signup_disabled',
    retryable: false,
  },
};

// Network error handling
export const NETWORK_ERROR: StandardizedError = {
  error: 'Network connection lost. Please check your internet connection and try again.',
  code: 'network_error',
  retryable: true,
};

// Generic unknown error
export const UNKNOWN_ERROR: StandardizedError = {
  error: 'An unexpected error occurred. Please try again or contact support.',
  code: 'unknown_error',
  retryable: true,
};

/**
 * Standardizes errors from different sources into a consistent format
 */
export function standardizeError(error: any): StandardizedError {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return {
      error: 'Validation failed. Please check your input and try again.',
      code: 'validation_error',
      details: error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
      retryable: false,
    };
  }

  // Handle Stripe errors
  if (error?.type === 'StripeInvalidRequestError' ||
      error?.type === 'StripeCardError' ||
      error?.type === 'StripeRateLimitError' ||
      error?.type === 'StripeAuthenticationError' ||
      error?.type === 'StripeAPIError') {
    const stripeCode = error.code || error.type;
    return STRIPE_ERROR_MAP[stripeCode] || {
      error: error.message || 'Payment processing failed.',
      code: stripeCode,
      retryable: true,
    };
  }

  // Handle PayPal errors
  if (error?.name === 'PayPalHttpError' || error?.details) {
    const paypalError = error.details?.[0] || error;
    const paypalCode = paypalError.issue || paypalError.name;
    return PAYPAL_ERROR_MAP[paypalCode] || {
      error: paypalError.description || 'PayPal payment failed.',
      code: paypalCode,
      details: error.details,
      retryable: true,
    };
  }

  // Handle Supabase errors
  if (error?.message) {
    const message = error.message;

    // Check for known auth errors
    for (const [key, mappedError] of Object.entries(SUPABASE_AUTH_ERROR_MAP)) {
      if (message.includes(key)) {
        return mappedError;
      }
    }

    // Handle database constraint errors
    if (message.includes('duplicate key value')) {
      return {
        error: 'This information already exists. Please try different values.',
        code: 'duplicate_entry',
        retryable: false,
      };
    }

    // Handle permission errors
    if (message.includes('permission denied') || message.includes('insufficient_privilege')) {
      return {
        error: 'You do not have permission to perform this action.',
        code: 'permission_denied',
        retryable: false,
      };
    }

    // Handle network/connectivity errors
    if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
      return NETWORK_ERROR;
    }

    // Return the original message if it's user-friendly
    return {
      error: message,
      code: error.code || 'supabase_error',
      details: error.details,
      retryable: true,
    };
  }

  // Handle network errors
  if (!navigator.onLine || error?.name === 'NetworkError' || error?.code === 'NETWORK_ERROR') {
    return NETWORK_ERROR;
  }

  // Handle fetch/network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return NETWORK_ERROR;
  }

  // Fallback to unknown error
  return UNKNOWN_ERROR;
}

/**
 * API route error wrapper for consistent error responses
 */
export function handleApiError(error: any): Response {
  const standardized = standardizeError(error);

  // Log error for monitoring
  console.error('API Error:', {
    error: standardized.error,
    code: standardized.code,
    details: standardized.details,
    originalError: error,
  });

  // Optional: Send to error reporting service
  // captureException(error);

  return Response.json(standardized, {
    status: standardized.code === 'validation_error' ? 400 :
           standardized.code === 'permission_denied' ? 403 :
           standardized.retryable === false ? 422 : 500
  });
}

/**
 * Client-side error handler for forms and user interactions
 */
export function handleClientError(error: any): StandardizedError {
  const standardized = standardizeError(error);

  // Optional: Send to error reporting service
  // captureException(error);

  return standardized;
}

/**
 * React Query error handler
 */
export function queryErrorHandler(error: any) {
  const standardized = standardizeError(error);

  // Show toast notification for user feedback
  // This would typically use your toast library
  console.error('Query Error:', standardized.error);

  return standardized;
}

/**
 * Form validation error formatter for React Hook Form
 */
export function formatFormErrors(error: any): Record<string, string> {
  const standardized = standardizeError(error);

  if (standardized.details && Array.isArray(standardized.details)) {
    return standardized.details.reduce((acc, detail) => {
      if (detail.field) {
        acc[detail.field] = detail.message;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  return { general: standardized.error };
}
