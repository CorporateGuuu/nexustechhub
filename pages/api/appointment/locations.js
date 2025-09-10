export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      statusCode: 405,
      message: 'Method Not Allowed',
      data: {
        name: 'MethodNotAllowed',
        message: 'Only GET method is allowed.',
        code: 0,
        status: 405
      }
    });
  }

  const { api_key } = req.query;

  // Simple authentication check - in production, use proper validation
  const validApiKey = 'dummy-api-key'; // Replace with actual validation logic

  if (!api_key || api_key !== validApiKey) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Unauthorized',
      data: {
        name: 'Unauthorized',
        message: 'Your request was made with invalid credentials.',
        code: 0,
        status: 401
      }
    });
  }

  // Hardcoded dummy data - replace with database query in production
  const locations = [
    {
      id: '64',
      name: 'Store 1',
      alternateName: 'Store 1',
      api_key: 'dummy2t-t653-reZW-GF33-asdfwer2f',
      latitude: '38.627784',
      longitude: '90.223797',
      mobile: '+1 201-555-0123',
      phone: '+1 201-555-0123',
      email: 'test@gmail.com',
      address: 'abc street',
      postcode: '90001',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States'
    },
    {
      id: '86543',
      name: 'Store A',
      alternateName: '',
      api_key: 'dummy3t-t653-reZW-GF33-asdfwer2f',
      latitude: '39.627784',
      longitude: '91.223797',
      mobile: '+1 202-555-0123',
      phone: '+1 202-555-0123',
      email: 'test1@gmail.com',
      address: 'california street',
      postcode: '90001',
      city: 'Los Angeles',
      state: 'San Francisco',
      country: 'United States'
    },
    {
      id: '2343456',
      name: 'Store C',
      alternateName: '',
      api_key: 'dummy4t-t653-reZW-GF33-asdfwer2f',
      latitude: '41.627784',
      longitude: '95.223797',
      mobile: '+1 212-555-0123',
      phone: '+1 212-555-0123',
      email: 'test2@gmail.com',
      address: 'random street',
      postcode: '90001',
      city: 'Los Angeles',
      state: 'San Diego',
      country: 'United States'
    }
  ];

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'OK',
    data: [locations]
  });
}
