import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BannerSlider.css';

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/banner');
        console.log(response.data); // Check the response here
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: banners.length > 1, // Only allow infinite scroll if more than 1 banner
    speed: 500,
    autoplay: banners.length > 1, // Autoplay only if more than 1 banner
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="banner-slider">
      {banners.length > 0 && (
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner._id} className="banner">
              <img
                src={banner.image}
                alt={banner.title || 'Banner'}
                className="banner-image"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BannerSlider;
