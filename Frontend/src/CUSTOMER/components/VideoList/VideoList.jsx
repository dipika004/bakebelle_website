import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://bakebelle-website.onrender.com/api/video');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (!videos || videos.length === 0) return null;

  const visibleVideos = showAll ? videos : videos.slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold text-center mb-6">Slice Stories</h3>

      {/* Grid: 2 cols on small screens, 3 on md, 4 on lg */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {visibleVideos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-lg shadow-md p-3 w-full max-w-xs flex flex-col"
          >
            <div className="w-full h-40 overflow-hidden rounded-md mb-3">
              <video
                className="w-full h-full object-cover rounded-md"
                controls
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h5 className="text-base font-semibold mb-1 text-center">{video.title || 'Untitled Video'}</h5>
            <p className="text-sm text-gray-600 text-center">{video.description || 'No description provided.'}</p>
          </div>
        ))}
      </div>

      {videos.length > 4 && (
        <div className="text-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default VideoList;
