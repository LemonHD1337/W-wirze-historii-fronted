import {useState} from "react";
import GuessDateOptions from "../components/GuessDateOptions";
import HistoricalFiguresOptions from "../components/HistoricalFiguresOptions";
import EventsOptions from "../components/EventsOptions";
import MapOptions from "../components/MapOptions";

const AddContent = () => {
  const [contentType, setContentType] = useState("guessDate");

  const handleClick = (e) => {
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
    <div className="w-full h-full flex mt-2">
      <aside className="w-1/4 text-center">
        <div
          name="guessDate"
          onClick={handleClick}
          className="p-2 text-lg hover:bg-white-200">
          Gra
        </div>
        <div
          name="historicalFigures"
          onClick={handleClick}
          className="p-2 text-lg hover:bg-white-200">
          Postacie historyczne
        </div>
        <div
          name="events"
          onClick={handleClick}
          className="p-2 text-lg hover:bg-white-200">
          Wydarzenia historyczne
        </div>
        <div name="map" onClick={handleClick} className="p-2 text-lg hover:bg-white-200">
          Mapa
        </div>
      </aside>
      <div className="w-3/4 flex flex-col items-center mt-2">{showOptions()}</div>
    </div>
  );
};

export default AddContent;
