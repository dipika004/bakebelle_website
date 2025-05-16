import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const OfferingPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?category=${slug.toLowerCase()}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-3xl font-semibold text-center capitalize mb-8 text-gray-800">
        {slug} Products
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/dipika-2004/product/${product._id}`}
              key={product._id}
              className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-center text-lg font-medium text-gray-900 truncate" title={product.title}>
                  {product.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No products found for this offering.</p>
      )}
    </div>
  );
};

export default OfferingPage;
