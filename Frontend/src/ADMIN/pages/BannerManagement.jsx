import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [newBanners, setNewBanners] = useState({});
  const [uploadData, setUploadData] = useState({ large: null, small: null });

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
          file: null,
          preview: null
        };
      });
      setNewBanners(initialNewBanners);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleFileChange = (e, bannerId) => {
    const file = e.target.files[0];
    setNewBanners(prev => ({
      ...prev,
      [bannerId]: {
        ...prev[bannerId],
        file,
        preview: file ? URL.createObjectURL(file) : null,
      },
    }));
  };

  const submitUpdatedBanner = async (id, device) => {
    const banner = newBanners[id];
    if (!banner.file) {
      alert('No new image selected.');
      return;
    }

    const formData = new FormData();
    formData.append('banner', banner.file);
    formData.append('device', device);
    formData.append('title', '');

    try {
      await axios.put(`https://backend-thejaganbowl.onrender.com/api/banner/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Banner updated successfully!');
      fetchBanners();
    } catch (error) {
      console.error('❌ Error updating banner:', error.response?.data || error.message);
      alert('Failed to update banner.');
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

  const handleNewBannerUpload = async () => {
    if (!uploadData.large || !uploadData.small) {
      alert("Please upload both large and small banners.");
      return;
    }

    const formData = new FormData();
    formData.append("largeBanner", uploadData.large);
    formData.append("smallBanner", uploadData.small);

    try {
      const res = await axios.post("https://backend-thejaganbowl.onrender.com/api/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("New banners uploaded!");
      setUploadData({ large: null, small: null });
      fetchBanners();
    } catch (err) {
      console.error("❌ Error uploading new banners:", err.response?.data || err.message);
      alert("Upload failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Banner Management</h2>

      {/* New Upload Section */}
      <div className="mb-10 border border-dashed border-gray-400 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Upload New Banners</h3>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Large Banner:</label>
            <input type="file" accept="image/*" onChange={(e) => setUploadData(prev => ({ ...prev, large: e.target.files[0] }))} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Small Banner:</label>
            <input type="file" accept="image/*" onChange={(e) => setUploadData(prev => ({ ...prev, small: e.target.files[0] }))} />
          </div>
        </div>
        <button
          onClick={handleNewBannerUpload}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Upload Banners
        </button>
      </div>

      {banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div key={banner._id} className="border border-gray-300 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold mb-2 capitalize">{banner.device} Banner</h3>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, banner._id)}
                className="w-full mb-4"
              />

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm font-medium">Current:</p>
                  <img
                    src={banner.image}
                    alt="Current Banner"
                    className="rounded-lg w-full max-h-72 object-cover"
                  />
                </div>

                {newBanners[banner._id]?.preview && (
                  <div>
                    <p className="text-sm font-medium">New Preview:</p>
                    <img
                      src={newBanners[banner._id].preview}
                      alt="New Preview"
                      className="rounded-lg w-full max-h-72 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                  onClick={() => submitUpdatedBanner(banner._id, banner.device)}
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
