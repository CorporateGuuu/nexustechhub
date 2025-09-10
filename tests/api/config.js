// Configuration for RepairDesk API tests
// Update these values with your actual RepairDesk API credentials

const config = {
  // Base URL for RepairDesk API
  baseURL: 'https://api.repairdesk.co/api/v1',

  // API Key for authentication (add to query string)
  apiKey: 'tbpzKBH-6yxj-VB8Y-xYp0-jkO3HL8SB',

  // Test Ticket IDs
  validTicketId: '12345', // Replace with a known valid ticket ID
  invalidTicketId: 'invalid_ticket_id',
  nonExistentTicketId: '999999999',

  // Test timeout in milliseconds
  timeout: 10000
};

module.exports = config;
