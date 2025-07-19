import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
  const [offerings, setOfferings] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop dropdown
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // Mobile dropdown
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu
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
    <nav className="bg-pink-50 shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-20 h-15 object-contain" />
        <span className="font-semibold text-xl text-rose-700">Admin Panel</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link to="/dipika-2004" className="text-rose-700 hover:text-pink-600 font-medium transition">Dashboard</Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1 text-rose-700 hover:text-pink-600 font-medium focus:outline-none"
          >
            <span>Offerings</span>
            <svg className={`w-4 h-4 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-rose-200 rounded-md shadow-lg py-1 z-50">
              {offerings.map((offering) => (
                <li key={offering.id}>
                  <Link
                    to={`/dipika-2004/offerings/${offering.name}`}
                    className="block px-4 py-2 text-rose-700 hover:bg-pink-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {offering.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/dipika-2004/view-banner" className="text-rose-700 hover:text-pink-600 font-medium transition">View Banner</Link>
        <Link to="/dipika-2004/view-videos" className="text-rose-700 hover:text-pink-600 font-medium transition">View Videos</Link>
        <Link to="/dipika-2004/send-message" className="text-rose-700 hover:text-pink-600 font-medium transition">Send Message</Link>

        <button
          onClick={handleLogout}
          className="text-rose-700 hover:text-red-500 font-medium transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-rose-700 hover:text-pink-600 hover:bg-pink-100 focus:outline-none"
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
    <div className="lg:hidden border-t border-rose-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link to="/dipika-2004" className="block px-3 py-2 rounded-md text-base font-medium text-rose-700 hover:bg-pink-100" onClick={() => setMenuOpen(false)}>Dashboard</Link>

        <div>
          <button
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-rose-700 hover:bg-pink-100 focus:outline-none"
          >
            Offerings
            <svg className={`w-5 h-5 transform transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileDropdownOpen && (
            <ul className="pl-4 border-l border-rose-200 mt-1 space-y-1">
              {offerings.map((offering) => (
                <li key={offering.id}>
                  <Link
                    to={`/dipika-2004/offerings/${offering.name}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-rose-700 hover:bg-pink-100"
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

        <Link to="/dipika-2004/view-banner" className="block px-3 py-2 rounded-md text-base font-medium text-rose-700 hover:bg-pink-100" onClick={() => setMenuOpen(false)}>View Banner</Link>
        <Link to="/dipika-2004/view-videos" className="block px-3 py-2 rounded-md text-base font-medium text-rose-700 hover:bg-pink-100" onClick={() => setMenuOpen(false)}>View Videos</Link>
        <Link to="/dipika-2004/send-message" className="block px-3 py-2 rounded-md text-base font-medium text-rose-700 hover:bg-pink-100" onClick={() => setMenuOpen(false)}>Send Message</Link>

        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-rose-700 hover:bg-red-100"
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
