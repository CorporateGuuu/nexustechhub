// Enhanced Loading Spinner for Nexus TechHub
// Adapted from Auth0 sample with UAE branding

import React from 'react';

const LoadingSpinner = ({ 
  size = 120, 
  message = "Loading...", 
  color = "#10b981", // Nexus TechHub green
  className = "",
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center"
    : "flex items-center justify-center w-full h-full";

  return (
    <div className={`${containerClass} ${className}`} data-testid="loading-spinner">
      <div className="text-center">
        {/* Nexus TechHub Branded Spinner */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          className="animate-spin mx-auto mb-4"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 100 100">
          <defs>
            <filter id="nexus-spinner-shadow" width="300%" height="300%" x="-100%" y="-100%">
              <feOffset in="SourceGraphic" result="offOut"></feOffset>
              <feGaussianBlur in="offOut" result="blurOut" stdDeviation="2"></feGaussianBlur>
              <feBlend in="SourceGraphic" in2="blurOut"></feBlend>
            </filter>
            <linearGradient id="nexus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          
          {/* Outer Ring */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#nexus-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="60 40"
            filter="url(#nexus-spinner-shadow)">
            <animateTransform
              attributeName="transform"
              dur="1.5s"
              from="0 50 50"
              repeatCount="indefinite"
              to="360 50 50"
              type="rotate" />
          </circle>
          
          {/* Inner Ring */}
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="40 20"
            opacity="0.6">
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="360 50 50"
              repeatCount="indefinite"
              to="0 50 50"
              type="rotate" />
          </circle>
          
          {/* Center Dot */}
          <circle
            cx="50"
            cy="50"
            r="6"
            fill="url(#nexus-gradient)">
            <animate
              attributeName="opacity"
              dur="1s"
              values="1;0.3;1"
              repeatCount="indefinite" />
          </circle>
        </svg>
        
        {/* Loading Message */}
        {message && (
          <div className="text-center">
            <p className="text-gray-600 font-medium text-lg mb-2">{message}</p>
            <p className="text-sm text-gray-500">Nexus TechHub UAE</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Specialized loading components for different use cases
export const CheckoutLoading = () => (
  <LoadingSpinner 
    size={80}
    message="Processing your payment..."
    fullScreen={true}
  />
);

export const ProductLoading = () => (
  <LoadingSpinner 
    size={60}
    message="Loading products..."
    className="py-8"
  />
);

export const PageLoading = () => (
  <LoadingSpinner 
    size={100}
    message="Loading page..."
    fullScreen={true}
  />
);

export const QuoteLoading = () => (
  <LoadingSpinner 
    size={70}
    message="Preparing your quote..."
    className="py-6"
  />
);

// Simple spinner without message
export const SimpleSpinner = ({ size = 40, className = "" }) => (
  <div className={`inline-block ${className}`}>
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="60 40"
      />
    </svg>
  </div>
);

export default LoadingSpinner;
