import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/nextjs';
import styles from './InventoryTransferList.module.css';

export default function InventoryTransferList() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    from_store: '',
    to_store: '',
    from_date: '',
    to_date: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 20,
    total_records: 0,
    total_pages: 0
  });
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);

  // Stock update states
  const [updatingStock, setUpdatingStock] = useState(false);
  const [updatingTransferId, setUpdatingTransferId] = useState(null);

  // API base URL and key
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006';
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'test_api_key';

  // Validation function for filter parameters
  const validateFilters = (filters) => {
    const errors = [];

    // Validate API key
    if (!API_KEY || API_KEY.trim() === '') {
      errors.push('API key is required');
    }

    // Validate store IDs (should be integers if provided)
    if (filters.from_store && filters.from_store.trim() !== '') {
      const fromStoreId = parseInt(filters.from_store);
      if (isNaN(fromStoreId) || fromStoreId <= 0) {
        errors.push('From Store ID must be a positive integer');
      }
    }

    if (filters.to_store && filters.to_store.trim() !== '') {
      const toStoreId = parseInt(filters.to_store);
      if (isNaN(toStoreId) || toStoreId <= 0) {
        errors.push('To Store ID must be a positive integer');
      }
    }

    // Validate status (should be one of the allowed values if provided)
    if (filters.status && filters.status.trim() !== '') {
      const allowedStatuses = ['Pending', 'Completed', 'Cancelled'];
      if (!allowedStatuses.includes(filters.status)) {
        errors.push('Status must be one of: Pending, Completed, Cancelled');
      }
    }

    // Validate date formats (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (filters.from_date && filters.from_date.trim() !== '') {
      if (!dateRegex.test(filters.from_date)) {
        errors.push('From Date must be in YYYY-MM-DD format');
      } else {
        // Check if it's a valid date
        const date = new Date(filters.from_date);
        if (isNaN(date.getTime())) {
          errors.push('From Date is not a valid date');
        }
      }
    }

    if (filters.to_date && filters.to_date.trim() !== '') {
      if (!dateRegex.test(filters.to_date)) {
        errors.push('To Date must be in YYYY-MM-DD format');
      } else {
        // Check if it's a valid date
        const date = new Date(filters.to_date);
        if (isNaN(date.getTime())) {
          errors.push('To Date is not a valid date');
        }
      }
    }

    // Validate date range logic
    if (filters.from_date && filters.to_date &&
        filters.from_date.trim() !== '' && filters.to_date.trim() !== '') {
      const fromDate = new Date(filters.from_date);
      const toDate = new Date(filters.to_date);
      if (fromDate > toDate) {
        errors.push('From Date cannot be later than To Date');
      }
    }

    return errors;
  };

  // Fetch transfers with enhanced error handling
  const fetchTransfers = async (page = 1, customApiKey = null) => {
    try {
      setLoading(true);
      setError(null);
      setIsRetrying(false);

      // Use custom API key if provided (for retry after 401)
      const currentApiKey = customApiKey || API_KEY;

      // Build query parameters
      const params = new URLSearchParams({
        api_key: currentApiKey,
        page: page.toString(),
        per_page: pagination.per_page.toString()
      });

      // Add filters
      if (filters.status) params.append('status', filters.status);
      if (filters.from_store) params.append('from_store', filters.from_store);
      if (filters.to_store) params.append('to_store', filters.to_store);
      if (filters.from_date) params.append('from_date', filters.from_date);
      if (filters.to_date) params.append('to_date', filters.to_date);

      const response = await fetch(`${API_BASE_URL}/api/inventorytransfer?${params}`, {
        headers: { 'Accept': 'application/json' }
      });

      const data = await response.json();

      // Handle different response status codes
      if (response.status === 200) {
        // 200 OK - Confirm success and extract data
        if (data.success && data.statusCode === 200) {
          setTransfers(data.data.inventoryTransferListData || []);
          setPagination(data.data.pagination || pagination);
          setRetryAttempts(0); // Reset retry attempts on success
          toast.success(`Retrieved ${data.data.inventoryTransferListData?.length || 0} inventory transfers`);
        } else {
          throw new Error(data.message || 'Unexpected response format');
        }
      } else if (response.status === 400) {
        // 400 Bad Request - Extract error field
        const errorMessage = data.error || 'Invalid request parameters';
        setError(errorMessage);
        toast.error(`Error: ${errorMessage}`);
        toast.info('Please check your parameter values and try again');
      } else if (response.status === 401) {
        // 401 Unauthorized - Extract data fields and prompt for new API key
        if (data.success === false && data.statusCode === 401) {
          const errorMessage = data.data?.message || data.message || 'Unauthorized access';
          setError(`Unauthorized: ${errorMessage}`);

          // Check retry attempts
          if (retryAttempts < 3) {
            setRetryAttempts(prev => prev + 1);
            setShowApiKeyModal(true);
            toast.error(`Unauthorized: ${errorMessage}. Please provide a new API key.`);
          } else {
            toast.error('Maximum retry attempts reached. Please check your credentials.');
            Sentry.captureException(new Error('401 Unauthorized - Max retries exceeded'), {
              extra: { params: Object.fromEntries(params), retryAttempts }
            });
          }
        } else {
          throw new Error('Unexpected 401 response format');
        }
      } else {
        // Other error codes (500, etc.)
        const errorMessage = data.message || `Server error (${response.status})`;
        setError(errorMessage);
        toast.error(`Server error: ${errorMessage}`);

        // Log to Sentry
        Sentry.captureException(new Error(`API Error ${response.status}`), {
          extra: { params: Object.fromEntries(params), response: data }
        });
      }
    } catch (err) {
      console.error('Error fetching transfers:', err);
      setError(err.message);
      toast.error('Failed to load inventory transfers');

      // Log to Sentry for network/other errors
      Sentry.captureException(err, {
        extra: { params: { page, filters }, customApiKey: !!customApiKey }
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
    fetchTransfers(1, newApiKey.trim());
    setNewApiKey('');
  };

  // Cancel API key modal
  const cancelApiKeyModal = () => {
    setShowApiKeyModal(false);
    setNewApiKey('');
    setRetryAttempts(0);
    toast.info('API key update cancelled');
  };

  // Handle stock update operations (Complete/Cancel)
  const handleStockUpdate = async (transferId, action) => {
    // Prevent multiple simultaneous updates
    if (updatingStock) {
      toast.warning('Please wait for the current operation to complete');
      return;
    }

    // Confirm cancel action
    if (action === 'cancel') {
      const confirmed = window.confirm(
        'Are you sure you want to cancel this transfer? This action cannot be undone.'
      );
      if (!confirmed) {
        return;
      }
    }

    try {
      setUpdatingStock(true);
      setUpdatingTransferId(transferId);

      const response = await fetch(`${API_BASE_URL}/api/inventorytransfer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          api_key: API_KEY,
          transfer_id: transferId,
          action: action
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update the transfer status in the local state
        setTransfers(prevTransfers =>
          prevTransfers.map(transfer =>
            transfer.id === transferId
              ? { ...transfer, status: action === 'complete' ? 'Completed' : 'Cancelled' }
              : transfer
          )
        );

        // Update selected transfer if it's the one being updated
        if (selectedTransfer && selectedTransfer.id === transferId) {
          setSelectedTransfer(prev => ({
            ...prev,
            status: action === 'complete' ? 'Completed' : 'Cancelled'
          }));
        }

        // Show success message
        const actionText = action === 'complete' ? 'completed' : 'cancelled';
        toast.success(`Transfer ${actionText} successfully`);

        // Refresh the transfer list to get updated data
        await fetchTransfers(pagination.page);

      } else {
        // Handle API errors
        const errorMessage = data.message || `Failed to ${action} transfer`;
        toast.error(errorMessage);

        // Log to Sentry for debugging
        Sentry.captureException(new Error(`Stock update failed: ${action}`), {
          extra: { transferId, action, response: data }
        });
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Network error occurred. Please try again.');

      // Log to Sentry
      Sentry.captureException(error, {
        extra: { transferId, action }
      });
    } finally {
      setUpdatingStock(false);
      setUpdatingTransferId(null);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTransfers();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    // Validate filters before making API call
    const errors = validateFilters(filters);
    setValidationErrors(errors);

    if (errors.length > 0) {
      // Don't make API call if validation fails
      toast.error('Please fix the validation errors before applying filters');
      return;
    }

    setPagination(prev => ({ ...prev, page: 1 }));
    fetchTransfers(1);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      status: '',
      from_store: '',
      to_store: '',
      from_date: '',
      to_date: ''
    });
    setValidationErrors([]); // Clear validation errors
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchTransfers(1);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
      fetchTransfers(newPage);
    }
  };

  // View transfer details
  const viewTransferDetails = (transfer) => {
    setSelectedTransfer(transfer);
    setShowDetailsModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#d4edda';
      case 'pending':
        return '#fff3cd';
      case 'cancelled':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  };

  // Get status text color
  const getStatusTextColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#155724';
      case 'pending':
        return '#856404';
      case 'cancelled':
        return '#721c24';
      default:
        return '#383d41';
    }
  };

  if (loading && transfers.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading inventory transfers...</p>
      </div>
    );
  }

  if (error && transfers.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => fetchTransfers()} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.inventoryTransferList}>
      <div className={styles.sectionHeader}>
        <h2>Inventory Transfers</h2>
        <p className={styles.sectionDescription}>
          View and manage inventory transfers between stores and locations.
        </p>
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>From Store</label>
            <input
              type="text"
              name="from_store"
              value={filters.from_store}
              onChange={handleFilterChange}
              placeholder="From store ID"
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>To Store</label>
            <input
              type="text"
              name="to_store"
              value={filters.to_store}
              onChange={handleFilterChange}
              placeholder="To store ID"
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>From Date</label>
            <input
              type="date"
              name="from_date"
              value={filters.from_date}
              onChange={handleFilterChange}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>To Date</label>
            <input
              type="date"
              name="to_date"
              value={filters.to_date}
              onChange={handleFilterChange}
              className={styles.filterInput}
            />
          </div>
        </div>

        <div className={styles.filterActions}>
          <button onClick={applyFilters} className={styles.applyButton}>
            Apply Filters
          </button>
          <button onClick={clearFilters} className={styles.clearButton}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className={styles.validationErrors}>
          <h4>Validation Errors:</h4>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Results summary */}
      <div className={styles.resultsSummary}>
        <p>
          Showing {transfers.length} of {pagination.total_records} transfers
          {pagination.total_pages > 1 && ` (Page ${pagination.page} of ${pagination.total_pages})`}
        </p>
      </div>

      {/* Transfers table */}
      <div className={styles.tableContainer}>
        <table className={styles.transfersTable}>
          <thead>
            <tr>
              <th>Transfer ID</th>
              <th>Status</th>
              <th>From Store</th>
              <th>To Store</th>
              <th>Type</th>
              <th>Date</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transfers.length === 0 ? (
              <tr>
                <td colSpan="8" className={styles.noResults}>
                  No transfers found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              transfers.map(transfer => (
                <tr key={transfer.id}>
                  <td className={styles.transferId}>{transfer.transfer_id}</td>
                  <td>
                    <span
                      className={styles.statusBadge}
                      style={{
                        backgroundColor: getStatusColor(transfer.status),
                        color: getStatusTextColor(transfer.status)
                      }}
                    >
                      {transfer.status}
                    </span>
                  </td>
                  <td>{transfer.from_store}</td>
                  <td>{transfer.to_store}</td>
                  <td>{transfer.type}</td>
                  <td>{formatDate(transfer.transaction_date)}</td>
                  <td>{transfer.items?.length || 0} items</td>
                  <td>
                    <button
                      onClick={() => viewTransferDetails(transfer)}
                      className={styles.viewButton}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className={styles.pageButton}
          >
            Previous
          </button>

          <span className={styles.pageInfo}>
            Page {pagination.page} of {pagination.total_pages}
          </span>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.total_pages}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
      )}

      {/* Transfer Details Modal */}
      {showDetailsModal && selectedTransfer && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Transfer Details - {selectedTransfer.transfer_id}</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.transferInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Status:</span>
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: getStatusColor(selectedTransfer.status),
                      color: getStatusTextColor(selectedTransfer.status)
                    }}
                  >
                    {selectedTransfer.status}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>From Store:</span>
                  <span>{selectedTransfer.from_store}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>To Store:</span>
                  <span>{selectedTransfer.to_store}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Type:</span>
                  <span>{selectedTransfer.type}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Date:</span>
                  <span>{formatDate(selectedTransfer.transaction_date)}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>Created By:</span>
                  <span>{selectedTransfer.created_by}</span>
                </div>
              </div>

              <div className={styles.itemsSection}>
                <h4>Items ({selectedTransfer.items?.length || 0})</h4>
                {selectedTransfer.items && selectedTransfer.items.length > 0 ? (
                  <table className={styles.itemsTable}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>GST</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTransfer.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.sku}</td>
                          <td>{item.quantity}</td>
                          <td>${parseFloat(item.price).toFixed(2)}</td>
                          <td>${parseFloat(item.gst).toFixed(2)}</td>
                          <td>${((item.quantity * item.price) + item.gst).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items found for this transfer.</p>
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              {/* Show Complete/Cancel buttons only for pending transfers */}
              {selectedTransfer?.status?.toLowerCase() === 'pending' && (
                <div className={styles.actionButtons}>
                  <button
                    onClick={() => handleStockUpdate(selectedTransfer.id, 'complete')}
                    disabled={updatingStock && updatingTransferId === selectedTransfer.id}
                    className={styles.completeButton}
                  >
                    {updatingStock && updatingTransferId === selectedTransfer.id ? 'Completing...' : 'Complete Transfer'}
                  </button>
                  <button
                    onClick={() => handleStockUpdate(selectedTransfer.id, 'cancel')}
                    disabled={updatingStock && updatingTransferId === selectedTransfer.id}
                    className={styles.cancelButton}
                  >
                    {updatingStock && updatingTransferId === selectedTransfer.id ? 'Cancelling...' : 'Cancel Transfer'}
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowDetailsModal(false)}
                className={styles.closeModalButton}
                disabled={updatingStock}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
                className={styles.filterInput}
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
