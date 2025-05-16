import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../components/SearchBar/SearchBar.css'; // Adjust the path as needed

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    axios
      .get(`http://localhost:8080/api/products/search?query=${query}`)
      .then(res => {
        setResults(res.data);
        setShowDropdown(true);
      })
      .catch(console.error);
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim()) {
      axios
        .get(`http://localhost:8080/api/products/search?query=${newQuery}`)
        .then(res => {
          setResults(res.data);
          setShowDropdown(true);
        })
        .catch(console.error);
    } else {
      setShowDropdown(false);
      setResults([]);
    }
  };

  return (
    <div className="healthy-search-wrapper" ref={wrapperRef}>
      <div className="healthy-search-bar">
        <input
          type="text"
          placeholder="Search healthy snacks..."
          value={query}
          onChange={handleChange}
          className="healthy-search-input"
        />
        <button className="healthy-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="healthy-search-results">
          {results.map((product) => (
            <li key={product._id} className="healthy-result-item">
              <Link to={`/product/${product._id}`} className="healthy-result-link">
                <img src={product.images[0]} alt={product.title} />
                <span>{product.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
