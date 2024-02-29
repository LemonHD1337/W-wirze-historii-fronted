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
    <form onSubmit={handleSubmit} className="w-full text-center m-2">
      <h1 className="text-2xl font-bold">Usuń zaznacznik</h1>
      <p className="font-lg">Należy wybrać zaznacznik z listy, który chcesz usunąć</p>
      <select
        className="input"
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
      <br />
      <button className="btn mt-2">
        {isLoading ? "usuwanie..." : "Usuń zaznacznik"}
      </button>
      <p>{message}</p>
    </form>
  );
};

export default DeleteWaypoint;
