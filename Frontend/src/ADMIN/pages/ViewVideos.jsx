import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/video');
      setVideos(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load videos');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/video/${id}`);
      setVideos(videos.filter(video => video._id !== id));
      alert('Video deleted successfully!');
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Error deleting video');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading videos...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (videos.length === 0) return <div className="text-center py-10 text-gray-500">No videos available.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">All Uploaded Videos</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map(video => (
          <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <video
              controls
              className="w-full h-48 object-cover"
              src={video.videoUrl || video.url}
              type="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
            <div className="p-4 flex-1 flex flex-col">
              <h5 className="text-lg font-semibold text-gray-900 mb-2">
                {video.title || 'Untitled Video'}
              </h5>
              <p className="text-gray-600 flex-grow">{video.description || 'No description available.'}</p>
              <div className="mt-4 flex justify-between">
                <Link
                  to={`/dipika-2004/videos/edit/${video._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewVideos;
