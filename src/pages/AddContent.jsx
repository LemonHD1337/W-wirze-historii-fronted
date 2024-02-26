import { useState } from "react";
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
    <div className="add-content-container">
      <aside>
        <div name="guessDate" onClick={handleClick}>
          Gra
        </div>
        <div name="historicalFigures" onClick={handleClick}>
          Postacie historyczne
        </div>
        <div name="events" onClick={handleClick}>
          Wydarzenia historyczne
        </div>
        <div name="map" onClick={handleClick}>
          Mapa
        </div>
      </aside>
      <div className="content-option">{showOptions()}</div>
    </div>
  );
};

export default AddContent;
