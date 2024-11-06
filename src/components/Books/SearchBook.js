import React, { useState } from 'react';
import { searchBooks } from '../../api';
import './SearchBooks.css';

const SearchBooks = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      onSearchResults(null); // Reset to full list if the query is empty
      return;
    }

    try {
      // Perform separate requests for title, author, and genre searches
      const [titleResponse, authorResponse, genreResponse] = await Promise.all([
        searchBooks({ title: query }),
        searchBooks({ author: query }),
        searchBooks({ genre: query }),
      ]);

      // Combine the results, removing duplicates if necessary
      const combinedResults = [
        ...new Set([
          ...titleResponse.data,
          ...authorResponse.data,
          ...genreResponse.data,
        ]),
      ];

      onSearchResults(combinedResults); // Pass results back to parent component
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // If the query is empty, trigger a full book list reload
    if (newQuery.trim() === '') {
      onSearchResults(null); // Reset to full list
    }
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Search Books</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by title, author, genre, etc."
          value={query}
          onChange={handleQueryChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBooks;
