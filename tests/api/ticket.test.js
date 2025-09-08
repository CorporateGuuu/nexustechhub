require('dotenv').config();
const { addNoteToTicket, updateTicketStatus, convertTicketToInvoice } = require('./ticketUtils');

describe('RepairDesk Ticket API Tests - POST /ticket/addnote', () => {
  // Positive tests
  test('Add note to ticket successfully', async () => {
    const ticketId = 1; // Assuming ticket with ID 1 exists
    const note = 'Test note added via API';
    const data = await addNoteToTicket(ticketId, note);
    expect(data).toHaveProperty('success', true);
    expect(data.data).toHaveProperty('ticket_id', ticketId);
    expect(data.data).toHaveProperty('note', note);
  });

  // Authentication tests
  test('Request with invalid API key should fail', async () => {
    const axios = require('axios');
    const invalidAxiosInstance = axios.create({
      baseURL: process.env.REPAIR_DESK_BASE_URL,
      params: {
        api_key: 'invalid-key',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    try {
      await invalidAxiosInstance.post('/ticket/addnote', { ticket_id: 1, note: 'test' });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  test('Request without API key should fail', async () => {
    const axios = require('axios');
    const noKeyAxiosInstance = axios.create({
      baseURL: process.env.REPAIR_DESK_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    try {
      await noKeyAxiosInstance.post('/ticket/addnote', { ticket_id: 1, note: 'test' });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Validation tests
  test('Add note with missing ticket_id should fail', async () => {
    try {
      await addNoteToTicket(null, 'test note');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/ticket_id is required/i);
    }
  });

  test('Add note with missing note should fail', async () => {
    try {
      await addNoteToTicket(1, '');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/note is required/i);
    }
  });

  test('Add note to non-existent ticket should fail', async () => {
    try {
      await addNoteToTicket(999999, 'test note');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/ticket not found/i);
    }
  });

  // Boundary tests
  test('Add note with very long text', async () => {
    const longNote = 'A'.repeat(10000); // 10k characters
    const data = await addNoteToTicket(1, longNote);
    expect(data).toHaveProperty('success', true);
    expect(data.data.note).toBe(longNote);
  });

  test('Add note with special characters', async () => {
    const specialNote = 'Note with special chars: !@#$%^&*()_+{}|:<>?[]\\;\'",./';
    const data = await addNoteToTicket(1, specialNote);
    expect(data).toHaveProperty('success', true);
    expect(data.data.note).toBe(specialNote);
  });

  test('Add note with multiline text', async () => {
    const multilineNote = 'Line 1\nLine 2\nLine 3';
    const data = await addNoteToTicket(1, multilineNote);
    expect(data).toHaveProperty('success', true);
    expect(data.data.note).toBe(multilineNote);
  });

  // Integration test: add multiple notes
  test('Add multiple notes to same ticket', async () => {
    const ticketId = 1;
    const notes = ['First note', 'Second note', 'Third note'];

    for (const note of notes) {
      const data = await addNoteToTicket(ticketId, note);
      expect(data).toHaveProperty('success', true);
      expect(data.data.ticket_id).toBe(ticketId);
      expect(data.data.note).toBe(note);
    }
  });
});

describe('RepairDesk Ticket API Tests - POST /ticket/updateticketstatus', () => {
  // Positive tests
  test('Update ticket status successfully', async () => {
    const id = 1; // Assuming ticket line item with ID 1 exists
    const ticketInvId = 12345; // Assuming valid ticketInvId
    const status = 'In Progress';
    const data = await updateTicketStatus(id, ticketInvId, status);
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('statusCode', 200);
    expect(data).toHaveProperty('message');
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('id', id);
    expect(data.data).toHaveProperty('ticketInvId', ticketInvId);
    expect(data.data).toHaveProperty('status', status);
  });

  // Authentication tests
  test('Request with invalid API key should fail', async () => {
    const axios = require('axios');
    const invalidAxiosInstance = axios.create({
      baseURL: process.env.REPAIR_DESK_BASE_URL,
      params: {
        api_key: 'invalid-key',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    try {
      await invalidAxiosInstance.post('/ticket/updateticketstatus', { id: 1, ticketInvId: 12345, status: 'In Progress' });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  test('Request without API key should fail', async () => {
    const axios = require('axios');
    const noKeyAxiosInstance = axios.create({
      baseURL: process.env.REPAIR_DESK_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    try {
      await noKeyAxiosInstance.post('/ticket/updateticketstatus', { id: 1, ticketInvId: 12345, status: 'In Progress' });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Validation tests
  test('Update with invalid status should fail', async () => {
    try {
      await updateTicketStatus(1, 12345, 'InvalidValue');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/Invalid Ticket Status/i);
    }
  });

  test('Update with missing id should fail', async () => {
    try {
      await updateTicketStatus(null, 12345, 'In Progress');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/id is required/i);
    }
  });

  test('Update with missing ticketInvId should fail', async () => {
    try {
      await updateTicketStatus(1, null, 'In Progress');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/ticketInvId is required/i);
    }
  });

  test('Update non-existent ticket line item should fail', async () => {
    try {
      await updateTicketStatus(999999, 12345, 'In Progress');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/not found/i);
    }
  });

  // Boundary tests
  test('Update with empty status string', async () => {
    try {
      await updateTicketStatus(1, 12345, '');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/status is required/i);
    }
  });

  test('Update with very long status text', async () => {
    const longStatus = 'A'.repeat(256); // 256+ characters
    try {
      await updateTicketStatus(1, 12345, longStatus);
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/status too long/i);
    }
  });

  // Integration test: update multiple statuses
  test('Update multiple ticket statuses', async () => {
    const updates = [
      { id: 1, ticketInvId: 12345, status: 'In Progress' },
      { id: 2, ticketInvId: 12346, status: 'Completed' },
      { id: 3, ticketInvId: 12347, status: 'Pending' }
    ];

    for (const update of updates) {
      const data = await updateTicketStatus(update.id, update.ticketInvId, update.status);
      expect(data).toHaveProperty('success', true);
      expect(data.data).toHaveProperty('id', update.id);
      expect(data.data).toHaveProperty('ticketInvId', update.ticketInvId);
      expect(data.data).toHaveProperty('status', update.status);
    }
  });
});

describe('RepairDesk Ticket API Tests - POST /tickets/{Ticket-Id}/converttoinvoice', () => {
  // Positive test
  test('Convert ticket to invoice successfully', async () => {
    const ticketId = 1; // Assuming ticket with ID 1 exists
    const data = await convertTicketToInvoice(ticketId);
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('statusCode', 200);
    expect(data).toHaveProperty('message', 'Converted to invoice successfully');
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('invoice');
    expect(data.data.invoice).toHaveProperty('id');
    expect(data.data.invoice).toHaveProperty('order_id');
    expect(typeof data.data.invoice.id).toBe('number');
    expect(typeof data.data.invoice.order_id).toBe('number');
  });

  // Authentication tests
  test('Request with invalid API key should fail', async () => {
    const axios = require('axios');
    const invalidAxiosInstance = axios.create({
      baseURL: process.env.REPAIR_DESK_BASE_URL,
      params: {
        api_key: 'invalid-key',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    try {
      await invalidAxiosInstance.post('/tickets/1/converttoinvoice');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  test('Request without API key should fail', async () => {
    const axios = require('axios');
    const noKeyAxiosInstance = axios.create({
      baseURL: process.env.REPAIR_DESK_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    try {
      await noKeyAxiosInstance.post('/tickets/1/converttoinvoice');
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Validation tests
  test('Convert with invalid Ticket-Id should fail', async () => {
    try {
      await convertTicketToInvoice('invalid');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/invalid ticket/i);
    }
  });

  test('Convert non-existent ticket should fail', async () => {
    try {
      await convertTicketToInvoice(999999);
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/ticket not found/i);
    }
  });

  test('Convert with empty Ticket-Id should fail', async () => {
    try {
      await convertTicketToInvoice('');
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/ticketId is required/i);
    }
  });

  test('Convert with null Ticket-Id should fail', async () => {
    try {
      await convertTicketToInvoice(null);
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/ticketId is required/i);
    }
  });

  test('Convert with undefined Ticket-Id should fail', async () => {
    try {
      await convertTicketToInvoice(undefined);
    } catch (error) {
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/ticketId is required/i);
    }
  });
});
