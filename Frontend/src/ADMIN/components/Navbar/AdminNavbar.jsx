import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [offerings, setOfferings] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    axios
      .get('https://backend-thejaganbowl.onrender.com/api/offerings')
      .then((res) => setOfferings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/dipika-2004/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-gray-800">Admin Panel</Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/dipika-2004" className="text-gray-700 hover:text-blue-600 font-medium transition">Dashboard</Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium"
              >
                <span>Offerings</span>
                <svg className={`w-4 h-4 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow py-1 z-50">
                  {offerings.map((offering) => (
                    <li key={offering.id}>
                      <Link
                        to={`/dipika-2004/offerings/${offering.name}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {offering.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/dipika-2004/view-banner" className="text-gray-700 hover:text-blue-600 font-medium transition">View Banner</Link>
            <Link to="/dipika-2004/view-videos" className="text-gray-700 hover:text-blue-600 font-medium transition">View Videos</Link>
            <Link to="/dipika-2004/send-message" className="text-gray-700 hover:text-blue-600 font-medium transition">Send Message</Link>

            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 font-medium transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t">
          <div className="px-4 py-3 space-y-2">
            <Link to="/dipika-2004" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>Dashboard</Link>

            <div>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="w-full flex justify-between items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded"
              >
                Offerings
                <svg className={`w-5 h-5 transform transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDropdownOpen && (
                <ul className="mt-2 pl-4 border-l border-gray-200 space-y-1">
                  {offerings.map((offering) => (
                    <li key={offering.id}>
                      <Link
                        to={`/dipika-2004/offerings/${offering.name}`}
                        className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded"
                        onClick={() => {
                          setMobileDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        {offering.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/dipika-2004/view-banner" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>View Banner</Link>
            <Link to="/dipika-2004/view-videos" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>View Videos</Link>
            <Link to="/dipika-2004/send-message" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>Send Message</Link>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left text-red-600 hover:bg-red-50 px-3 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
