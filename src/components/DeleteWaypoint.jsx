import { useState } from "react";
import axios from "axios";
import { urlDeleteWaypoint } from "../services/api/endpoints";

const DeleteWaypoint = ({ waypoints }) => {
  const [selectedWaypointId, setSelectedWaypointId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedWaypointId !== 0) {
      setIsLoading(true);
      axios
        .delete(urlDeleteWaypoint + selectedWaypointId)
        .then((res) => {
          setMessage("usunięto zaznacznik");
        })
        .catch((err) => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Usuń zaznacznik</h1>
      <p>Należy wybrać zaznacznik z listy, który chcesz usunąć</p>
      <select
        onChange={(e) => {
          setSelectedWaypointId(e.target.value);
        }}>
        <option value="0">Wybierz zaznacznik</option>
        {waypoints.map((waypoint, index) => {
          return (
            <option value={waypoint.id} key={index}>
              {waypoint.title}
            </option>
          );
        })}
      </select>
      <button>{isLoading ? "usuwanie..." : "Usuń zaznacznik"}</button>
      <p>{message}</p>
    </form>
  );
};

export default DeleteWaypoint;
