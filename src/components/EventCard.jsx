import { baseURL } from "../services/api/endpoints";
import { Link } from "react-router-dom";

const EventCard = ({ element }) => {
  console.log(element);
  return (
    <div className="historical-figure-card">
      <img src={baseURL + "/" + element.image} alt="" />
      <p>{element.title}</p>
      <button>
        <Link to={"/all/events/" + element.id}>Zobacz więcej</Link>
      </button>
    </div>
  );
};

export default EventCard;
