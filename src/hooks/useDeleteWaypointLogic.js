import { useState } from "react";
import axios from "axios";
import { URL_WAYPOINTS_DELETE } from "../services/api/endpoints";

const useDeleteWaypointLogic = () => {
  const [selectedWaypointId, setSelectedWaypointId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedWaypointId !== 0) {
      setIsLoading(true);
      try {
        await axios.delete(URL_WAYPOINTS_DELETE + `/${selectedWaypointId}`);
      } catch (err) {
        console.log(err);
        setError("błąd");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = e => {
    setSelectedWaypointId(e.target.value);
  };

  return { error, isLoading, handleChange, handleSubmit };
};

export default useDeleteWaypointLogic;
