import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminPanel.css';

const AdminPanel = () => {
  const [offerings, setOfferings] = useState([]);
  const [newOffering, setNewOffering] = useState('');
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    shoppingLinks: { zepto: '', instamart: '', blinkit: '' },
    images: [],
  });

  const [largeBannerFile, setLargeBannerFile] = useState(null);
  const [smallBannerFile, setSmallBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState({ large: null, small: null });
  const [existingBanners, setExistingBanners] = useState({ large: null, small: null });

  const [videoData, setVideoData] = useState({ title: '', description: '', file: null });
  const [videoPreview, setVideoPreview] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchOfferings();
    fetchVideos();
    fetchBanners();
  }, []);

  const fetchOfferings = async () => {
    try {
      const res = await axios.get('https://backend-thejaganbowl.onrender.com/api/offerings');
      setOfferings(res.data);
    } catch (err) {
      console.error('Error fetching offerings:', err);
    }
  };

  const fetchBanners = async () => {
    try {
      const res = await axios.get('https://backend-thejaganbowl.onrender.com/api/banner');
      const banners = res.data || {};
      setExistingBanners({
        large: banners.largeBanner || null,
        small: banners.smallBanner || null,
      });
    } catch (err) {
      console.error('Error fetching banners:', err);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get('https://backend-thejaganbowl.onrender.com/api/video');
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (['zepto', 'instamart', 'blinkit'].includes(name)) {
      setProductData((prev) => ({
        ...prev,
        shoppingLinks: { ...prev.shoppingLinks, [name]: value },
      }));
    } else if (name === 'images') {
      setProductData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in productData) {
      if (key === 'images') {
        productData.images.forEach((img) => formData.append('images', img));
      } else if (key === 'shoppingLinks') {
        formData.append('shoppingLinks', JSON.stringify(productData.shoppingLinks));
      } else {
        formData.append(key, productData[key]);
      }
    }

    try {
      await axios.post('https://backend-thejaganbowl.onrender.com/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added!');
      setProductData({
        title: '',
        price: '',
        description: '',
        category: '',
        shoppingLinks: { zepto: '', instamart: '', blinkit: '' },
        images: [],
      });
    } catch (err) {
      console.error('Error uploading product:', err);
    }
  };

  const addOffering = async () => {
    if (newOffering.trim()) {
      try {
        await axios.post('https://backend-thejaganbowl.onrender.com/api/offerings', { name: newOffering });
        setNewOffering('');
        fetchOfferings();
      } catch (err) {
        console.error('Error adding offering:', err);
      }
    }
  };

  const updateOffering = async (id, name) => {
    const newName = prompt('Enter new name:', name);
    if (newName) {
      try {
        await axios.put(`https://backend-thejaganbowl.onrender.com/api/offerings/${id}`, { name: newName });
        fetchOfferings();
      } catch (err) {
        console.error('Error updating offering:', err);
      }
    }
  };

  const deleteOffering = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offering?')) return;
    try {
      await axios.delete(`https://backend-thejaganbowl.onrender.com/api/offerings/${id}`);
      alert('Offering and related products deleted successfully!');
      fetchOfferings();
    } catch (err) {
      console.error('Error deleting offering:', err);
      alert('Failed to delete offering.');
    }
  };

  const handleBannerUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === 'large') {
      setLargeBannerFile(file);
      setBannerPreview((prev) => ({ ...prev, large: URL.createObjectURL(file) }));
    } else {
      setSmallBannerFile(file);
      setBannerPreview((prev) => ({ ...prev, small: URL.createObjectURL(file) }));
    }
  };

  const submitBanner = async () => {
    if (!largeBannerFile && !smallBannerFile) {
      alert('Please select at least one banner image.');
      return;
    }

    const formData = new FormData();
    if (largeBannerFile) formData.append('largeBanner', largeBannerFile);
    if (smallBannerFile) formData.append('smallBanner', smallBannerFile);

    try {
      await axios.post('https://backend-thejaganbowl.onrender.com/api/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Banner(s) uploaded successfully!');
      if (largeBannerFile) {
        setLargeBannerFile(null);
        setBannerPreview((prev) => ({ ...prev, large: null }));
      }
      if (smallBannerFile) {
        setSmallBannerFile(null);
        setBannerPreview((prev) => ({ ...prev, small: null }));
      }
      fetchBanners();
    } catch (err) {
      console.error('Error uploading banner:', err);
    }
  };

  const handleVideoChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const file = files[0];
      setVideoData((prev) => ({ ...prev, file }));
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setVideoData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitVideo = async (e) => {
    e.preventDefault();
    if (!videoData.file || !videoData.title || !videoData.description) {
      alert('Please fill all fields and select a video.');
      return;
    }

    const formData = new FormData();
    formData.append('videoFile', videoData.file);
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);

    try {
      await axios.post('https://backend-thejaganbowl.onrender.com/api/video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Video uploaded successfully!');
      setVideoData({ title: '', description: '', file: null });
      setVideoPreview(null);
      fetchVideos();
    } catch (err) {
      console.error('Error uploading video:', err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        {/* Banner Upload Section */}
        <section className="section-card">
          <h3>Upload Homepage Banners</h3>

          <label>Large Screen Banner</label>
          <input type="file" accept="image/*" onChange={(e) => handleBannerUpload(e, 'large')} className="file-input" />
         {(bannerPreview.large || existingBanners.large) && (
  <div className="mt-2 text-center hidden lg:block">
    <img
      src={bannerPreview.large || existingBanners.large}
      alt="Large Banner"
      className="mx-auto max-w-full h-auto rounded-xl"
    />
  </div>
)}

          <label>Small Screen Banner</label>
          <input type="file" accept="image/*" onChange={(e) => handleBannerUpload(e, 'small')} className="file-input" />
          {(bannerPreview.small || existingBanners.small) && (
  <div className="mt-2 text-center block lg:hidden">
    <img
      src={bannerPreview.small || existingBanners.small}
      alt="Small Banner"
      className="mx-auto max-w-full h-auto rounded-xl"
    />
  </div>
)}
          <button className="btn btn-primary mt-2" onClick={submitBanner}>Upload Banners</button>
        </section>

        <hr className="divider" />

        {/* Offering Section */}
        <section className="section-card">
          <h3>Add New Offering</h3>
          <div className="d-flex">
            <input
              type="text"
              value={newOffering}
              onChange={(e) => setNewOffering(e.target.value)}
              placeholder="Offering Name"
              className="input-field"
            />
            <button onClick={addOffering} className="btn btn-primary">Add</button>
          </div>
        </section>

        <section className="section-card">
          <h3>Offerings List</h3>
          <ul className="offerings-list">
            {offerings.map((offering) => (
              <li key={offering._id} className="offering-item">
                <span className="offering-name">{offering.name}</span>
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => updateOffering(offering._id, offering.name)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteOffering(offering._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        {/* Product Upload Section */}
        <section className="section-card">
          <h3>Add Product</h3>
          <form onSubmit={submitProduct}>
            <input name="title" value={productData.title} onChange={handleProductChange} placeholder="Title" className="input-field" required />
            <input name="price" type="number" value={productData.price} onChange={handleProductChange} placeholder="Price" className="input-field" required />
            <textarea name="description" value={productData.description} onChange={handleProductChange} placeholder="Description" className="input-field" required />
            <select name="category" value={productData.category} onChange={handleProductChange} className="input-field" required>
              <option value="">Select Category</option>
              {offerings.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}
            </select>
            <input name="zepto" value={productData.shoppingLinks.zepto} onChange={handleProductChange} placeholder="Zepto Link" className="input-field" />
            <input name="instamart" value={productData.shoppingLinks.instamart} onChange={handleProductChange} placeholder="Instamart Link" className="input-field" />
            <input name="blinkit" value={productData.shoppingLinks.blinkit} onChange={handleProductChange} placeholder="Blinkit Link" className="input-field" />
            <input name="images" type="file" multiple accept="image/*" onChange={handleProductChange} className="input-field" />
            <button type="submit" className="btn btn-success">Add Product</button>
          </form>
        </section>

        <hr className="divider" />

        {/* Video Upload Section */}
        <section className="section-card">
          <h3>Upload Video</h3>
          <form onSubmit={submitVideo}>
            <input name="title" value={videoData.title} onChange={handleVideoChange} placeholder="Video Title" className="input-field" required />
            <textarea name="description" value={videoData.description} onChange={handleVideoChange} placeholder="Video Description" className="input-field" required />
            <input name="file" type="file" accept="video/*" onChange={handleVideoChange} className="input-field" required />
            {videoPreview && (
              <div className="video-preview">
                <video width="320" height="180" controls>
                  <source src={videoPreview} type="video/mp4" />
                </video>
              </div>
            )}
            <button type="submit" className="btn btn-primary mt-2">Upload Video</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
