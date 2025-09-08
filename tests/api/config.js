// Configuration for RepairDesk API tests
// Update these values with your actual RepairDesk API credentials

const config = {
  // Base URL for RepairDesk API
  baseURL: 'https://api.repairdesk.com/api/v1',

  // API Key for authentication (add to query string)
  apiKey: 'your_api_key_here',

  // Test Ticket IDs
  validTicketId: '12345', // Replace with a known valid ticket ID
  invalidTicketId: 'invalid_ticket_id',
  nonExistentTicketId: '999999999',

  // Test timeout in milliseconds
  timeout: 10000
};

module.exports = config;
