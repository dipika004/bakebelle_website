import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faBurger, faBacon, faUtensils } from "@fortawesome/free-solid-svg-icons";
import "../styles/WeightGain.css"; 

export default function WeightGain() {
  return (
    <section className="weight">
      <div className="heading">
        <h3>Why Are People Getting Fat?</h3>
      </div>
      <div className="weight-gaining-reason">

        <div className="reason">
          <FontAwesomeIcon icon={faCouch} size="2x" />
          <p>Sedentary Lifestyle</p>
        </div>

        <div className="reason">
          <FontAwesomeIcon icon={faBurger} size="2x" />
          <p>Junk Food Addiction</p>
        </div>

        <div className="reason">
          <FontAwesomeIcon icon={faBacon} size="2x" />
          <p>Lack of Fiber/Protein</p>
        </div>

        <div className="reason">
          <FontAwesomeIcon icon={faUtensils} size="2x" />
          <p>Poor Eating Habits</p>
        </div>

      </div>
    </section>
  );
}
