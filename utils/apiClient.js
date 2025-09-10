/**
 * Centralized API client utility for making HTTP requests with error handling and authentication.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

async function request(endpoint, { method = 'GET', body = null, headers = {}, params = {}, authToken = null } = {}) {
  try {
    // Build URL with query parameters
    const url = new URL(endpoint, API_BASE_URL);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });

    // Setup headers
    const reqHeaders = new Headers({
      'Content-Type': 'application/json',
      ...headers,
    });

    // Add auth token if provided
    if (authToken) {
      reqHeaders.set('Authorization', `Bearer ${authToken}`);
    }

    // Setup fetch options
    const options = {
      method,
      headers: reqHeaders,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), options);

    const contentType = response.headers.get('content-type');
    let data = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = new Error(data?.message || response.statusText || 'API request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

export default {
  request,
};
