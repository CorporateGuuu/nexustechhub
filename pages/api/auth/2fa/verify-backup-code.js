import { verifyBackupCode } from '../../../../lib/2fa';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { userId, code } = req.body;
    
    if (!userId || !code) {
      return res.status(400).json({ message: 'Invalid request parameters' });
    }
    
    // Verify the backup code
    const isValid = await verifyBackupCode(userId, code);
    
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid backup code' });
    }
    
    // Set a session cookie to indicate 2FA verification
    res.setHeader('Set-Cookie', `twoFactorVerified=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`);
    
    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error verifying backup code:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
