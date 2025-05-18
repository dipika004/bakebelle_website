import React, { useState } from 'react';
import axios from 'axios';

const PartnerFormPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
  });

  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-thejaganbowl.onrender.com/api/partner', formData);
      setResponseMsg('Partner request submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        partnershipType: '',
        message: '',
      });
    } catch (error) {
      setResponseMsg('Submission failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Partner With Us
        </h1>
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Partnership Type</label>
              <select
                name="partnershipType"
                value={formData.partnershipType}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              >
                <option value="">Select one</option>
                <option>Food Supplier</option>
                <option>Sell at Gym</option>
                <option>Franchise Inquiry</option>
                <option>College Canteen Vendor</option>
                <option>Corporate Collaboration</option>
                <option>Marketing Collaboration</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us briefly about your proposal"
                className="w-full border px-3 py-2 rounded-md"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
            {responseMsg && (
              <p className="text-center text-green-600 mt-4">{responseMsg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnerFormPage;
