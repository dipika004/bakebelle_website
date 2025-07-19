import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`https://bakebelle-website.onrender.com/api/video/${id}`)
      .then(response => {
        const { title, description } = response.data;
        setVideoData({ title, description });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch video');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    if (selectedFile) {
      formData.append('videoFile', selectedFile);
    }

    try {
      await axios.put(`https://bakebelle-website.onrender.com/api/video/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Video updated successfully!');
      navigate('/dipika-2004/view-videos');
    } catch {
      setError('Failed to update video');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Video</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Video Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={videoData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Video Description
          </label>
          <textarea
            id="description"
            name="description"
            value={videoData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label htmlFor="videoFile" className="block text-gray-700 font-medium mb-2">
            Choose New Video (optional)
          </label>
          <input
            type="file"
            id="videoFile"
            name="videoFile"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-md"
        >
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
