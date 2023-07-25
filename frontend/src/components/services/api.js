import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace this with your actual backend API URL

// Function to fetch the activity log for a specific table
export const getActivityLog = async (tableId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/activity-log/${tableId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching activity log.');
  }
};

// Function to authenticate user login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, { username, password });
    return response.data.token;
  } catch (error) {
    throw new Error('Invalid credentials. Please check your username and password.');
  }
};

// Function to register a new user
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, { username, email, password });
    return response.data.token;
  } catch (error) {
    throw new Error('Error registering user.');
  }
};

// Function to fetch all tables
export const getAllTables = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tables`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tables.');
  }
};

// Function to fetch details of a specific table
export const getTableDetails = async (tableId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tables/${tableId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching table details.');
  }
};

// Function to create a new table
export const createTable = async (tableName, columns) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/tables`, { tableName, columns });
    return response.data;
  } catch (error) {
    throw new Error('Error creating table.');
  }
};

// Function to update an existing table
export const updateTable = async (tableId, tableName, columns) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/tables/${tableId}`, { tableName, columns });
    return response.data;
  } catch (error) {
    throw new Error('Error updating table.');
  }
};

// Function to delete an existing table
export const deleteTable = async (tableId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/tables/${tableId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting table.');
  }
};

// Add more API functions for other functionalities as needed.

export default {
  getActivityLog,
  loginUser,
  registerUser,
  getAllTables,
  getTableDetails,
  createTable,
  updateTable,
  deleteTable,
  // Add more functions here if needed
};
