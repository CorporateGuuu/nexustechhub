// Monitoring Batch API for Nexus TechHub - Production Error Logging
import { createHash } from 'crypto';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100;
const rateLimitMap = new Map();

// Error severity levels
const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Determine error severity
function getErrorSeverity(errorType, error) {
  if (errorType === 'javascript_error' && error.message?.includes('Script error')) {
    return ERROR_SEVERITY.LOW;
  }
  
  if (errorType === 'api_error' && error.status >= 500) {
    return ERROR_SEVERITY.HIGH;
  }
  
  if (errorType === 'unhandled_promise_rejection') {
    return ERROR_SEVERITY.HIGH;
  }
  
  if (errorType === 'react_error') {
    return ERROR_SEVERITY.MEDIUM;
  }
  
  return ERROR_SEVERITY.MEDIUM;
}

// Rate limiting middleware
function checkRateLimit(req) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Clean old entries
  for (const [ip, requests] of rateLimitMap.entries()) {
    rateLimitMap.set(ip, requests.filter(time => time > windowStart));
    if (rateLimitMap.get(ip).length === 0) {
      rateLimitMap.delete(ip);
    }
  }
  
  // Check current IP
  const requests = rateLimitMap.get(clientIP) || [];
  if (requests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  requests.push(now);
  rateLimitMap.set(clientIP, requests);
  return true;
}

// Sanitize sensitive data
function sanitizeData(data) {
  const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth', 'credit', 'card'];
  
  function sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    const sanitized = Array.isArray(obj) ? [] : {};
    
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveKeys.some(sensitive => lowerKey.includes(sensitive));
      
      if (isSensitive) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object') {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
  
  return sanitizeObject(data);
}

// Process error data
function processErrors(errors) {
  return errors.map(error => {
    const severity = getErrorSeverity(error.type, error);
    const hash = createHash('md5')
      .update(`${error.type}-${error.message}-${error.url}`)
      .digest('hex');
    
    return {
      ...sanitizeData(error),
      severity,
      hash,
      processed_at: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0'
    };
  });
}

// Process performance data
function processPerformance(performance) {
  return performance.map(metric => ({
    ...metric,
    processed_at: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    device_type: getDeviceType(metric.user_agent)
  }));
}

// Get device type from user agent
function getDeviceType(userAgent) {
  if (!userAgent) return 'unknown';
  
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    return 'mobile';
  }
  
  if (/Tablet|iPad/.test(userAgent)) {
    return 'tablet';
  }
  
  return 'desktop';
}

// Send to external monitoring services
async function sendToExternalServices(data) {
  const promises = [];
  
  // Send to Slack webhook
  if (process.env.SLACK_WEBHOOK_URL && data.errors.length > 0) {
    const criticalErrors = data.errors.filter(error => error.severity === ERROR_SEVERITY.CRITICAL);
    
    if (criticalErrors.length > 0) {
      promises.push(
        fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚨 Critical Error Alert - Nexus TechHub`,
            attachments: [{
              color: 'danger',
              fields: [{
                title: 'Critical Errors Detected',
                value: `${criticalErrors.length} critical error(s) reported`,
                short: true
              }, {
                title: 'Environment',
                value: process.env.NODE_ENV,
                short: true
              }]
            }]
          })
        }).catch(console.error)
      );
    }
  }
  
  // Send to custom webhook
  if (process.env.MONITORING_WEBHOOK_URL) {
    promises.push(
      fetch(process.env.MONITORING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(console.error)
    );
  }
  
  await Promise.allSettled(promises);
}

// Store data (in production, this would go to a database)
async function storeMonitoringData(data) {
  try {
    // In production, store to database
    // For now, we'll log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Monitoring data received:', {
        errors: data.errors.length,
        performance: data.performance.length,
        analytics: data.analytics.length,
        session_id: data.session_id
      });
    }
    
    // Store to file system for debugging (development only)
    if (process.env.NODE_ENV === 'development' && data.errors.length > 0) {
      const fs = require('fs').promises;
      const path = require('path');
      
      const logDir = path.join(process.cwd(), 'logs');
      await fs.mkdir(logDir, { recursive: true });
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const logFile = path.join(logDir, `monitoring-${timestamp}.json`);
      
      await fs.writeFile(logFile, JSON.stringify(data, null, 2));
    }
    
    return true;
  } catch (error) {
    console.error('Failed to store monitoring data:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Check rate limiting
    if (!checkRateLimit(req)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        retry_after: 60
      });
    }
    
    // Validate request body
    const { errors = [], performance = [], analytics = [], session_id } = req.body;
    
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    // Process the data
    const processedData = {
      session_id,
      errors: processErrors(errors),
      performance: processPerformance(performance),
      analytics: analytics.map(event => sanitizeData(event)),
      received_at: new Date().toISOString(),
      client_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      user_agent: req.headers['user-agent']
    };
    
    // Store the data
    const stored = await storeMonitoringData(processedData);
    
    // Send to external services
    await sendToExternalServices(processedData);
    
    // Generate response
    const response = {
      success: true,
      processed: {
        errors: processedData.errors.length,
        performance: processedData.performance.length,
        analytics: processedData.analytics.length
      },
      session_id,
      stored
    };
    
    // Add warnings for high error rates
    if (processedData.errors.length > 10) {
      response.warning = 'High error rate detected';
    }
    
    const criticalErrors = processedData.errors.filter(error => error.severity === ERROR_SEVERITY.CRITICAL);
    if (criticalErrors.length > 0) {
      response.alert = `${criticalErrors.length} critical error(s) detected`;
    }
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Monitoring API error:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to process monitoring data'
    });
  }
}
