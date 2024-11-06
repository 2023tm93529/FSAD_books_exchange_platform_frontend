import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this as necessary

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      email,
      newPassword,
      confirmPassword: newPassword,  // You already have a confirmation check in the form
    });

    // Ensure you inspect the response to see if it's successful
    console.log(response.data); // Debugging step

    // Return the data if the response is successful
    return response.data;
  } catch (error) {
    console.error('Password reset failed:', error.response ? error.response.data : error.message);
    // Throw the error message so it can be handled by the calling component
    throw new Error(error.response ? error.response.data.msg : 'Failed to reset password');
  }
};
export const addBook = (data, token) => axios.post(`${API_URL}/books/add`, data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const getBooks = () => axios.get(`${API_URL}/books`);
export const searchBooks = async (params) => {
  try {
    // Construct the query string with multiple parameters
    const response = await axios.get(`${API_URL}/books/search`, {
      params, // Passes title, author, genre as query parameters
    });
    return response;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
export const getBookById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` } // Include token for authorization
    });
    return response; // Return the response containing the book details
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error; // Rethrow the error to handle it later
  }
};
export const editBook = (id, data, token) => axios.put(`${API_URL}/books/edit/${id}`, data, {
  headers: { Authorization: `Bearer ${token}` }
});
export const deleteBook = (id, token) => axios.delete(`${API_URL}/books/delete/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});
