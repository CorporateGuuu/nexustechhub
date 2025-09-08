const axios = require('axios');

const apiKey = process.env.REPAIR_DESK_API_KEY;
const baseUrl = process.env.REPAIR_DESK_BASE_URL;

if (!apiKey || !baseUrl) {
  throw new Error('REPAIR_DESK_API_KEY and REPAIR_DESK_BASE_URL must be set in environment variables');
}

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'x-api-key': apiKey,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

async function addNewItem(itemData) {
  try {
    const response = await axiosInstance.post('/inventory/items', itemData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

async function editItem(itemId, updateData) {
  try {
    const response = await axiosInstance.put(`/inventory/items/${itemId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

async function listItems(queryParams = {}) {
  try {
    const response = await axiosInstance.get('/inventory/items', { params: queryParams });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

module.exports = {
  addNewItem,
  editItem,
  listItems,
};
