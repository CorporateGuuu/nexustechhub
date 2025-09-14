import * as Sentry from '@sentry/nextjs';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      throw new Error('Test Sentry event triggered from /api/test-sentry-event');
    } catch (error) {
      Sentry.captureException(error);
      res.status(200).json({ message: 'Sentry test event captured' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
