import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';
import "../styles/Footer.css";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const popupRef = useRef(null);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      setMessageClass('text-danger');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/subscribe', {
        email: email
      });

      if (response.status === 200) {
        setMessage('Successfully subscribed! 🎉');
        setMessageClass('text-success');
        setShowToast(true);
        setShowPopup(true);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        setMessageClass('text-danger');
      } else {
        setMessage('An error occurred while subscribing.');
        setMessageClass('text-danger');
      }
    }

    setEmail('');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
        setMessage('');
        setMessageClass('');
        setShowToast(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Auto-dismiss popup and toast after 5 seconds
  useEffect(() => {
    if (showPopup || showToast) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        setShowToast(false);
        setMessage('');
        setMessageClass('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, showToast]);

  return (
    <footer className="footer-container bg-light text-dark py-5">
      <div className="container">
        <div className="row">

          {/* Brand Info */}
          <div className="col-md-4 mb-4">
            <h3 className="fw-bold">The Jagan Bowl</h3>
            <p>Healthy twists on everyday cravings.<br />Small changes, big results.</p>
          </div>

          {/* Navigation */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-semibold">Services</h4>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/offerings">Offerings</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/order">Where to Order</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Socials and Subscribe */}
          <div className="col-md-4">
            <h4 className="fw-semibold">Follow Us</h4>
            <div className="d-flex gap-3 mb-3">
              <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
              <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
              <a href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
            </div>

            <h5 className="fw-medium">Subscribe for Updates</h5>
            <div className="d-flex mt-2">
              <input
                type="email"
                className="form-control w-50 me-2"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
              <button className="btn btn-success" onClick={handleSubscribe}>Subscribe</button>
            </div>

            {message && (
              <p className={`mt-3 ${messageClass}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Popup Notification */}
        {showPopup && (
          <div className="popup-container">
            <div className="popup" ref={popupRef}>
              <div className="popup-header">
                <strong>Thank You for Subscribing!</strong>
                <button className="btn-close" onClick={closePopup}></button>
              </div>
              <div className="popup-body">
                You are now subscribed to receive updates.
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className={`toast-message ${showToast ? 'show' : ''}`}>
            {message}
          </div>
        )}

        <hr className="mt-4" />
        <p className="text-center text-muted mb-0">
          &copy; {new Date().getFullYear()} Jagan Enterprises. All rights reserved.
        </p>
        <p className="text-center text-muted">
          “The Jagan Bowl” is a brand of <strong>Pikabelle Enterprises</strong>.
        </p>
      </div>
    </footer>
  );
}
