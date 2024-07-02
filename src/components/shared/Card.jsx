import BASE_URL from "../../services/api/BASE_URL";
import { Link } from "react-router-dom";

const Card = ({ data, type }) => {
  let alt = "Zdjęcie postaci";
  let URL = "/all/historicalFigures/" + data.id;

  if (type === "event") {
    alt = "Zdjęcie wydarzenia";
    URL = "/all/events/" + data.id;
  }

  return (
    <div className="w-64 h-80 border border-bor rounded-xl flex flex-col items-center shadow-lg p-2">
      <img
        src={BASE_URL + "/static/" + data.image}
        alt={alt}
        className="w-5/6 object-contain h-2/3 mt-2"
      />
      <p className="text-2xl font-bold my-2">{data.name || data.title}</p>
      <button className="btn">
        <Link to={URL}>Zobacz więcej</Link>
      </button>
    </div>
  );
};

export default Card;
