import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blogs from "./pages/Blogs";
import Ordering from "./components/Ordering";
import Contact from "./pages/Contact";
import HealthyBreads from "./pages/HealthyBreads";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <TransitionGroup>
        <CSSTransition
          key={window.location.pathname}
          timeout={300}  // Controls the transition duration
          classNames="fade"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/order" element={<Ordering />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offerings/healthy-breads" element={<HealthyBreads />} />
            {/* Add other routes later when those pages are created */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  );
}
