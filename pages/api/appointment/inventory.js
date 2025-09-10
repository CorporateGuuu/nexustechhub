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
  const inventory = [
    {
      manufacturer: {
        id: '1',
        name: 'Apple',
        devices: [
          {
            id: '101',
            name: 'iPhone 13',
            problems: [
              {
                id: '1001',
                name: 'Screen Replacement',
                price: 150.00,
                estimatedTime: '2 hours'
              },
              {
                id: '1002',
                name: 'Battery Replacement',
                price: 80.00,
                estimatedTime: '1 hour'
              },
              {
                id: '1003',
                name: 'Camera Repair',
                price: 120.00,
                estimatedTime: '1.5 hours'
              }
            ]
          },
          {
            id: '102',
            name: 'iPhone 14',
            problems: [
              {
                id: '1004',
                name: 'Screen Replacement',
                price: 180.00,
                estimatedTime: '2 hours'
              },
              {
                id: '1005',
                name: 'Charging Port Repair',
                price: 90.00,
                estimatedTime: '1 hour'
              }
            ]
          }
        ]
      }
    },
    {
      manufacturer: {
        id: '2',
        name: 'Samsung',
        devices: [
          {
            id: '201',
            name: 'Galaxy S22',
            problems: [
              {
                id: '2001',
                name: 'Screen Replacement',
                price: 140.00,
                estimatedTime: '2 hours'
              },
              {
                id: '2002',
                name: 'Battery Replacement',
                price: 75.00,
                estimatedTime: '1 hour'
              }
            ]
          },
          {
            id: '202',
            name: 'Galaxy S23',
            problems: [
              {
                id: '2003',
                name: 'Screen Replacement',
                price: 160.00,
                estimatedTime: '2 hours'
              },
              {
                id: '2004',
                name: 'Water Damage Repair',
                price: 200.00,
                estimatedTime: '3 hours'
              }
            ]
          }
        ]
      }
    }
  ];

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'OK',
    data: [inventory]
  });
}
