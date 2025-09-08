require('dotenv').config();
const { addNewItem, editItem, listItems } = require('./inventoryUtils');

describe('RepairDesk Inventory API Tests', () => {
  let createdItemId = null;

  // Positive tests
  test('Add new inventory item successfully', async () => {
    const newItem = {
      name: 'Test Item',
      sku: `test-sku-${Date.now()}`,
      quantity: 10,
      price: 99.99,
      description: 'Test item description',
    };
    const data = await addNewItem(newItem);
    expect(data).toHaveProperty('success', true);
    expect(data.data).toMatchObject({
      name: newItem.name,
      sku: newItem.sku,
      quantity: newItem.quantity,
      price: newItem.price,
      description: newItem.description,
    });
    createdItemId = data.data.id;
  });

  test('List inventory items returns array', async () => {
    const data = await listItems();
    expect(data).toHaveProperty('success', true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('Edit inventory item successfully', async () => {
    if (!createdItemId) {
      return;
    }
    const updateData = {
      quantity: 20,
      price: 89.99,
    };
    const data = await editItem(createdItemId, updateData);
    expect(data).toHaveProperty('success', true);
    expect(data.data.quantity).toBe(updateData.quantity);
    expect(data.data.price).toBe(updateData.price);
  });

  // Authentication tests
  test('Request with invalid API key should fail', async () => {
    const originalApiKey = process.env.REPAIR_DESK_API_KEY;
    process.env.REPAIR_DESK_API_KEY = 'invalid-key';
    try {
      await listItems();
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toMatch(/unauthorized|401/i);
    } finally {
      process.env.REPAIR_DESK_API_KEY = originalApiKey;
    }
  });

  test('Request without API key should fail', async () => {
    const originalApiKey = process.env.REPAIR_DESK_API_KEY;
    delete process.env.REPAIR_DESK_API_KEY;
    try {
      await listItems();
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toMatch(/unauthorized|401/i);
    } finally {
      process.env.REPAIR_DESK_API_KEY = originalApiKey;
    }
  });

  // Validation tests
  test('Add new item missing required fields should fail', async () => {
    const invalidItem = {
      sku: 'missing-name',
    };
    try {
      await addNewItem(invalidItem);
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toMatch(/name is required/i);
    }
  });

  test('Edit item with invalid ID should fail', async () => {
    try {
      await editItem('invalid-id', { quantity: 5 });
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toMatch(/not found|invalid/i);
    }
  });

  // Boundary tests
  test('Add new item with boundary quantity values', async () => {
    const newItem = {
      name: 'Boundary Item',
      sku: `boundary-sku-${Date.now()}`,
      quantity: 0,
      price: 0,
      description: 'Boundary test item',
    };
    const data = await addNewItem(newItem);
    expect(data).toHaveProperty('success', true);
    expect(data.data.quantity).toBe(0);
    expect(data.data.price).toBe(0);
  });

  test('Add new item with very large quantity', async () => {
    const newItem = {
      name: 'Large Quantity Item',
      sku: `large-qty-sku-${Date.now()}`,
      quantity: 1000000,
      price: 99999.99,
      description: 'Large quantity test item',
    };
    const data = await addNewItem(newItem);
    expect(data).toHaveProperty('success', true);
    expect(data.data.quantity).toBe(1000000);
  });

  // Integration test: add and list
  test('Add item and verify it appears in list', async () => {
    const newItem = {
      name: 'Integration Test Item',
      sku: `integration-sku-${Date.now()}`,
      quantity: 5,
      price: 49.99,
      description: 'Integration test item',
    };
    const addData = await addNewItem(newItem);
    expect(addData).toHaveProperty('success', true);
    const listData = await listItems({ sku: newItem.sku });
    expect(listData).toHaveProperty('success', true);
    expect(listData.data.some(item => item.sku === newItem.sku)).toBe(true);
  });
});
