// Function to format a date string to a more user-friendly format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Function to truncate a text string to a specific length with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Function to convert a string to a slug format (e.g., "Hello World" => "hello-world")
export const slugify = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

// Function to check if an object is empty (has no own properties)
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export default {
  formatDate,
  truncateText,
  capitalizeFirstLetter,
  slugify,
  isEmptyObject,
};
