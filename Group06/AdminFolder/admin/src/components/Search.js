import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function FurnitureSearchResults() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('q');
    setQuery(searchQuery);
    fetch(`http://localhost:5000/furnitures?q=${searchQuery}`)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error(error));
  }, [location.search]);

  return (
    <div>
      <h1>Search Results for '{query}'</h1>
      <ul>
        {results.map(result => <li>{result.title}</li>)}
      </ul>
    </div>
  );
}

export default FurnitureSearchResults;
