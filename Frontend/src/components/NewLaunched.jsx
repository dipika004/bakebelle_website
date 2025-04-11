import { Link } from "react-router-dom";
import { breadOptions } from "../pages/HealthyBreads"; // Be careful with circular dependencies
import "../styles/NewLaunched.css";

export default function NewLaunchBreads() {
  const isNewLaunch = (launchDate) => {
    const now = new Date();
    const launch = new Date(launchDate);
    const diffDays = (now - launch) / (1000 * 60 * 60 * 24);
    return diffDays <= 21; // within 3 weeks
  };

  const newlyLaunched = breadOptions.filter((bread) => isNewLaunch(bread.launchDate));

  if (newlyLaunched.length === 0) return null;

  return (
    <section className="container my-5">
      <h2 className="text-center fw-bold mb-4">🌾 Just Launched: Healthy Breads</h2>
      <p className="text-center mb-5">
        Dive into the delicious world of wholesome breads – fresh from our oven!
      </p>

      <div className="row text-center">
        {newlyLaunched.map((bread, index) => (
          <div className="col-6 col-md-4 mb-4" key={index}>
            <Link to={bread.link} className="text-decoration-none text-dark">
              <div className="card shadow-sm h-100">
                <img src={bread.img} className="card-img-top bread-card-img" alt={bread.name} />
                <div className="card-body">
                  <h5 className="card-title">{bread.name}</h5>
                  <p className="card-text">{bread.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
