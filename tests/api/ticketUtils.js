const axios = require('axios');

const apiKey = process.env.REPAIR_DESK_API_KEY;
const baseUrl = process.env.REPAIR_DESK_BASE_URL;

if (!apiKey || !baseUrl) {
  throw new Error('REPAIR_DESK_API_KEY and REPAIR_DESK_BASE_URL must be set in environment variables');
}

const axiosInstance = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
  },
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

async function addNoteToTicket(ticketId, note) {
  const requestData = { ticket_id: ticketId, note };
  console.log('Request to /ticket/addnote:', JSON.stringify(requestData, null, 2));

  try {
    const response = await axiosInstance.post('/ticket/addnote', requestData);
    console.log('Response from /ticket/addnote:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error in /ticket/addnote:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
}

async function updateTicketStatus(id, ticketInvId, status) {
  const requestData = { id, ticketInvId, status };
  console.log('Request to /ticket/updateticketstatus:', JSON.stringify(requestData, null, 2));

  try {
    const response = await axiosInstance.post('/ticket/updateticketstatus', requestData);
    console.log('Response from /ticket/updateticketstatus:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error in /ticket/updateticketstatus:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
}

async function convertTicketToInvoice(ticketId) {
  if (!ticketId) {
    throw new Error('ticketId is required');
  }
  const url = `/tickets/${ticketId}/converttoinvoice`;
  console.log(`Request to POST ${url} with api_key: ${apiKey}`);

  try {
    const response = await axiosInstance.post(url);
    console.log(`Response from ${url}:`, JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error in ${url}:`, error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
}

module.exports = {
  addNoteToTicket,
  updateTicketStatus,
  convertTicketToInvoice,
};
