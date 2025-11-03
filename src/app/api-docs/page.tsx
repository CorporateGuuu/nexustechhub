'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Swagger UI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

// Import the OpenAPI spec
import openApiSpec from '../../../openapi.yaml';

export default function ApiDocsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API Documentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Nexus Tech Hub API Documentation</h1>
          <p className="text-gray-600 mt-1">
            Complete API reference for the Nexus Tech Hub e-commerce platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <SwaggerUI
          spec={openApiSpec}
          tryItOutEnabled={true}
          requestInterceptor={(req) => {
            // Add base URL for development
            if (req.url.startsWith('/')) {
              req.url = `http://localhost:3000${req.url}`;
            }
            return req;
          }}
          responseInterceptor={(res) => {
            return res;
          }}
          docExpansion="list"
          defaultModelsExpandDepth={1}
          defaultModelExpandDepth={1}
          displayRequestDuration={true}
          filter={true}
          showExtensions={true}
          showCommonExtensions={true}
          presets={[
            SwaggerUI.presets.apis,
            SwaggerUI.presets.standalone
          ]}
          plugins={[
            SwaggerUI.plugins.DownloadUrl
          ]}
          layout="StandaloneLayout"
        />
      </div>
    </div>
  );
}
