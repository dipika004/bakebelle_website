import React, { useState } from 'react';
import BannerSlider from '../components/Banner/BannerSlider';
import VideoList from '../components/VideoList/VideoList';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import WhyChooseUs from '../components/WhyChooseUs';

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
      const response = await axios.post('https://backend-thejaganbowl.onrender.com/api/subscribe', { email });
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
      const response = await axios.post('https://backend-thejaganbowl.onrender.com/api/subscribe/verify', {
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
        {/* <WhyChooseUs /> */}
        <VideoList />

<section className="relative min-h-[60vh] flex items-center justify-center px-6 py-16 bg-gradient-to-br from-pink-50 to-yellow-100 overflow-hidden">
  {/* Decorative blurred background shape */}
  <div className="absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 top-[-50px] right-[-50px]"></div>

  <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full text-center animate-fadeIn border border-pink-200">
    <h2 className="text-4xl md:text-5xl font-bold text-pink-700 mb-2">
      🍰 Coming Soon
    </h2>
    <h3 className="text-2xl md:text-3xl font-semibold text-pink-800 mb-4">
      Sweet Treats & Baked Delights!
    </h3>
    <p className="text-gray-700 text-lg mb-6">
      Get ready for handcrafted cupcakes, cookies, and dreamy desserts made with love! 💕
    </p>

    <h5 className="font-medium text-gray-800">Want first taste? Subscribe below!</h5>

    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
      <input
        type="email"
        className="w-full sm:w-2/3 px-4 py-2 border border-pink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl shadow-md transition"
        onClick={handleSubscribe}
      >
        Notify Me
      </button>
    </div>

    {message && (
      <p className={`mt-3 text-sm font-medium ${messageClass}`}>
        {message}
      </p>
    )}
  </div>

  {/* Animations */}
  <style>{`
    @keyframes fadeIn {
      0% {opacity: 0; transform: translateY(30px);}
      100% {opacity: 1; transform: translateY(0);}
    }
    .animate-fadeIn {
      animation: fadeIn 1s ease-out forwards;
    }
  `}</style>
</section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
