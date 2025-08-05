import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
  const [largeBanners, setLargeBanners] = useState([]);
  const [smallBanners, setSmallBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('https://bakebelle-website.onrender.com/api/banner');
        const allBanners = response.data || [];

        setLargeBanners(allBanners.filter(b => b.device === 'large'));
        setSmallBanners(allBanners.filter(b => b.device === 'small'));
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full">
      {/* Large banner - visible on sm and up */}
      {largeBanners.length > 0 && (
        <div className="hidden sm:block">
          {largeBanners.length === 1 ? (
            <img
              src={largeBanners[0].image}
              alt="Large Banner"
              className="w-full h-auto object-cover"
            />
          ) : (
            <Slider {...settings}>
              {largeBanners.map((banner, index) => (
                <div key={index}>
                  <img
                    src={banner.image}
                    alt={`Large Banner ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}

      {/* Small banner - visible on mobile only */}
      {smallBanners.length > 0 && (
        <div className="block sm:hidden">
          {smallBanners.length === 1 ? (
            <img
              src={smallBanners[0].image}
              alt="Small Banner"
              className="w-full h-auto object-cover"
            />
          ) : (
            <Slider {...settings}>
              {smallBanners.map((banner, index) => (
                <div key={index}>
                  <img
                    src={banner.image}
                    alt={`Small Banner ${index + 1}`}
                    className="w-full h-auto object-cove"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
