import axios from "axios";
import { URL_WAYPOINTS_CREATE } from "../services/api/endpoints";
import { useContext, useState } from "react";
import authContext from "../store/authContext";

const useAddWayLogic = (lat, lng, id) => {
  const [selectedEventId, setSelectedEventId] = useState();
  const [selectedEventTitle, setSelectedEventTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { user } = useContext(authContext);

  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedEventId !== 0) {
      setIsLoading(true);
      try {
        await axios.post(
          URL_WAYPOINTS_CREATE,
          {
            title: selectedEventTitle,
            latitude: lat,
            longitude: lng,
            historicalEventsId: Number(selectedEventId),
            mapId: id,
          },
          {
            withCredentials: true,
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          },
        );
        setStatus("Dodano zaznacznik!");
      } catch (err) {
        console.log(err);
        setStatus("Błąd");
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

  return { status, isLoading, handleChange, handleSubmit };
};

export default useAddWayLogic;
