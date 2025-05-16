import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    file:null,
  });
  const [videoPreview, setVideoPreview] = useState(null);

  const navigate = useNavigate();

  const fetchOfferings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/offerings');
      setOfferings(response.data);
    } catch (error) {
      console.error('Error fetching offerings:', error);
    }
  };

  useEffect(() => {
    fetchOfferings();
  }, []);

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (['zepto', 'instamart', 'blinkit'].includes(name)) {
      setProductData((prev) => ({
        ...prev,
        shoppingLinks: {
          ...prev.shoppingLinks,
          [name]: value,
        },
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
      await axios.post('http://localhost:8080/api/products', formData, {
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
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  const addOffering = async () => {
    if (newOffering.trim()) {
      try {
        await axios.post('http://localhost:8080/api/offerings', { name: newOffering });
        setNewOffering('');
        fetchOfferings();
      } catch (error) {
        console.error('Error adding offering:', error);
      }
    }
  };

  const updateOffering = async (id, name) => {
    const newName = prompt('Enter new name:', name);
    if (newName) {
      try {
        await axios.put(`http://localhost:8080/api/offerings/${id}`, { name: newName });
        fetchOfferings();
      } catch (error) {
        console.error('Error updating offering:', error);
      }
    }
  };

  const deleteOffering = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this offering?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/offerings/${id}`);
      alert("Offering and related products deleted successfully!");
      fetchOfferings();
    } catch (error) {
      console.error('Error deleting offering:', error);
      alert("Failed to delete offering. Please try again.");
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    setBanner(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const submitBanner = async () => {
    if (!banner) return alert("Please select a banner image.");

    const formData = new FormData();
    formData.append('banner', banner);

    try {
      await axios.post('http://localhost:8080/api/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Banner uploaded successfully!');
      setBanner(null);
      setBannerPreview(null);
    } catch (error) {
      console.error('Error uploading banner:', error);
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
      alert("Please fill all fields and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append('videoFile', videoData.file);
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);

    try {
      await axios.post('http://localhost:8080/api/video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Video uploaded successfully!');
      fetchVideos();
      setVideoData({ title: '', description: '', file: null });
      setVideoPreview(null);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Try again.');
    }
  };

  const fetchVideos = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/video/${id}`);
    setVideos(response.data);  // Set the videos state to display
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};

  useEffect(() => {
    fetchVideos();
  }, []);


  return (
    <div className="admin-container">
      <div className="admin-content">

        {/* Banner Upload Section */}
        <section className="section-card">
          <h3>Upload Homepage Banner</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="file-input"
          />
          {bannerPreview && (
            <div className="banner-preview">
              <img src={bannerPreview} alt="Banner Preview" />
            </div>
          )}
          <button className="btn btn-primary" onClick={submitBanner}>Upload Banner</button>
        </section>

        <hr className="divider" />

        {/* Add New Offering Section */}
        <section className="section-card">
          <h3>Add New Offering</h3>
          <div className="d-flex gap-2">
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

        <hr className="divider" />

        {/* Offerings List Section */}
        <section className="section-card">
          <h3>Offerings</h3>
          <ul className="offerings-list">
            {offerings.map((offering) => (
              <li key={offering._id} className="offering-item">
                <span className="offering-name">{offering.name}</span>
                <div>
                  <button
                    onClick={() => updateOffering(offering._id, offering.name)}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOffering(offering._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        {/* Add Product Section */}
        <section className="section-card">
          <h3>Add Product</h3>
          <form onSubmit={submitProduct} encType="multipart/form-data">
            <input
              name="title"
              value={productData.title}
              onChange={handleProductChange}
              placeholder="Title"
              className="input-field"
              required
            />
            <input
              name="price"
              type="number"
              value={productData.price}
              onChange={handleProductChange}
              placeholder="Price"
              className="input-field"
              required
            />
            <textarea
              name="description"
              value={productData.description}
              onChange={handleProductChange}
              placeholder="Description"
              className="input-field"
              required
            />
            <select
              name="category"
              value={productData.category}
              onChange={handleProductChange}
              className="input-field"
              required
            >
              <option value="">Select Category</option>
              {offerings.map((offering) => (
                <option key={offering._id} value={offering._id}>
                  {offering.name}
                </option>
              ))}
            </select>
            <input
              name="zepto"
              value={productData.shoppingLinks.zepto}
              onChange={handleProductChange}
              placeholder="Zepto Link"
              className="input-field"
            />
            <input
              name="instamart"
              value={productData.shoppingLinks.instamart}
              onChange={handleProductChange}
              placeholder="Instamart Link"
              className="input-field"
            />
            <input
              name="blinkit"
              value={productData.shoppingLinks.blinkit}
              onChange={handleProductChange}
              placeholder="Blinkit Link"
              className="input-field"
            />
            <input
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleProductChange}
              className="input-field"
            />
            <button type="submit" className="btn btn-success">Add Product</button>
          </form>
        </section>

        <hr className="divider" />

        {/* Add Video Section */}
        <section className="section-card">
          <h3>Upload Video</h3>
          <form onSubmit={submitVideo} encType="multipart/form-data">
            <input
              name="title"
              value={videoData.title}
              onChange={handleVideoChange}
              placeholder="Video Title"
              className="input-field"
              required
            />
            <textarea
              name="description"
              value={videoData.description}
              onChange={handleVideoChange}
              placeholder="Video Description"
              className="input-field"
              required
            />
            <input
              name="file"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="input-field"
              required
            />
            {videoPreview && (
              <div className="video-preview">
                <video width="320" height="180" controls>
                  <source src={videoPreview} type="video/mp4" />
                  Your browser does not support the video tag.
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
