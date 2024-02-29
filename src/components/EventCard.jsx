import { baseURL } from "../services/api/endpoints";
import { Link } from "react-router-dom";

const EventCard = ({ element }) => {
  return (
    <div className="w-64 h-80 border border-bor rounded-xl flex flex-col items-center shadow-lg m-5">
      <img
        src={baseURL + "/" + element.image}
        alt="zdjecie wydarzenia"
        className="w-5/6 object-contain h-2/3 mt-2"
      />
      <p className="text-xl font-bold my-2 text-center">{element.title}</p>
      <button className="btn">
        <Link to={"/all/events/" + element.id}>Zobacz więcej</Link>
      </button>
    </div>
  );
};

export default EventCard;
