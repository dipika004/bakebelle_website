import React, { useState } from 'react';
import axios from 'axios';

const ContactFormPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [responseMsg, setResponseMsg] = useState('');
  const [responseType, setResponseType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-thejaganbowl.onrender.com/api/contact', formData);
      alert('Message sent successfully!');
      setResponseType('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
        setResponseType('error');
      } else {
        alert('Something went wrong. Please try again.');
        setResponseType('error');
      }
      console.error(error);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Contact Us
        </h1>
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>

            {responseMsg && (
              <div
                className={`p-3 rounded-md text-sm text-white ${
                  responseType === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {responseMsg}
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Phone Number (optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              >
                <option value="">Select Subject</option>
                <option>General Inquiry</option>
                <option>Product Feedback</option>
                <option>Support / Help</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full border px-3 py-2 rounded-md"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormPage;
