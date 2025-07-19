import React, { useState } from 'react';
import axios from 'axios';

const PartnerContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    partnershipType: '',
    message: '',
    website: ''
  });

  const [responseMsg, setResponseMsg] = useState('');
  const [responseType, setResponseType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setResponseMsg('');
    setResponseType('');
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isValidUrl = (url) => {
    if (!url) return true; // empty url is allowed
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations

    if (formData.message.trim().length < 10) {
      setResponseMsg('Message must be at least 10 characters long.');
      setResponseType('error');
      return;
    }

    if (!formData.partnershipType) {
      setResponseMsg('Please select a Partnership Type.');
      setResponseType('error');
      return;
    }

    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      setResponseMsg('Phone number must be between 10 and 15 digits, digits only.');
      setResponseType('error');
      return;
    }

    if (!isValidUrl(formData.website)) {
      setResponseMsg('Website must be a valid URL.');
      setResponseType('error');
      return;
    }

    setLoading(true);

    try {
      await axios.post('https://bakebelle-website.onrender.com/api/partner-contact', formData);

      alert('Thank you for reaching out! We will get back to you soon.');
      setResponseType('success');

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        partnershipType: '',
        message: '',
        website: ''
      });
      setResponseMsg('');
    } catch (error) {
      if (error.response?.data?.errors) {
        setResponseMsg(error.response.data.errors.join(' '));
      } else if (error.response?.data?.message) {
        setResponseMsg(error.response.data.message);
      } else {
        setResponseMsg('Something went wrong. Please try again later.');
      }
      setResponseType('error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Partner With Us
        </h1>
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

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
                placeholder="Your full name"
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
              <label className="block text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your company name"
                className="w-full border px-3 py-2 rounded-md"
                required
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
                <option value="" disabled>
                  -- Select partnership type --
                </option>
                <option value="Reseller">Reseller</option>
                <option value="Distributor">Distributor</option>
                <option value="Marketing Partner">Marketing Partner</option>
                <option value="Technology Partner">Technology Partner</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Website (optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your partnership interest"
                className="w-full border px-3 py-2 rounded-md"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnerContactForm;
