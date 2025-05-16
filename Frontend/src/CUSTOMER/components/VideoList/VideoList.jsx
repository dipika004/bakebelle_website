import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/video');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (!videos || videos.length === 0) {
    return null;
  }

  const visibleVideos = showAll ? videos : videos.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto  px-4 py-8">
      <h3 className="text-2xl font-semibold text-center mb-6">Slice Stories</h3>

      <div className="flex flex-wrap justify-center gap-6">
        {visibleVideos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-lg shadow p-4 w-72 flex flex-col"
          >
            <video className="w-full rounded-md mb-4" controls>
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h5 className="text-lg font-medium mb-1">{video.title || 'Untitled Video'}</h5>
            <p className="text-sm text-gray-600">{video.description || 'No description provided.'}</p>
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


