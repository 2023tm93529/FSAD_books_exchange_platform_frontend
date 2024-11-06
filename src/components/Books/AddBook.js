import React, { useState } from 'react';
import { addBook } from '../../api';
import './AddBook.css'; 

const AddBook = ({ token, onAddBook, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    const bookData = { title, author, genre, condition };
    try {
      setIsSubmitting(true); // Set submitting state to true
      await onAddBook(bookData); // Notify the parent component
      setTitle('');
      setAuthor('');
      setGenre('');
      setCondition('');
      onClose(); // Close the modal after adding the book
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      <input type="text" placeholder="Condition" value={condition} onChange={(e) => setCondition(e.target.value)} required />
      <button className="submit-button" type="submit" disabled={isSubmitting}>Add Book</button>
    </form>
  );
};

export default AddBook;
