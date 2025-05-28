// Sentry Test Component for Nexus TechHub
import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';

const SentryTestButton = () => {
  const [testResults, setTestResults] = useState([]);

  // Test different types of errors
  const testSentryIntegration = () => {
    const results = [];

    try {
      // Test 1: Manual error capture
      Sentry.captureMessage('Nexus TechHub Sentry Test - Manual Message', 'info');
      results.push('✅ Manual message sent to Sentry');

      // Test 2: Exception capture
      try {
        throw new Error('Nexus TechHub Test Error - This is intentional for testing Sentry integration');
      } catch (error) {
        Sentry.captureException(error);
        results.push('✅ Exception captured and sent to Sentry');
      }

      // Test 3: Custom context
      Sentry.setContext('test_context', {
        test_type: 'sentry_integration',
        component: 'SentryTestButton',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        app_version: '1.0.0'
      });

      Sentry.captureMessage('Nexus TechHub - Context Test', 'warning');
      results.push('✅ Message with custom context sent');

      // Test 4: User context
      Sentry.setUser({
        id: 'test-user-123',
        email: 'test@nexustechhub.ae',
        username: 'sentry-tester'
      });

      Sentry.captureMessage('Nexus TechHub - User Context Test', 'info');
      results.push('✅ Message with user context sent');

      // Test 5: Performance monitoring (using newer Sentry API)
      Sentry.withScope((scope) => {
        scope.setTag('test_type', 'performance');
        scope.setContext('performance_test', {
          component: 'SentryTestButton',
          test_name: 'sentry-test-transaction'
        });

        setTimeout(() => {
          results.push('✅ Performance monitoring scope completed');
          setTestResults([...results, '🎉 All Sentry tests completed! Check your Sentry dashboard.']);
        }, 1000);
      });

      setTestResults(results);

    } catch (error) {
      console.error('Sentry test failed:', error);
      setTestResults(['❌ Sentry test failed: ' + error.message]);
    }
  };

  // Test JavaScript error
  const testJavaScriptError = () => {
    // This will trigger an unhandled error that Sentry should catch
    setTimeout(() => {
      throw new Error('Nexus TechHub - Unhandled JavaScript Error Test');
    }, 100);

    setTestResults(['🚀 Unhandled error triggered - check Sentry dashboard']);
  };

  // Test network error simulation
  const testNetworkError = async () => {
    try {
      // Simulate a failed API call
      const response = await fetch('/api/nonexistent-endpoint');
      if (!response.ok) {
        throw new Error(`Network error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          error_type: 'network_error',
          component: 'SentryTestButton'
        },
        extra: {
          endpoint: '/api/nonexistent-endpoint',
          test_type: 'network_simulation'
        }
      });

      setTestResults(['✅ Network error captured and sent to Sentry']);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🔍 Sentry Integration Test
      </h3>

      <div className="space-y-3 mb-4">
        <button
          onClick={testSentryIntegration}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Test Sentry Integration
        </button>

        <button
          onClick={testJavaScriptError}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Test Unhandled Error
        </button>

        <button
          onClick={testNetworkError}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Test Network Error
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Test Results:</h4>
          <div className="space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm text-gray-600">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>💡 After running tests, check your Sentry dashboard at:</p>
        <p className="font-mono">https://sentry.io/organizations/[your-org]/issues/</p>
      </div>
    </div>
  );
};

export default SentryTestButton;
