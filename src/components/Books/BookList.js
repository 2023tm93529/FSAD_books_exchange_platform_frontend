import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook, addBook, getBookById } from '../../api';
import EditBook from './EditBook';
import SearchBooks from './SearchBook';
import Navbar from './NavBar';
import AddBook from './AddBook';
import './BookList.css';

const BookList = ({ token, userId, setToken }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId, token);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleSearchResults = (results) => {
    if (results == null) {
      fetchBooks();
    } else {
      setBooks(results);
    }
  };

  const handleEditClick = async (bookId) => {
    try {
      const response = await getBookById(bookId, token);
      setSelectedBook(response.data); // Store the book details for editing
      setIsEditModalOpen(true);
      console.log(selectedBook); // This should show the entire book object with its ID
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleUpdate = () => {
    setIsEditModalOpen(false);
    fetchBooks();
  };

  const userBooks = books.filter(book => book.owner._id === userId);

  const handleAddBook = async (bookData) => {
    try {
      await addBook(bookData, token);
      setSuccessMessage('Book added successfully!');
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSuccessMessage(''); // Reset success message when closing the modal
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedBook(null); // Clear the selected book when closing
  };

  return (
    <div className="book-list-container">
      <Navbar onSearchResults={handleSearchResults} setToken={setToken} />
      <div className="books-section">
        <div className="books-collection">
          <h2>Collection</h2>
          <div className="book-cards">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Condition: {book.condition}</p>
                <p>
                  Availability: 
                  <span className={`availability ${book.availability ? 'available' : 'not-available'}`}>
                    {book.availability ? ' Available' : ' Not Available'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        {userBooks.length > 0 && (
          <div className="my-books">
            <div className='my-books-title'>
              <h2 style={{ display: 'inline', marginRight: '10px' }}>My List</h2>
              <button className="add-book-button" onClick={() => setIsModalOpen(true)}>+</button>
            </div>
            <div className="book-cards">
              {userBooks.map((book) => (
                <div key={book._id} className="book-card">
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p>Condition: {book.condition}</p>
                  <button onClick={() => handleEditClick(book._id)}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isEditModalOpen && selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleEditModalClose}>&times;</span>
            <h2>Edit Book</h2>
            <EditBook 
              token={token} 
              book={selectedBook} 
              onUpdate={handleUpdate} 
              onClose={handleEditModalClose} 
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Add New Book</h2>
            <AddBook token={token} onAddBook={handleAddBook} onClose={handleModalClose} />
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
