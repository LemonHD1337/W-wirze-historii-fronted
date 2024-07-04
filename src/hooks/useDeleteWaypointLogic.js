import { useContext, useState } from "react";
import axios from "axios";
import { URL_WAYPOINTS_DELETE } from "../services/api/endpoints";
import authContext from "../store/authContext";

const useDeleteWaypointLogic = () => {
  const [selectedWaypointId, setSelectedWaypointId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useContext(authContext);

  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedWaypointId !== 0) {
      setIsLoading(true);
      try {
        await axios.delete(URL_WAYPOINTS_DELETE + `/${selectedWaypointId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setStatus("Usunięto wpis!");
      } catch (err) {
        console.log(err);
        setStatus("Błąd");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = e => {
    setSelectedWaypointId(e.target.value);
  };

  return { status, isLoading, handleChange, handleSubmit };
};

export default useDeleteWaypointLogic;
