import video from "../assets/video.mp4";
import "../styles/AboutUs.css";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
      <div className="about-container py-5">
        <h2 className="text-center display-5 fw-bold mb-5">About Us</h2>

        {/* Vision */}
        <div className="about-box shadow-sm p-4 mb-4 bg-white rounded">
          <h4 className="fw-semibold">Our Vision</h4>
          <p>
            To become India’s most trusted name for accessible, affordable, and truly healthy food
            options — one bowl, one bite at a time.
          </p>
        </div>

        {/* Mission */}
        <div className="about-box shadow-sm p-4 mb-4 bg-white rounded">
          <h4 className="fw-semibold">Our Mission</h4>
          <p>
            To simplify healthy eating for every lifestyle — with honest ingredients, simple recipes,
            and no compromises.
          </p>
        </div>

        {/* Values */}
        <div className="about-box shadow-sm p-4 mb-4 bg-white rounded">
          <h4 className="fw-semibold">Our Values</h4>
          <ul className="list-unstyled">
            <li>✔️ Transparency</li>
            <li>✔️ Natural Ingredients</li>
            <li>✔️ Innovation in Wellness</li>
            <li>✔️ Empowering Educated Choices</li>
          </ul>
        </div>

        {/* Founder Note */}
        <div className="about-box shadow-sm p-4 mb-4 bg-white rounded">
          <h4 className="fw-semibold mb-3">A Note from Dipika – Founder of The Jagan Bowl</h4>
          <div className="row g-4 align-items-start">
            <div className="col-md-6">
              <video src={video} controls className="w-100 rounded" />
            </div>
            <div className="col-md-6">
              <p>
                Hi, I’m <strong>Dipika Sahoo</strong> — an engineer with a passion for health and mindful living.
                <br /><br />
                While traveling, I saw how people often struggle to find truly healthy food. Busy professionals
                settle for convenience, and gym-goers consume “healthy-labeled” foods that aren’t actually
                nutritious.
                <br /><br />
                That’s when the idea struck — to create real, wholesome food that’s accessible and convenient
                for everyone.
                <br /><br />
                That’s how <strong>The Jagan Bowl</strong> was born. A brand rooted in the belief that small, consistent
                choices can lead to a healthier, happier life.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="about-box shadow-sm p-4 mb-4 bg-white rounded">
          <h4 className="fw-semibold mb-3">Why Choose Us?</h4>
          <div className="row g-3">
            <div className="col-md-6 col-lg-3">
              <div className="choose-card p-3 text-center shadow-sm rounded h-100">
                🌿 <strong>No hidden sugars or preservatives</strong>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="choose-card p-3 text-center shadow-sm rounded h-100">
                🌾 <strong>Only real, whole ingredients</strong>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="choose-card p-3 text-center shadow-sm rounded h-100">
                💡 <strong>Built on real needs, not viral diets</strong>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="choose-card p-3 text-center shadow-sm rounded h-100">
                🧠 <strong>Born from observation, shaped by intention</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer full-width outside container */}
      <Footer />
    </>
  );
}
