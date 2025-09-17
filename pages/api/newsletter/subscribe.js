export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  try {
    // Here you would typically integrate with an email service like:
    // - SendGrid
    // - Mailchimp
    // - ConvertKit
    // - Your own email service

    // For now, we'll simulate a successful subscription
    // In production, replace this with actual email service integration

    console.log('Newsletter subscription:', email);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return res.status(200).json({
      message: 'Thank you for subscribing! You will receive our latest updates.',
      email: email
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      message: 'Something went wrong. Please try again later.'
    });
  }
}
