import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/nextjs';
import styles from './StoreLocationsList.module.css';

export default function StoreLocationsList() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);

  // API configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'dummy-api-key'; // Placeholder - replace with actual key

  // Fetch store locations
  const fetchLocations = async (customApiKey = null) => {
    try {
      setLoading(true);
      setError(null);
      setIsRetrying(false);

      const currentApiKey = customApiKey || API_KEY;

      const response = await fetch(`${API_BASE_URL}/api/appointment/locations?api_key=${encodeURIComponent(currentApiKey)}`, {
        headers: { 'Accept': 'application/json' }
      });

      const data = await response.json();

      if (response.status === 200) {
        if (data.success && data.statusCode === 200) {
          setLocations(data.data || []);
          setRetryAttempts(0);
          toast.success(`Retrieved ${data.data?.length || 0} store locations`);
        } else {
          throw new Error(data.message || 'Unexpected response format');
        }
      } else if (response.status === 401) {
        if (data.success === false && data.statusCode === 401) {
          const errorMessage = data.data?.message || data.message || 'Unauthorized access';
          setError(`Unauthorized: ${errorMessage}`);

          if (retryAttempts < 3) {
            setRetryAttempts(prev => prev + 1);
            setShowApiKeyModal(true);
            toast.error(`Unauthorized: ${errorMessage}. Please provide a new API key.`);
          } else {
            toast.error('Maximum retry attempts reached. Please check your credentials.');
            Sentry.captureException(new Error('401 Unauthorized - Max retries exceeded'), {
              extra: { retryAttempts }
            });
          }
        } else {
          throw new Error('Unexpected 401 response format');
        }
      } else {
        const errorMessage = data.message || `Server error (${response.status})`;
        setError(errorMessage);
        toast.error(`Server error: ${errorMessage}`);

        Sentry.captureException(new Error(`API Error ${response.status}`), {
          extra: { response: data }
        });
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err.message);
      toast.error('Failed to load store locations');

      Sentry.captureException(err, {
        extra: { customApiKey: !!customApiKey }
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle API key retry
  const handleApiKeyRetry = () => {
    if (!newApiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    setShowApiKeyModal(false);
    setIsRetrying(true);
    fetchLocations(newApiKey.trim());
    setNewApiKey('');
  };

  // Cancel API key modal
  const cancelApiKeyModal = () => {
    setShowApiKeyModal(false);
    setNewApiKey('');
    setRetryAttempts(0);
    toast.info('API key update cancelled');
  };

  // Initial load
  useEffect(() => {
    fetchLocations();
  }, []);

  if (loading && locations.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading store locations...</p>
      </div>
    );
  }

  if (error && locations.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => fetchLocations()} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.storeLocationsList}>
      <div className={styles.sectionHeader}>
        <h2>Store Locations</h2>
        <p className={styles.sectionDescription}>
          View and manage store locations for appointments and inventory transfers.
        </p>
      </div>

      {/* Results summary */}
      <div className={styles.resultsSummary}>
        <p>Showing {locations.length} store locations</p>
      </div>

      {/* Locations grid */}
      <div className={styles.locationsGrid}>
        {locations.length === 0 ? (
          <div className={styles.noResults}>
            No store locations found.
          </div>
        ) : (
          locations.map(location => (
            <div key={location.id} className={styles.locationCard}>
              <div className={styles.locationHeader}>
                <h3 className={styles.locationName}>{location.name}</h3>
                {location.alternateName && location.alternateName !== location.name && (
                  <p className={styles.alternateName}>{location.alternateName}</p>
                )}
              </div>

              <div className={styles.locationDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Address:</span>
                  <span>{location.address}, {location.city}, {location.state} {location.postcode}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Country:</span>
                  <span>{location.country}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Phone:</span>
                  <span>{location.phone}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Mobile:</span>
                  <span>{location.mobile}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Email:</span>
                  <span>{location.email}</span>
                </div>

                {location.latitude && location.longitude && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Coordinates:</span>
                    <span>{location.latitude}, {location.longitude}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* API Key Retry Modal */}
      {showApiKeyModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>API Key Required</h3>
              <button
                onClick={cancelApiKeyModal}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Your API key is invalid or expired. Please enter a new API key to retry.</p>
              <input
                type="text"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter new API key"
                className={styles.apiKeyInput}
              />
            </div>
            <div className={styles.modalFooter}>
              <button
                onClick={handleApiKeyRetry}
                className={styles.applyButton}
                disabled={isRetrying}
              >
                Retry
              </button>
              <button
                onClick={cancelApiKeyModal}
                className={styles.clearButton}
                disabled={isRetrying}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
