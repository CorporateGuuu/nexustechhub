// Two-Factor Authentication for Nexus TechHub
// Mock implementation for demo purposes

export const verify2FA = async (userId, code, method = 'email') => {
  console.log(`2FA verification for user ${userId} with code ${code} via ${method}`);
  
  // Mock verification - always succeeds for demo
  return {
    success: true,
    verified: true
  };
};

export const generate2FASecret = async (userId) => {
  console.log(`Generating 2FA secret for user ${userId}`);
  
  // Mock secret generation
  return {
    secret: 'MOCK2FASECRET123456789',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  };
};

export const enable2FA = async (userId, method = 'email') => {
  console.log(`Enabling 2FA for user ${userId} via ${method}`);
  
  return {
    success: true,
    enabled: true,
    method
  };
};

export const disable2FA = async (userId) => {
  console.log(`Disabling 2FA for user ${userId}`);
  
  return {
    success: true,
    enabled: false
  };
};

export const getUserTwoFactorSettings = async (userId) => {
  console.log(`Getting 2FA settings for user ${userId}`);
  
  // Mock settings - 2FA disabled by default
  return {
    enabled: false,
    email_enabled: false,
    sms_enabled: false,
    duo_enabled: false,
    preferred_method: 'email',
    backup_codes_count: 0
  };
};

export const sendTwoFactorCode = async (userId, method = 'email') => {
  console.log(`Sending 2FA code to user ${userId} via ${method}`);
  
  return {
    success: true,
    sent: true,
    method,
    code: '123456' // Mock code for demo
  };
};

export const generateBackupCodes = async (userId) => {
  console.log(`Generating backup codes for user ${userId}`);
  
  // Mock backup codes
  const codes = [];
  for (let i = 0; i < 10; i++) {
    codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
  }
  
  return {
    success: true,
    codes
  };
};

export const verifyBackupCode = async (userId, code) => {
  console.log(`Verifying backup code for user ${userId}: ${code}`);
  
  // Mock verification - always succeeds for demo
  return {
    success: true,
    verified: true,
    remaining_codes: 9
  };
};

// Additional 2FA functions
export const generateDuoRequest = async (userId) => {
  console.log(`Generating Duo request for user ${userId}`);
  return {
    success: true,
    duo_request: 'TX|mock-duo-request|mock-app-id',
    duo_host: 'api-mock.duosecurity.com'
  };
};

export const verifyDuoResponse = async (duoResponse, userId) => {
  console.log(`Verifying Duo response for user ${userId}: ${duoResponse}`);
  return {
    success: true,
    verified: true,
    username: `user_${userId}`
  };
};

export const sendEmailVerification = async (userId, email) => {
  console.log(`Sending email verification to ${email} for user ${userId}`);
  return {
    success: true,
    sent: true,
    code: '123456',
    expires_at: new Date(Date.now() + 300000).toISOString()
  };
};

export const sendSmsVerification = async (userId, phone) => {
  console.log(`Sending SMS verification to ${phone} for user ${userId}`);
  return {
    success: true,
    sent: true,
    code: '654321',
    expires_at: new Date(Date.now() + 300000).toISOString()
  };
};

export const verifyCode = async (userId, code, method = 'email') => {
  console.log(`Verifying ${method} code ${code} for user ${userId}`);
  return {
    success: true,
    verified: true,
    method
  };
};

export const updateUserTwoFactorSettings = async (userId, settings) => {
  console.log(`Updating 2FA settings for user ${userId}:`, settings);
  return {
    success: true,
    settings: {
      ...settings,
      updated_at: new Date().toISOString()
    }
  };
};

export default {
  verify2FA,
  generate2FASecret,
  enable2FA,
  disable2FA,
  getUserTwoFactorSettings,
  sendTwoFactorCode,
  generateBackupCodes,
  verifyBackupCode,
  generateDuoRequest,
  verifyDuoResponse,
  sendEmailVerification,
  sendSmsVerification,
  verifyCode,
  updateUserTwoFactorSettings
};
