import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]); // Array of banners
  const [newBanners, setNewBanners] = useState({}); // Object to store file and preview for each banner

  // Fetch all banners from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/banner')
      .then(response => {
        setBanners(response.data); // Set the banners array
        // Initialize newBanners with empty files and previews
        const initialNewBanners = {};
        response.data.forEach(banner => {
          initialNewBanners[banner._id] = { file: null, preview: banner.image };
        });
        setNewBanners(initialNewBanners);
      })
      .catch(error => console.error('Error fetching banners:', error));
  }, []);

  // Handle banner selection (per banner)
  const handleBannerChange = (e, bannerId) => {
    const file = e.target.files[0];
    setNewBanners((prevBanners) => ({
      ...prevBanners,
      [bannerId]: { file, preview: URL.createObjectURL(file) }, // Set preview and file for specific banner
    }));
  };

  // Submit new banner to replace an existing one
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
      // Refetch the banners after updating
      axios.get('http://localhost:8080/api/banner')
        .then(response => {
          setBanners(response.data);
        })
        .catch(error => console.error('Error fetching updated banners:', error));
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Failed to update banner. Please try again.');
    }
  };

  // Delete a specific banner
  const deleteBanner = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/banner/${id}`);
      alert('Banner deleted successfully!');
      // Remove banner from local state after deletion
      setBanners(banners.filter(banner => banner._id !== id));
      const updatedNewBanners = { ...newBanners };
      delete updatedNewBanners[id];
      setNewBanners(updatedNewBanners); // Remove the banner from newBanners state
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Banner Management</h2>

      {/* Display all banners */}
      <div className="mb-4">
        <h4>All Banners</h4>
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner._id} className="banner-item mb-4">
              <img
                src={newBanners[banner._id]?.preview || banner.image} // Use new preview if available
                alt={`Banner ${banner._id}`}
                style={{ maxHeight: '300px', maxWidth: '100%', borderRadius: '8px' }}
              />
              <div className="mt-3">
                {/* Option to upload a new banner image for this specific banner */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleBannerChange(e, banner._id)} // Pass bannerId for individual update
                  className="form-control mb-3"
                />
                {newBanners[banner._id]?.preview && (
                  <div className="mb-2">
                    <img
                      src={newBanners[banner._id].preview}
                      alt="Preview"
                      style={{ maxHeight: '150px', borderRadius: '8px' }}
                    />
                  </div>
                )}
                {/* Update Banner Button */}
                <button className="btn btn-primary" onClick={() => submitNewBanner(banner._id)}>
                  Update Banner
                </button>
                {/* Delete Button */}
                <button className="btn btn-danger ms-2" onClick={() => deleteBanner(banner._id)}>
                  Delete Banner
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No banners uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default BannerManagement;
