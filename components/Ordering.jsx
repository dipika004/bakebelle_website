import { Link } from "react-router-dom";
import blinkit from "../assets/blinkit.png";
import instamart from "../assets/instamart.jpeg";
import "../styles/Ordering.css"
import zepto from "../assets/zepto.png";
import ComingSoon from "./ComingSoon";
import Footer from "./Footer";

export default function Ordering() {
  return (
    <>
      <div className="ordering-page py-5 px-3 px-md-5">
        <h2 className="text-center fw-bold mb-4 text-success display-6">
          Order Your Favorite <br />
          <span className="text-warning">Healthy Delights</span> From 🛵
        </h2>

        <div className="delivery-options row g-4 justify-content-center text-center">
          <div className="col-6 col-sm-4 col-md-3">
            <Link to="/" className="text-decoration-none">
              <div className="delivery-card shadow-lg p-3 rounded-4 bg-white h-100">
                <img src={blinkit} alt="Blinkit" className="img-fluid rounded" />
                <p className="mt-2 fw-semibold text-dark">Blinkit</p>
              </div>
            </Link>
          </div>

          <div className="col-6 col-sm-4 col-md-3">
            <Link to="/" className="text-decoration-none">
              <div className="delivery-card shadow-lg p-3 rounded-4 bg-white h-100">
                <img src={instamart} alt="Instamart" className="img-fluid rounded" />
                <p className="mt-2 fw-semibold text-dark">Instamart</p>
              </div>
            </Link>
          </div>

          <div className="col-6 col-sm-4 col-md-3">
            <Link to="/" className="text-decoration-none">
              <div className="delivery-card shadow-lg p-3 rounded-4 bg-white h-100">
                <img src={zepto} alt="Zepto" className="img-fluid rounded" />
                <p className="mt-2 fw-semibold text-dark">Zepto</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <ComingSoon />
      <Footer />
    </>
  );
}
