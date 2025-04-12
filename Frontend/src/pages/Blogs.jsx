import "../styles/Blogs.css";
import Footer from "../components/Footer";
import brownBread from "../assets/brownBread.png";
import nutritionLabel from "../assets/nutritionLabel.png";
import hiddenSugar from "../assets/hiddenSugar.png";
import nogain from "../assets/nogain.png";
import noResults from "../assets/choosingFood.png";
import reelTrend from "../assets/reeltrend.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDumbbell,
  faBan,
  faPizzaSlice,
  faLeaf,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Blogs() {
  const knowledgeContent = [
    {
      icon: faClock,
      title: "Busy Life, Bad Choices",
      text: "Most professionals skip meals or grab the nearest junk.",
    },
    {
      icon: faDumbbell,
      title: "Busy Life, Gym, No Gains",
      text: "Fitness starts in the kitchen — not just the workout floor.",
    },
    {
      icon: faBan,
      title: "Mislabeled 'Healthy'",
      text: "Low-fat? Sugar-free? Often just marketing tricks.",
    },
    {
      icon: faPizzaSlice,
      title: "70% Processed Calories",
      text: "Majority of daily calories come from processed food.",
    },
    {
      icon: faLeaf,
      title: "Low Veggie Intake",
      text: "Only 1 in 10 people eat enough vegetables.",
    },
    {
      icon: faHeart,
      title: "Food Affects Health",
      text: "Mood, energy, and immunity depend on your meals.",
    },
  ];

  const researchBlogs = [
    {
      title: "Why Brown Bread Isn’t Always Healthy",
      link: "/blogs/brown-bread",
      image: brownBread,
    },
    {
      title: "How to Read Nutrition Labels the Right Way",
      link: "/blogs/nutrition-labels",
      image: nutritionLabel,
    },
    {
      title: "Hidden Sugars in Packaged Foods",
      link: "/blogs/hidden-sugars",
      image: hiddenSugar,
    },
    {
      title: "Why You're Not Seeing Results After Hardcore Workouts",
      link: "/blogs/no-results",
      image: nogain,
    },
    {
      title: "The Mind Game: Why We Choose Junk Over Health",
      link: "/blogs/mind-game",
      image: noResults,
    },
    {
      title: "How Reels & Trends Affect Your Cravings",
      link: "/blogs/reels-trends",
      image: reelTrend,
    },
  ];

  return (
    <>
      <div className="blogs-page px-4 px-md-5 py-5 w-100">
        <h2 className="text-center display-5 fw-bold mb-5 text-success">
          What you eat today <br />decides how you feel tomorrow 🍎
        </h2>

        {/* Knowledge Section */}
        <div className="knowledge-section row g-4 mb-5 justify-content-center">
          {knowledgeContent.map((item, index) => (
            <div className="col-6 col-md-4 mb-4" key={index}>
              <div className="card shadow h-100 text-center p-4 border-0 rounded-4 bg-light">
                <FontAwesomeIcon
                  icon={item.icon}
                  size="2x"
                  className="mb-3 text-danger"
                />
                <h5 className="fw-semibold mb-2 text-dark">{item.title}</h5>
                <p className="text-muted small mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Blog Grid Section */}
        <h3 className="fw-bold mb-4 text-center text-success">Explore More Insights</h3>
        <div className="row g-4 research-grid justify-content-center">
          {researchBlogs.map((blog, index) => (
            <div className="col-6 col-md-4 mb-4" key={index}>
              <Link to={blog.link} className="text-decoration-none text-dark h-100 d-block">
                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                  <div className="responsive-image-wrapper">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-dark fw-semibold">
                      {blog.title}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
