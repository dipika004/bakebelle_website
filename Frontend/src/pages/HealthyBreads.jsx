import React, { useState } from "react";
import wheatBread from "../assets/wheatBreadImg.jpeg";
import multigrainBread from "../assets/multigrainBreadImg.jpeg";
import ragiBread from "../assets/ragiBreadImg.jpeg";
import "../styles/HealthyBreads.css";
import Footer from "../components/Footer";

export const breadOptions = [
  {
    name: "Whole Wheat Bread",
    img: wheatBread,
    desc: "Rich in fiber and nutrients — perfect for a healthy start to your day.",
    launchDate: "2025-04-10",
    links: {
      blinkit: "#",
      instamart: "#",
      zepto: "#",
    },
  },
  {
    name: "Multigrain Bread",
    img: multigrainBread,
    desc: "A wholesome mix of grains to power your mornings with energy and taste.",
    launchDate: "2025-04-10",
    links: {
      blinkit: "#",
      instamart: "#",
      zepto: "#",
    },
  },
  {
    name: "Ragi Bread",
    img: ragiBread,
    desc: "Loaded with calcium, iron, and flavor. A superfood baked just for you.",
    launchDate: "2025-04-10",
    links: {
      blinkit: "#",
      instamart: "#",
      zepto: "#",
    },
  },
];

export default function HealthyBreads() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className="healthy-breads-page py-5" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-3" style={{ color: "#333" }}>
            Our Healthy Bread Selection
          </h2>
          <p className="text-center text-muted mb-5" style={{ fontSize: "15px" }}>
            Handpicked breads to keep your mornings light, healthy, and satisfying.
          </p>

          <div className="row g-4 justify-content-center">
            {breadOptions.map((bread, index) => (
              <div className="col-10 col-sm-6 col-md-4 col-lg-3" key={index}>
                <div className="bread-card p-3 rounded-4 shadow-sm bg-white">
                  <img
                    src={bread.img}
                    alt={bread.name}
                    className="img-fluid rounded-4 mb-3 bread-image"
                  />
                  <h5 className="mb-2" style={{ color: "#222" }}>{bread.name}</h5>
                  <p className="text-secondary small">{bread.desc}</p>
                  <button
                    className="btn btn-outline-success w-100 mt-2"
                    onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                  >
                    Buy Now
                  </button>
                  {activeIndex === index && (
                    <div className="purchase-links mt-3">
                      <a href={bread.links.blinkit} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm w-100 mb-2">Buy from Blinkit</a>
                      <a href={bread.links.instamart} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm w-100 mb-2">Buy from Instamart</a>
                      <a href={bread.links.zepto} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm w-100">Buy from Zepto</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
