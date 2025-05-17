import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import SearchBar from "../../components/SearchBar/SearchBar";
import API from '../../../api.js'; // Ensure this is the correct path to your API file

const Navbar = () => {
  const [offerings, setOfferings] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOfferingsOpen, setIsOfferingsOpen] = useState(false);
  const offeringsRef = useRef(null);

  useEffect(() => {
    API.get('/api/offerings')
      .then(response => setOfferings(response.data))
      .catch(error => console.error('Error fetching offerings:', error));

    API.get('/api/products')
      .then(response => setAllProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle click outside to close offerings dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (offeringsRef.current && !offeringsRef.current.contains(event.target)) {
        setIsOfferingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOfferingsOpen(false);
  };

  const toggleOfferings = () => {
    setIsOfferingsOpen(prev => !prev);
  };

  const handleOfferingClick = () => {
    setIsMenuOpen(false);
    setIsOfferingsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <span className="text-xl font-bold text-gray-800">thejaganbowl</span>
        </Link>

        {/* Search Bar (large screens only) */}
        <div className="hidden lg:flex flex-1 justify-center px-4">
          <SearchBar products={allProducts} />
        </div>

        {/* Hamburger for small/medium screens */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-md lg:static lg:shadow-none lg:w-auto lg:flex lg:items-center lg:gap-6 ${
            isMenuOpen ? 'block' : 'hidden'
          } lg:block`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 text-gray-700 font-medium px-4 py-4 lg:p-0">
            <li>
              <Link
                to="/"
                className="block px-3 py-2 hover:text-green-600 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* Offerings Dropdown */}
            <li className="relative" ref={offeringsRef}>
              {/* Desktop */}
              <div className="hidden lg:block">
                <button
                  className="flex items-center px-3 py-2 hover:text-green-600 focus:outline-none"
                  onClick={toggleOfferings}
                >
                  <span>Offerings</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isOfferingsOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOfferingsOpen && (
                  <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md min-w-[180px] z-50">
                    {offerings.map(offering => (
                      <Link
                        key={offering.id}
                        to={`/offerings/${offering.name}`}
                        className="block px-5 py-3 text-sm text-gray-800 hover:bg-gray-100"
                        onClick={handleOfferingClick}
                      >
                        {offering.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div className="lg:hidden">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 hover:text-green-600 focus:outline-none"
                  onClick={toggleOfferings}
                  aria-expanded={isOfferingsOpen}
                >
                  <span>Offerings</span>
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                      isOfferingsOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOfferingsOpen && (
                  <div className="pl-4 border-l border-gray-300 mt-1">
                    {offerings.map(offering => (
                      <Link
                        key={offering.id}
                        to={`/offerings/${offering.name}`}
                        className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded"
                        onClick={handleOfferingClick}
                      >
                        {offering.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>

            <li>
              <Link
                to="/about-us"
                className="block px-3 py-2 hover:text-green-600 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="block px-3 py-2 hover:text-green-600 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block px-3 py-2 hover:text-green-600 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/know-yourself"
                className="block px-3 py-2 hover:text-green-600 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                Know Yourself
              </Link>
            </li>
          </ul>

          {/* Search bar on small screens */}
          <div className="lg:hidden px-4 pb-4">
            <SearchBar products={allProducts} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
