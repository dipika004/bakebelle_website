import { Link } from "react-router-dom";
import store_logo from "../assets/store-logo.png";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm custom-navbar">
      <div className="container">
        {/* Brand Logo & Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={store_logo}
            alt="store-logo"
            className="me-2"
            style={{ width: "45px" }}
          />
          <span className="fw-bold brand-name">thejaganbowl</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Offerings
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/offerings/healthy-breads">Healthy Breads</Link></li>
                <li><Link className="dropdown-item" to="/offerings/peanuts">Peanuts</Link></li>
                <li><Link className="dropdown-item" to="/offerings/makhana">Makhana</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">Where to Order</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
