import React from 'react';
import axios from 'axios';

const EditProductPage = ({
  formData,
  setFormData,
  newImages,
  setNewImages,
  id,
  setIsEditing,
  setProduct,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formToSend = new FormData();
      formToSend.append('title', formData.title);
      formToSend.append('price', formData.price);
      formToSend.append('description', formData.description);
      formToSend.append('category', formData.category._id);

      Array.from(newImages).forEach((file) => {
        formToSend.append('images', file);
      });

      const res = await axios.put(
        `http://localhost:8080/api/products/${id}`,
        formToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      alert('Product updated successfully!');
      setIsEditing(false);
      setNewImages([]);
      setProduct(res.data);
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-md shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Edit Product</h2>

      <div>
        <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1 font-medium text-gray-700">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-1 font-medium text-gray-700">
          Category:
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="images" className="block mb-1 font-medium text-gray-700">
          Upload New Images:
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageChange}
          multiple
          className="block w-full text-gray-600"
        />
      </div>

      <div>
        <strong className="block mb-2 text-gray-800">Current Images:</strong>
        <div className="flex flex-wrap gap-4">
          {formData.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product ${idx}`}
              className="w-24 h-24 object-cover rounded-md border border-gray-300"
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductPage;
