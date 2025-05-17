import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../../api.js'; // Ensure this is the correct path to your API file
import logo from '../../../assets/logo.png';

const Navbar = () => {
  const [offerings, setOfferings] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    API
      .get('/api/offerings')
      .then((res) => setOfferings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/dipika-2004/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="w-16 object-contain" />
            <span className="font-semibold text-xl text-gray-800">Admin Panel</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/dipika-2004" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
              >
                <span>Offerings</span>
                <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {offerings.map((offering) => (
                    <li key={offering.id}>
                      <Link
                        to={`/dipika-2004/offerings/${offering.name}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {offering.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/dipika-2004/view-banner" className="text-gray-700 hover:text-blue-600 font-medium">View Banner</Link>
            <Link to="/dipika-2004/view-videos" className="text-gray-700 hover:text-blue-600 font-medium">View Videos</Link>
            <Link to="/dipika-2004/send-message" className="text-gray-700 hover:text-blue-600 font-medium">Send Message</Link>

            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 font-medium">Logout</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {!menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-1 bg-white shadow-md">
          <Link to="/dipika-2004" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Dashboard</Link>

          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Offerings
              <svg className={`w-5 h-5 transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="ml-4 mt-1 space-y-1 border-l border-gray-300">
                {offerings.map((offering) => (
                  <li key={offering.id}>
                    <Link
                      to={`/dipika-2004/offerings/${offering.name}`}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownOpen(false);
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

          <Link to="/dipika-2004/view-banner" className="block px-3 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>View Banner</Link>
          <Link to="/dipika-2004/view-videos" className="block px-3 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>View Videos</Link>
          <Link to="/dipika-2004/send-message" className="block px-3 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Send Message</Link>

          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
