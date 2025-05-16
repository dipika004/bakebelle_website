import { useState, useEffect } from "react";
import "../styles/Banner.css";

export default function Banner({ desktopBanners, mobileBanners }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // you can adjust this breakpoint
    };

    handleResize(); // check on load
    window.addEventListener("resize", handleResize); // check on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bannersToShow = isMobile ? mobileBanners : desktopBanners;

  return (
    <div className="banner-container">
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {bannersToShow?.map((imgSrc, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={imgSrc}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
              />
              <div className="banner-button-container">
                <a href="#order" className="banner-button">Order Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
