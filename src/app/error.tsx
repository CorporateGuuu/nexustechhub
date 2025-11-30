'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application Error:', error);

    // Optional: Send to error reporting service
    // captureException(error);
  }, [error]);

  const errorId = error.digest || `ERR-${Date.now()}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-gray-900">
            Something went wrong
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              We encountered an unexpected error. Our team has been notified and is working to fix this issue.
            </AlertDescription>
          </Alert>

          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Error ID:</strong> {errorId}</p>
            <p className="text-xs">
              Please include this ID when contacting support for faster resolution.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" asChild className="flex-1">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>

              <Button variant="outline" asChild className="flex-1">
                <a href="mailto:support@nexustechhub.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Support
                </a>
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            Nexus Tech Hub - Professional Device Solutions
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
