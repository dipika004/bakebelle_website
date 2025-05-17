import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [newBanners, setNewBanners] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/banner')
      .then(response => {
        setBanners(response.data);
        const initialNewBanners = {};
        response.data.forEach(banner => {
          initialNewBanners[banner._id] = { file: null, preview: banner.image };
        });
        setNewBanners(initialNewBanners);
      })
      .catch(error => console.error('Error fetching banners:', error));
  }, []);

  const handleBannerChange = (e, bannerId) => {
    const file = e.target.files[0];
    setNewBanners(prev => ({
      ...prev,
      [bannerId]: { file, preview: URL.createObjectURL(file) }
    }));
  };

  const submitNewBanner = async (id) => {
    const banner = newBanners[id];
    if (!banner || !banner.file) return alert("Please select a new banner image.");

    const formData = new FormData();
    formData.append('banner', banner.file);

    try {
      await axios.put(`http://localhost:8080/api/banner/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Banner updated successfully!');
      const response = await axios.get('http://localhost:8080/api/banner');
      setBanners(response.data);
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Failed to update banner. Please try again.');
    }
  };

  const deleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/banner/${id}`);
      alert('Banner deleted successfully!');
      setBanners(banners.filter(b => b._id !== id));
      const updated = { ...newBanners };
      delete updated[id];
      setNewBanners(updated);
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
              <img
                src={newBanners[banner._id]?.preview || banner.image}
                alt={`Banner ${banner._id}`}
                className="rounded-lg w-full max-h-72 object-cover"
              />
              <div className="mt-4 space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleBannerChange(e, banner._id)}
                  className="w-full file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {newBanners[banner._id]?.preview && (
                  <img
                    src={newBanners[banner._id].preview}
                    alt="Preview"
                    className="w-full max-h-40 object-cover rounded-md border"
                  />
                )}
                <div className="flex gap-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => submitNewBanner(banner._id)}
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
