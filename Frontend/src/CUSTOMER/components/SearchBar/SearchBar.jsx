import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  const fetchResults = (searchQuery) => {
    axios
      .get(`https://backend-thejaganbowl.onrender.com/api/products/search?query=${searchQuery}`)
      .then((res) => {
        setResults(res.data);
        setShowDropdown(true);
      })
      .catch((err) => {
        console.error(err);
        setShowDropdown(false);
      });
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (newQuery.trim()) {
      debounceRef.current = setTimeout(() => fetchResults(newQuery), 300);
    } else {
      setShowDropdown(false);
      setResults([]);
    }
  };

  const handleSearch = () => {
    if (query.trim()) fetchResults(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="relative w-full max-w-xs" ref={wrapperRef}>
      <div className="flex bg-yellow-50 border-2 border-yellow-300 rounded-full px-4 py-2 shadow-md transition-all duration-300 ease-in-out">
        <input
          type="text"
          placeholder="Search pastries, loaves, cakes..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent outline-none text-gray-800 text-base rounded-full px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-600 text-white rounded-full px-5 py-2 font-bold text-base hover:bg-yellow-700 transition-colors duration-300"
        >
          Search
        </button>
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg p-3 max-h-72 overflow-y-auto z-10 animate-fadeIn">
          {results.map((product) => (
            <li key={product._id} className="mb-2 last:mb-0">
              <Link
                to={`/product/${product._id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-100 text-gray-700"
              >
                <img
                  src={product.images?.[0] || '/placeholder.png'}
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span className="truncate">{product.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
