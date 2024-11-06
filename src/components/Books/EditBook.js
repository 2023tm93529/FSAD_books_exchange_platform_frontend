import React, { useState, useEffect } from 'react';
import { editBook } from '../../api'; // Import the editBook function from your API
import './AddBook.css'; 

const EditBook = ({ token, book, onUpdate, onClose }) => {
  const [title, setTitle] = useState(''); // Initialize with empty values
  const [author, setAuthor] = useState(''); 
  const [genre, setGenre] = useState(''); 
  const [condition, setCondition] = useState(''); 
  const [availability, setAvailability] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Update state whenever the book prop changes
  useEffect(() => {
    if (book) {
      setTitle(book.title || ''); 
      setAuthor(book.author || ''); 
      setGenre(book.genre || ''); 
      setCondition(book.condition || ''); 
      setAvailability(book.availability || ''); 
    }
  }, [book]); // Runs when `book` changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || !book) return; // Prevent multiple submissions and check for valid book

    const bookData = { title, author, genre, condition, availability }; 
    try {
      setIsSubmitting(true); 
      await editBook(book._id, bookData, token); // Use book.id
      onUpdate(); 
      onClose(); 
    } catch (error) {
      console.error('Error editing book:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <h2>Edit Book Details</h2> 

      <label>
        <p style={{ fontSize: '12px' }}>Title</p>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </label>

      <label>
        <p style={{ fontSize: '12px' }}>Author</p>
        <input 
          type="text" 
          placeholder="Author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          required 
        />
      </label>

      <label>
        <p style={{ fontSize: '12px' }}>Genre</p>
        <input 
          type="text" 
          placeholder="Genre" 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)} 
          required 
        />
      </label>

      <label>
        <p style={{ fontSize: '12px' }}>Condition</p>
        <input 
          type="text" 
          placeholder="Condition" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          required 
        />
      </label>

      <label>
        <p style={{ fontSize: '12px' }}>Availability</p>
        <input 
          type="text" 
          placeholder="Availability" 
          value={availability} 
          onChange={(e) => setAvailability(e.target.value)} 
          required 
        />
      </label>

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Book'}
      </button>
    </form>
  );
};

export default EditBook;
