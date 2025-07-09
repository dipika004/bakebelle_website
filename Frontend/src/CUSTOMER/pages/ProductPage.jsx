import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  // const { id } = useParams();
  const {slug} = useParams(); // Using slug instead of id
  const [product, setProduct] = useState(null);
  const [moreItems, setMoreItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://backend-thejaganbowl.onrender.com/api/products/slug/${slug}`); // Fetching product by slug
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  // useEffect(() => {
  //   const fetchMoreItems = async () => {
  //     try {
  //       const res = await axios.get(`https://backend-thejaganbowl.onrender.com/api/products?category=breads`);
  //       setMoreItems(res.data);
  //     } catch (err) {
  //       console.error('Error fetching more items:', err);
  //     }
  //   };

  //   fetchMoreItems();
  // }, []);

 useEffect(() => {
  const fetchMoreItems = async () => {
    if (!product || !product.category || !product.category.slug) {
      console.warn("🚫 Product or category slug missing");
      return;
    }

    const slug = product.category.slug.toLowerCase(); // Now accessing slug properly
    console.log("📦 Category slug to fetch:", slug);

    try {
      const res = await axios.get(
        `https://backend-thejaganbowl.onrender.com/api/products?category=${encodeURIComponent(categorySlug)}`
      );

      const relatedItems = res.data.filter((item) => item._id !== product._id);
      setMoreItems(relatedItems);
    } catch (err) {
      console.error("❌ Error fetching more items:", err);
    }
  };

  fetchMoreItems();
}, [product]);




  if (!product) return <div className="text-center py-24 text-gray-600 text-lg">Loading...</div>;

  const { title, price, description, images, shoppingLinks = {} } = product;

  const hasAnyShoppingLink =
    shoppingLinks.zepto || shoppingLinks.instamart || shoppingLinks.blinkit;

  return (
    <>
      {/* Product Hero Section */}
      <div className=" bg-gray-100 flex items-center justify-center px-5 py-16">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="flex-1 text-center">
            <img
              src={images[0]}
              alt={title}
              className="w-32 h-auto rounded-lg object-cover shadow-lg md:w-64 lg:w-80 xl:w-96"
              style={{ maxHeight: '400px' }}
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">{title}</h1>
            <h2 className="text-3xl text-green-700 mb-5">₹{price}</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">{description}</p>

            {hasAnyShoppingLink && (
              <div className="mt-6 text-left">
                <h5 className="text-xl mb-2 font-semibold">Shop from:</h5>
                <ul className="list-none space-y-2 pl-0">
                  {shoppingLinks.zepto && (
                    <li>
                      <a
                        href={shoppingLinks.zepto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Zepto
                      </a>
                    </li>
                  )}
                  {shoppingLinks.instamart && (
                    <li>
                      <a
                        href={shoppingLinks.instamart}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Instamart
                      </a>
                    </li>
                  )}
                  {shoppingLinks.blinkit && (
                    <li>
                      <a
                        href={shoppingLinks.blinkit}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Blinkit
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More Items Section */}
      <div className="bg-white py-10 px-5">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">More Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {moreItems
              .filter((item) => item._id !== product._id)
              .map((item) => (
                <div key={item._id}>
                  <Link
                    to={`/product/${item.slug}`}
                    className="block rounded-xl overflow-hidden bg-gray-50 shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 text-left">
                      <h5
                        className="text-lg font-semibold text-gray-900 truncate"
                        style={{ maxHeight: '3rem' }}
                        title={item.title}
                      >
                        {item.title}
                      </h5>
                      <p className="text-green-700 text-base mt-1">₹{item.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
