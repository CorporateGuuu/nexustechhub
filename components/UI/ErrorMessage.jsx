// Enhanced Error Message Component for Nexus TechHub
// Professional error handling with UAE business context

import React, { useState } from 'react';
import { XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ 
  children, 
  type = 'error', 
  title = null,
  dismissible = true,
  onDismiss = null,
  className = "",
  showIcon = true,
  contactSupport = false
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  // Define styles based on type
  const typeStyles = {
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: 'text-red-400',
      title: 'text-red-800',
      IconComponent: ExclamationTriangleIcon
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: 'text-yellow-400',
      title: 'text-yellow-800',
      IconComponent: ExclamationTriangleIcon
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'text-blue-400',
      title: 'text-blue-800',
      IconComponent: InformationCircleIcon
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: 'text-green-400',
      title: 'text-green-800',
      IconComponent: InformationCircleIcon
    }
  };

  const styles = typeStyles[type] || typeStyles.error;
  const { IconComponent } = styles;

  return (
    <div 
      className={`border rounded-lg p-4 ${styles.container} ${className}`}
      data-testid={`${type}-message`}
      role="alert"
    >
      <div className="flex">
        {/* Icon */}
        {showIcon && (
          <div className="flex-shrink-0">
            <IconComponent className={`h-5 w-5 ${styles.icon}`} aria-hidden="true" />
          </div>
        )}
        
        {/* Content */}
        <div className={`${showIcon ? 'ml-3' : ''} flex-1`}>
          {/* Title */}
          {title && (
            <h3 className={`text-sm font-medium ${styles.title} mb-1`}>
              {title}
            </h3>
          )}
          
          {/* Message */}
          <div className="text-sm">
            {children}
          </div>
          
          {/* Support Contact for Errors */}
          {contactSupport && type === 'error' && (
            <div className="mt-3 pt-3 border-t border-red-200">
              <p className="text-xs text-red-600">
                Need help? Contact Nexus TechHub support:
              </p>
              <div className="mt-1 space-y-1 text-xs">
                <p>📞 Phone: <a href="tel:+971585531029" className="font-medium hover:underline">+971 58 553 1029</a></p>
                <p>💬 WhatsApp: <a href="https://wa.me/971585531029" className="font-medium hover:underline" target="_blank" rel="noopener noreferrer">Chat with us</a></p>
                <p>📧 Email: <a href={`mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'admin@nexustechhub.ae'}`} className="font-medium hover:underline">{process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'admin@nexustechhub.ae'}</a></p>
              </div>
            </div>
          )}
        </div>
        
        {/* Dismiss Button */}
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={handleDismiss}
                className={`inline-flex rounded-md p-1.5 ${styles.icon} hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                aria-label="Dismiss"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Specialized error components for common use cases
export const PaymentError = ({ message, onRetry }) => (
  <ErrorMessage 
    type="error"
    title="Payment Failed"
    contactSupport={true}
  >
    <p>{message}</p>
    {onRetry && (
      <div className="mt-3">
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Try Again
        </button>
      </div>
    )}
  </ErrorMessage>
);

export const FormError = ({ errors }) => {
  if (!errors || errors.length === 0) return null;
  
  return (
    <ErrorMessage type="error" title="Please fix the following errors:">
      <ul className="list-disc list-inside space-y-1">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </ErrorMessage>
  );
};

export const NetworkError = ({ onRetry }) => (
  <ErrorMessage 
    type="error"
    title="Connection Error"
    contactSupport={true}
  >
    <p>Unable to connect to our servers. Please check your internet connection and try again.</p>
    {onRetry && (
      <div className="mt-3">
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Retry
        </button>
      </div>
    )}
  </ErrorMessage>
);

export const SuccessMessage = ({ children, title = "Success!" }) => (
  <ErrorMessage type="success" title={title}>
    {children}
  </ErrorMessage>
);

export const WarningMessage = ({ children, title = "Warning" }) => (
  <ErrorMessage type="warning" title={title}>
    {children}
  </ErrorMessage>
);

export const InfoMessage = ({ children, title = "Information" }) => (
  <ErrorMessage type="info" title={title}>
    {children}
  </ErrorMessage>
);

export default ErrorMessage;
