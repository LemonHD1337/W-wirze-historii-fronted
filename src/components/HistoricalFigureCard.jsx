import BASE_URL from "../services/api/BASE_URL";
import { Link } from "react-router-dom";

const HistoricalFigureCard = ({ element }) => {
  return (
    <div className="w-64 h-80 border border-bor rounded-xl flex flex-col items-center shadow-lg m-5">
      <img
        src={BASE_URL + "/" + element.image}
        alt="zdjecie postaci"
        className="w-5/6 object-contain h-2/3 mt-2"
      />
      <p className="text-2xl font-bold my-2">{element.name}</p>
      <button className="btn">
        <Link to={"/all/historicalFigures/" + element.id}>Zobacz więcej</Link>
      </button>
    </div>
  );
};

export default HistoricalFigureCard;
