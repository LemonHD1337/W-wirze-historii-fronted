import { useContext, useState } from "react";
import GuessDateOptions from "../components/Content/GuessDate/GuessDateOptions";
import HistoricalFiguresOptions from "../components/Content/HistoricalFigures/HistoricalFiguresOptions";
import EventsOptions from "../components/Content/Events/EventsOptions";
import MapOptions from "../components/Content/Map/MapOptions";
import authContext from "../store/authContext";

const AddContent = () => {
  const [contentType, setContentType] = useState("guessDate");
  const { user } = useContext(authContext);

  if (!(user.role === "admin" || user.role === "creator")) return null;

  const handleClick = e => {
    const type = e.nativeEvent.srcElement.getAttribute("name");
    if (type === "guessDate") setContentType("guessDate");
    if (type === "historicalFigures") setContentType("historicalFigures");
    if (type === "events") setContentType("events");
    if (type === "map") setContentType("map");
  };

  const showOptions = () => {
    if (contentType === "guessDate") {
      return <GuessDateOptions />;
    }
    if (contentType === "historicalFigures") {
      return <HistoricalFiguresOptions />;
    }
    if (contentType === "events") {
      return <EventsOptions />;
    }
    if (contentType === "map") {
      return <MapOptions />;
    }
  };

  return (
    <div className="w-full h-full flex flex-grow md:flex-col">
      <aside className="w-1/4 text-center border border-bor border-t-0 md:w-full">
        <div
          name="guessDate"
          onClick={handleClick}
          className="p-2 text-lg hover:bg-white-200 border-b border-bor"
        >
          Gra
        </div>
        <div
          name="historicalFigures"
          onClick={handleClick}
          className="p-2 text-lg hover:bg-white-200 border-b border-bor"
        >
          Postacie historyczne
        </div>
        <div
          name="events"
          onClick={handleClick}
          className="p-2 text-lg hover:bg-white-200 border-b border-bor"
        >
          Wydarzenia historyczne
        </div>
        <div
          name="map"
          onClick={handleClick}
          className="p-2 text-lg hover:bg-white-200 border-b border-bor"
        >
          Mapa
        </div>
      </aside>
      <div className="w-3/4 flex flex-col items-center md:w-full">
        {showOptions()}
      </div>
    </div>
  );
};

export default AddContent;
