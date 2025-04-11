import React, { useState } from "react";
import "../styles/Contact.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faHandshake,
  faCommentDots,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

export default function Contact() {
  const [popup, setPopup] = useState("");

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => {
      setPopup("");
    }, 4000);
  };

  const handleCustomerQuerySubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      await axios.post("http://localhost:5000/cust-query", data);
      showPopup("Your query has been sent successfully!");
      form.reset();
    } catch (error) {
      showPopup("Failed to send query. Try again later.");
    }
  };

  const handleCollabSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      nameOrBrand: form.nameOrBrand.value,
      email: form.email.value,
      typeOfCollaboration: form.collabType.value,
      proposal: form.proposal.value,
    };

    try {
      await axios.post("http://localhost:5000/collab-query", data);
      showPopup("Your collaboration request has been sent!");
      form.reset();
    } catch (error) {
      showPopup("Failed to send request. Try again later.");
    }
  };

  return (
    <>
      {popup && (
        <div className="popup-message">
          <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
          {popup}
        </div>
      )}

      <div className="contact-collab-page container py-5">
        <h2 className="text-center mb-4 text-success fw-bold animate-fadein">Let's Connect</h2>
        <p className="text-center mb-5 text-muted">
          Whether you’re a customer with a question or a business ready to collaborate,
          we’re excited to hear from you!
        </p>

        <div className="row g-5">
          {/* Customer Queries Form */}
          <div className="col-12 col-md-8 mx-auto animate-slidein">
            <div className="card contact-card border-0 p-4 rounded-4">
              <h4 className="mb-3 text-success">
                <FontAwesomeIcon icon={faCommentDots} className="me-2 icon-circle bg-success text-white" />
                Customer Queries
              </h4>
              <form onSubmit={handleCustomerQuerySubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input type="text" name="name" className="form-control" placeholder="Enter your name" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-control" rows="4" placeholder="Type your message..." required />
                </div>
                <button className="btn btn-success w-100" type="submit">Send Query</button>
              </form>
            </div>
          </div>

          {/* Collaboration Form */}
          <div className="col-12 col-md-8 mx-auto animate-slidein">
            <div className="card contact-card border-0 p-4 rounded-4">
              <h4 className="mb-3 text-primary">
                <FontAwesomeIcon icon={faHandshake} className="me-2 icon-circle bg-primary text-white" />
                Collaborate With Us
              </h4>
              <form onSubmit={handleCollabSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name or Brand</label>
                  <input type="text" name="nameOrBrand" className="form-control" placeholder="Enter your name or business" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type of Collaboration</label>
                  <select name="collabType" className="form-select" required>
                    <option>Restaurant / Hotel Partnership</option>
                    <option>Product / Service Collaboration</option>
                    <option>Influencer / Content Creator</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Proposal / Message</label>
                  <textarea name="proposal" className="form-control" rows="4" placeholder="Share your idea or interest..." required />
                </div>
                <button className="btn btn-primary w-100" type="submit">Send Proposal</button>
              </form>
              <p className="small mt-3 text-muted">
                🔒 <strong>Note:</strong> We respect your privacy and only use your details for genuine contact and collaboration purposes. 
                We aim to empower restaurants by introducing healthy alternatives like whole grain breads, baked snacks, and nutritious fillings. 
                As we grow, we’ll offer more options to help you serve your customers better. 🌱
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="row mt-5 animate-fadein">
          <div className="col-12">
            <div className="contact-info text-center">
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-danger" />
                <a href="mailto:dipika.p.sahoo@gmail.com">dipika.p.sahoo@gmail.com</a>
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="me-2 text-success" />
                +91 85910 62769
              </p>
              <div className="social-icons mt-3">
                <a href="#" className="me-3"><i className="fab fa-instagram text-danger fs-4"></i></a>
                <a href="#" className="me-3"><i className="fab fa-linkedin text-primary fs-4"></i></a>
                <a href="#"><i className="fab fa-facebook text-info fs-4"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
