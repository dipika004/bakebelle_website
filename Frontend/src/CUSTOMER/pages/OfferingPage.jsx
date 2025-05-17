import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import API from '../../api'; // Ensure this is the correct path to your API file

const OfferingPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get(
        `/api/products?category=${slug.toLowerCase()}`
      );
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        {slug} Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-900 text-center">
                  {product.title}
                </h5>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found for this offering.
          </p>
        )}
      </div>
    </div>
  );
};

export default OfferingPage;
