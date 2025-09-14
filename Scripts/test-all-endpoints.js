// test-all-endpoints.js
const fetch = require('node-fetch');

const testEndpoint = async (endpoint, method = 'GET', body = null) => {
  try {
    const baseUrl = 'https://api.repairdesk.co'; // Corrected base URL
    const apiKey = 'tbpzKBH-6yxj-VB8Y-xYp0-jkO3HL8SB';
    const url = `${baseUrl}${endpoint}?api_key=${apiKey}`;
    const options = {
      method,
      headers: {
        'Accept': 'application/json',
        ...(method !== 'GET' && { 'Content-Type': 'application/json' })
      },
      ...(body && { body: JSON.stringify(body) })
    };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Status: ${response.status} - ${response.statusText}`);
    const data = await response.json();
    console.log(`✓ Test for ${endpoint} (${method}) succeeded:`, data);
    return data;
  } catch (error) {
    console.error(`✗ Test for ${endpoint} (${method}) failed:`, error.message);
    return null;
  }
};

const runTests = async () => {
 // GET tests
 await testEndpoint('/api/web/v1/appointment/locations');
 await testEndpoint('/api/web/v1/appointment/repairtypes');
 await testEndpoint('/api/web/v1/appointment/inventory');
 await testEndpoint('/api/web/v1/purchaseorderdetails', 'GET', null, { page: 1, pagesize: 10 });
 await testEndpoint('/api/web/v1/inventorytransfer', 'GET', null, { status: 'Completed' });
 await testEndpoint('/api/web/v1/inventory');
 await testEndpoint('/api/web/v1/tickets', 'GET', null, { page: 1, pagesize: 10 });
 await testEndpoint('/api/web/v1/invoices', 'GET', null, { page: 1, pagesize: 10 });

 // POST/PUT tests with mock data (adjust IDs and data as needed)
 const mockTicketData = {
   name: "Test Ticket",
   device: "Test Device",
   devices: [{ imei: '114231112421231', public_comments: 'Test repair' }],
   customFields: [],
   summary: { customer_id: '388' }
 };
 await testEndpoint('/api/web/v1/tickets', 'POST', mockTicketData);

 const mockInvoiceData = {
   customer_id: '388',
   items: [{ sku: '107082004816', quantity: 1 }]
 };
 await testEndpoint('/api/web/v1/invoices', 'POST', mockInvoiceData);

 // Add tests for /invoices/{Invoice-Id}, /inventory/{id}, etc., with known IDs
};

runTests();
