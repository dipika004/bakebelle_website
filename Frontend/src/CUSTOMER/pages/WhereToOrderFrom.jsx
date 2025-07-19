import React from 'react';
import Footer from '../components/Footer/Footer';

const stores = [
  {
    name: 'Blinkit',
    logo: 'https://res.cloudinary.com/dkqllkcbq/image/upload/v1747587199/whereToOrder/uuqjr4oc7xmezohovmaz.png',
    url: 'https://blinkit.com',
  },
  {
    name: 'Instamart',
    logo: 'https://res.cloudinary.com/dkqllkcbq/image/upload/v1747587198/whereToOrder/aiqosbg1lhdiimdbknyn.webp',
    url: 'https://www.instamart.in',
  },
  {
    name: 'Zepto',
    logo: 'https://res.cloudinary.com/dkqllkcbq/image/upload/v1747587200/whereToOrder/grys6bg6h0ml273p8iwa.png',
    url: 'https://zepto.in',
  },
];

const WhereToOrderFrom = () => {
  return (
   <>
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-rose-600 mb-12 text-center drop-shadow-md">
        Where to Order Your Favorite Treats 🍰
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {stores.map(({ name, logo, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 p-8 flex flex-col items-center justify-center border-2 border-transparent hover:border-rose-200"
          >
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-28 object-contain mb-6 drop-shadow-sm"
            />
            <span className="text-xl font-semibold text-gray-700">{name}</span>
          </a>
        ))}
      </div>

      <p className="mt-16 text-lg text-gray-600 text-center max-w-xl">
        We’ve partnered with trusted delivery platforms to bring our fresh baked
        goodies straight to your door — fast, safe, and delicious!
      </p>
    </div>
    <Footer />
   </>

  );
};

export default WhereToOrderFrom;
