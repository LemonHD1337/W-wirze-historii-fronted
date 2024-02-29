import { useState } from "react";
import { urlAddWaypoint } from "../services/api/endpoints";
import axios from "axios";

const AddWaypoint = ({ eventsList, lat, lng, id }) => {
  const [selectedEventId, setSelectedEventId] = useState();
  const [selectedEventTitle, setSelectedEventTitle] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEventId !== 0) {
      const data = {
        title: selectedEventTitle,
        latitude: lat,
        longitude: lng,
        historicalEventsId: Number(selectedEventId),
        mapId: id,
      };
      setIsLoading(true);
      axios
        .post(urlAddWaypoint, data)
        .then((res) => {
          setMessage("dodano zaznacznik");
        })
        .catch((err) => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full m-2 text-center border-y-2 border-bor p-5">
      {console.log("add waypoint sie wykonuje!")}
      <h1 className="font-bold text-2xl">Dodaj zaznacznik</h1>
      <select
        className="input"
        onChange={(e) => {
          const title = e.target.selectedOptions[0].getAttribute("title");
          setSelectedEventTitle(title);
          setSelectedEventId(e.target.value);
        }}>
        <option value="0">wybierz wpis do zaznacznika</option>
        {eventsList.map((event, index) => {
          return (
            <option value={event.id} title={event.title} key={index}>
              {event.title}
            </option>
          );
        })}
      </select>
      <br />
      <input type="text" placeholder="Latitude" value={lat} className="input my-2" />
      <br />
      <input type="text" placeholder="Longitude" value={lng} className="input my-2" />
      <br />
      <button className="btn">
        {isLoading ? "przetwarzanie..." : "Dodaj zaznacznik"}
      </button>
      <p>{message}</p>
    </form>
  );
};

export default AddWaypoint;
