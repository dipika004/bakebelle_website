import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../../api.js'; // Ensure this is the correct path to your API file
import EditProductPage from './EditProductPage';

const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}`);
        setProduct(res.data);
        setFormData({
          title: res.data.title,
          price: res.data.price,
          description: res.data.description,
          category: res.data.category,
          images: res.data.images,
        });
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/api/products/${id}`);
        alert('Product deleted successfully!');
        navigate('/dipika-2004'); // ✅ Navigate here after successful deletion
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product.');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!product) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <EditProductPage
          formData={formData}
          setFormData={setFormData}
          newImages={newImages}
          setNewImages={setNewImages}
          id={id}
          setIsEditing={setIsEditing}
          setProduct={setProduct}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full md:w-1/2 max-h-96 object-contain rounded-md border border-gray-200"
          />
          <div className="flex flex-col justify-between md:w-1/2">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">{product.title}</h2>
              <p className="mt-2 text-xl text-green-600 font-semibold">Price: ₹{product.price}</p>
              <p className="mt-4 text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleEdit}
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;
