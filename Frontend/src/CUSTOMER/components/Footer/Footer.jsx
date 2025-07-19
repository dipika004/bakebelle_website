import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      setMessageClass('text-red-600');
      return;
    }

    try {
      const response = await axios.post('https://bakebelle-website.onrender.com/api/subscribe', { email });
      setMessage(response.data.message);
      setMessageClass('text-pink-600');

      const code = window.prompt("Enter the verification code sent to your email:");

      if (code) {
        await handleVerifyCode(code);
      } else {
        setMessage('Verification code was not entered.');
        setMessageClass('text-red-600');
      }
    } catch (error) {
      if (error.response?.data?.emailExists) {
        window.alert('This email is already subscribed.');
        setMessage('This email is already subscribed.');
        setMessageClass('text-red-600');
      } else {
        const msg = error.response?.data?.message || 'Failed to subscribe. Please try again.';
        setMessage(msg);
        setMessageClass('text-red-600');
      }
    }
  };

  const handleVerifyCode = async (code) => {
    try {
      const response = await axios.post('https://bakebelle-website.onrender.com/api/subscribe/verify', {
        email,
        code
      });

      if (response.status === 200 && response.data.message.toLowerCase().includes('verified')) {
        setMessage(response.data.message);
        setMessageClass('text-pink-600');
        setShowPopup(true);
        setEmail('');

        setTimeout(() => {
          setShowPopup(false);
          setMessage('');
        }, 5000);
      } else {
        setMessage('Verification failed. Please try again.');
        setMessageClass('text-red-600');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid verification code.';
      setMessage(msg);
      setMessageClass('text-red-600');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setMessage('');
  };

  return (
    <footer className="bg-pink-50 text-gray-800 py-12 mt-10 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-pink-700">BakeBelle</h3>
          <p className="text-sm text-gray-600">
            Sweet cravings with a touch of love.<br />
            Bakes that warm your heart 💕
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3 text-pink-800">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
            <li><Link to="/offerings" className="hover:text-pink-600">Menu</Link></li>
            <li><Link to="/about-us" className="hover:text-pink-600">About Us</Link></li>
            <li><Link to="/where-to-order" className="hover:text-pink-600">Where to Order</Link></li>
            <li><Link to="/contact" className="hover:text-pink-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3 text-pink-800">Follow Us</h4>
          <div className="flex space-x-4 text-gray-600 mb-4">
            <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
            <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
            <a href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
          </div>

          <div>
            <h5 className="font-semibold text-sm mb-2">Subscribe for Yummy Updates</h5>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-pink-300 rounded mb-2 text-sm"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded text-sm transition"
              onClick={handleSubscribe}
            >
              Subscribe 💌
            </button>
          </div>

          {message && <p className={`mt-3 text-sm ${messageClass}`}>{message}</p>}

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <div className="flex justify-between items-center mb-2">
                  <strong>Thank You!</strong>
                  <button className="text-gray-500 hover:text-gray-700" onClick={closePopup}>&times;</button>
                </div>
                <p className="text-sm">You’re now subscribed to the BakeBelle family!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} BakeBelle Enterprises. All rights reserved.</p>
        <p>“BakeBelle” is a brand of <strong>Pikabelle Enterprises</strong>.</p>
      </div>
    </footer>
  );
}
