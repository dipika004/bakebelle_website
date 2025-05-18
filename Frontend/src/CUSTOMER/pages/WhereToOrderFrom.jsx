import React from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
        You can order from:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {stores.map(({ name, logo, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 transform hover:scale-105"
          >
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-24 object-contain mb-4"
            />
            <span className="text-lg font-semibold text-gray-700">{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WhereToOrderFrom;
