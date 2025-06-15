import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [newBanners, setNewBanners] = useState({});

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('https://backend-thejaganbowl.onrender.com/api/banner');
      setBanners(response.data);

      const initialNewBanners = {};
      response.data.forEach(banner => {
        initialNewBanners[banner._id] = {
          largeFile: null,
          smallFile: null,
          largePreview: banner.device === 'large' ? banner.image : '',
          smallPreview: banner.device === 'small' ? banner.image : '',
        };
      });
      setNewBanners(initialNewBanners);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleFileChange = (e, bannerId, type) => {
    const file = e.target.files[0];
    setNewBanners(prev => ({
      ...prev,
      [bannerId]: {
        ...prev[bannerId],
        [`${type}File`]: file,
        [`${type}Preview`]: URL.createObjectURL(file),
      },
    }));
  };

  const submitUpdatedBanner = async (id) => {
    const banner = newBanners[id];

    const uploadSingleBanner = async (file, device) => {
      const formData = new FormData();
      if (device === 'large') {
        formData.append('largeBanner', file);
      } else if (device === 'small') {
        formData.append('smallBanner', file);
      }

      return axios.post('https://backend-thejaganbowl.onrender.com/api/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    };

    try {
      if (banner.largeFile) await uploadSingleBanner(banner.largeFile, 'large');
      if (banner.smallFile) await uploadSingleBanner(banner.smallFile, 'small');

      alert('Banner(s) uploaded successfully!');
      fetchBanners();
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Failed to upload banner.');
    }
  };

  const deleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`https://backend-thejaganbowl.onrender.com/api/banner/${id}`);
      alert('Banner deleted successfully!');
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Banner Management</h2>

      {banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div key={banner._id} className="border border-gray-300 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold mb-2 capitalize">{banner.device} Banner</h3>
              <img
                src={banner.image}
                alt={`${banner.device} Banner`}
                className="rounded-lg w-full max-h-72 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, banner._id, banner.device)}
                className="w-full mt-2"
              />

              {newBanners[banner._id]?.[`${banner.device}Preview`] && (
                <>
                  <p className="text-sm mt-2">New Preview:</p>
                  <img
                    src={newBanners[banner._id][`${banner.device}Preview`]}
                    alt="New Preview"
                    className="rounded-lg w-full max-h-72 object-cover"
                  />
                </>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                  onClick={() => submitUpdatedBanner(banner._id)}
                >
                  Update Banner
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                  onClick={() => deleteBanner(banner._id)}
                >
                  Delete Banner
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No banners uploaded yet.</p>
      )}
    </div>
  );
};

export default BannerManagement;
