import React, { useState } from 'react';
import BannerSlider from '../components/Banner/BannerSlider';
import VideoList from '../components/VideoList/VideoList';
import axios from 'axios';
import Footer from '../components/Footer/Footer';

const Home = () => {
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
      const response = await axios.post('http://localhost:8080/api/subscribe', { email });
      console.log('Subscribe response:', response.data); // debug

      // If backend sends success, show success message
      setMessage(response.data.message);
      setMessageClass('text-green-600');

      const verificationCode = window.prompt("Enter the verification code sent to your email:");

      if (verificationCode) {
        await handleVerifyCode(verificationCode);
      } else {
        setMessage('Verification code was not entered.');
        setMessageClass('text-red-600');
      }
    } catch (error) {
      // Here we handle errors, including email already subscribed
      if (error.response?.data?.emailExists) {
        // Show alert if email already exists (backend should send emailExists: true)
        window.alert('This email is already subscribed.');
        setMessage('This email is already subscribed.');
        setMessageClass('text-red-600');
      } else {
        // General error message
        const msg = error.response?.data?.message || 'Failed to subscribe. Please try again.';
        setMessage(msg);
        setMessageClass('text-red-600');
      }
    }
  };

  const handleVerifyCode = async (enteredCode) => {
    try {
      const response = await axios.post('http://localhost:8080/api/subscribe/verify', {
        email,
        code: enteredCode,
      });

      console.log("Verification response:", response.data);

      if (response.status === 200 && response.data.message.toLowerCase().includes('verified')) {
        setMessage(response.data.message);
        setMessageClass('text-green-600');
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
    <>
      <div className="w-full">
        <BannerSlider />
        <VideoList />

        {/* Coming Soon Section Centered with Tailwind */}
        <section className="min-h-[40vh] flex flex-col justify-center items-center px-6 text-center">
          <h2
            className="font-bold text-5xl mb-2 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent animate-fadeIn"
          >
            Coming Soon
          </h2>
          
          <h3 className="text-green-700 font-semibold text-3xl mb-3 animate-fadeIn delay-200">
            Varieties of Healthy Snacks!
          </h3>
          <p className="text-gray-600 text-lg max-w-xl mx-auto animate-fadeIn delay-400">
            Stay tuned for our upcoming launches in guilt-free snacking that you will love!
          </p>

          <h5 className="mt-4 font-semibold">Be the first to know – Subscribe now!</h5>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-4 w-full max-w-xl">
            <input
              type="email"
              className="w-3/4 md:w-1/2 max-w-md shadow-sm border border-green-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-lg transition-colors duration-300"
              onClick={handleSubscribe}
            >
              Notify Me
            </button>
          </div>

          {message && (
            <p className={`mt-4 text-sm font-medium ${messageClass}`}>
              {message}
            </p>
          )}

          {showPopup && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                  <h5 className="text-green-600 font-semibold text-lg">🎉 Thank You!</h5>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={closePopup}
                    aria-label="Close popup"
                  >
                    &#x2715;
                  </button>
                </div>
                <p className="text-center text-gray-700">You're now subscribed and will receive updates from us!</p>
              </div>
            </div>
          )}

          {/* Tailwind custom animations */}
          <style>{`
            @keyframes fadeIn {
              0% {opacity: 0; transform: translateY(20px);}
              100% {opacity: 1; transform: translateY(0);}
            }
            @keyframes slideIn {
              0% {width: 0;}
              100% {width: 80px;}
            }
            .animate-fadeIn {
              animation: fadeIn 1.5s ease forwards;
            }
            .animate-slideIn {
              animation: slideIn 1s ease forwards;
            }
            .animate-fadeIn.delay-200 {
              animation-delay: 0.2s;
            }
            .animate-fadeIn.delay-400 {
              animation-delay: 0.4s;
            }
          `}</style>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
