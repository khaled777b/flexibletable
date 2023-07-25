const TOKEN_KEY = 'homework';

// Function to set the user token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Function to retrieve the user token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Function to remove the user token from localStorage (logout)
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return token !== null;
};

export default {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  isAuthenticated,
};
