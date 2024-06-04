import axios from "axios";
import { URL_WAYPOINTS_CREATE } from "../services/api/endpoints";
import { useState } from "react";

const useAddWayLogic = (lat, lng, id) => {
  const [selectedEventId, setSelectedEventId] = useState();
  const [selectedEventTitle, setSelectedEventTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedEventId !== 0) {
      setIsLoading(true);
      try {
        await axios.post(URL_WAYPOINTS_CREATE, {
          title: selectedEventTitle,
          latitude: lat,
          longitude: lng,
          historicalEventsId: Number(selectedEventId),
          mapId: id,
        });
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = e => {
    const title = e.target.selectedOptions[0].getAttribute("title");
    setSelectedEventTitle(title);
    setSelectedEventId(e.target.value);
  };

  return { error, isLoading, handleChange, handleSubmit };
};

export default useAddWayLogic;
