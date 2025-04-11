import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../styles/ComingSoon.css";

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    if (!emailRegex.test(email)) {
      // Optionally, you can alert here or show popup for invalid email
      return;
    }

    try {
      const response = await axios.post('https://thejaganbowl.onrender.com/subscribe', {
        email: email
      });

      if (response.status === 200) {
        setShowPopup(true);

        // Auto close popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
    } catch (error) {
      // Optionally handle errors (e.g., alert, console.log)
      console.error("Subscription failed", error);
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
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <section className="container my-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2 className="fw-bold">Coming Soon: More</h2>
          <h2 className="text-success fw-bold">Varieties of Healthy Snacks!</h2>
          <p className="mt-3 fs-5">
            Stay tuned for our upcoming launches in guilt-free snacking.
          </p>

          <h5 className="mt-4">Enter your Email below if you're interested</h5>

          <div className="d-flex justify-content-center mt-3">
            <input
              type="email"
              className="form-control w-50 me-2"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button className="btn btn-success" onClick={handleSubscribe}>Notify Me</button>
          </div>
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
    </section>
  );
}
