import { baseURL } from "../services/api/endpoints";
import { Link } from "react-router-dom";

const HistoricalFigureCard = ({ element }) => {
  return (
    <div className="historical-figure-card">
      <img src={baseURL + "/" + element.image} alt="" />
      <p>{element.name}</p>
      <button>
        <Link to={"/all/historicalFigures/" + element.id}>Zobacz więcej</Link>
      </button>
    </div>
  );
};

export default HistoricalFigureCard;
