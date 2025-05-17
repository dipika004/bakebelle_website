import React, { useState } from 'react';
import API from '../../api';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');
  const [statusClass, setStatusClass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message && !image) {
      setStatus('Please enter a message or choose an image.');
      setStatusClass('text-red-500');
      return;
    }

    const formData = new FormData();
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await API.post('/api/send-message', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message || 'Message sent successfully!');

      setStatus(response.data.message || 'Message sent successfully!');
      setStatusClass('text-green-600');
      setMessage('');
      setImage(null);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to send message.';
      setStatus(errMsg);
      setStatusClass('text-red-500');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Message to Subscribers</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Optional Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full file:px-4 file:py-2 file:border file:rounded-lg file:text-sm file:bg-gray-100 file:text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-300"
        >
          Send Message
        </button>
      </form>

      {status && (
        <p className={`mt-4 text-sm font-medium ${statusClass}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default SendMessage;
