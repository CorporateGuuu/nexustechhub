import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Sentry from '@sentry/react';

const validateParams = ({ apiKey }) => {
  const errors = [];
  if (!apiKey) errors.push('Missing api_key');
  return errors.length ? errors : null;
};

const RepairTypesList = () => {
  const [repairTypes, setRepairTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_API_KEY || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRIES = 3;

  const fetchRepairTypes = async (customApiKey = null, retries = 3, delay = 1000) => {
    const currentApiKey = customApiKey || apiKey;
    const errors = validateParams({ apiKey: currentApiKey });
    if (errors) {
      setError(`Validation failed: ${errors.join(', ')}`);
      setRepairTypes([]);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const attemptFetch = async (attempt) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/appointment/repairtypes?api_key=${currentApiKey}`,
          { headers: { 'Accept': 'application/json' } }
        );

        // Handle 200 OK response
        if (response.data.success === true && response.data.statusCode === 200) {
          const { message, data } = response.data;
          const repairTypesData = data[0] || [];
          setRepairTypes(repairTypesData);
          setSuccessMessage(`Retrieved ${repairTypesData.length} repair types`);
          setShowApiKeyInput(false);
          setRetryAttempts(0);
          return;
        } else {
          // Handle unexpected success response structure
          throw new Error('Unexpected response structure');
        }
      } catch (err) {
        const response = err.response;

        if (response) {
          // Handle 401 Unauthorized
          if (response.status === 401 && response.data.success === false && response.data.statusCode === 401) {
            const { data: errorData } = response.data;
            const errorMessage = `Unauthorized: ${errorData.message || 'Please check your API key'}`;

            if (retryAttempts < MAX_RETRIES) {
              setError(errorMessage);
              setShowApiKeyInput(true);
              setRetryAttempts(prev => prev + 1);
            } else {
              setError(`${errorMessage} - Maximum retry attempts reached`);
              setShowApiKeyInput(false);
            }
            throw err; // Re-throw to stop retry for 401
          } else {
            // Handle other HTTP errors
            setError(response.data?.message || `HTTP ${response.status}: ${response.statusText}`);
            throw err;
          }
        } else {
          // Handle network/other errors - retry with backoff
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
            return attemptFetch(attempt + 1);
          } else {
            setError('Network error: Failed to fetch repair types after retries');
            throw err;
          }
        }

        // Log error to Sentry
        try {
          Sentry.captureException(err, {
            tags: {
              component: 'RepairTypesList',
              error_type: 'api_error',
              status_code: response?.status
            },
            extra: {
              api_key_provided: !!currentApiKey,
              retry_attempt: attempt,
              response_data: response?.data
            }
          });
        } catch (sentryError) {
          console.error('Failed to log error to Sentry:', sentryError);
        }
      }
    };

    try {
      await attemptFetch(0);
    } catch (err) {
      setRepairTypes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      fetchRepairTypes(apiKey.trim());
    }
  };

  useEffect(() => {
    if (apiKey) {
      fetchRepairTypes();
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  return (
    <div className="space-y-4">
      <h2>Repair Types</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      {loading && <p className="text-gray-500">Loading...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="text-sm">Error: {error}</p>
        </div>
      )}

      {showApiKeyInput && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <form onSubmit={handleApiKeySubmit} className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium">
              Please enter your API key (Attempt {retryAttempts}/{MAX_RETRIES}):
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter API key"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              disabled={loading}
            >
              {loading ? 'Retrying...' : 'Submit API Key'}
            </button>
          </form>
        </div>
      )}

      {repairTypes.length > 0 && (
        <div>
          <h3>Available Repair Types</h3>
          <select className="border p-2 rounded">
            <option value="">Select a repair type</option>
            {repairTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      )}

      {repairTypes.length === 0 && !loading && !error && !showApiKeyInput && (
        <p>No repair types found</p>
      )}
    </div>
  );
};

export default RepairTypesList;
