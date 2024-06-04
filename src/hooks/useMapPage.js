import { useEffect, useState } from "react";
import axios from "axios";
import {
  URL_E_GET_ALL_BY_ERA,
  URL_MAP_GET_ALL_BY_ERA,
  URL_WAYPOINTS_GET_ALL_BY_MAP,
} from "../services/api/endpoints";
import ages from "../utils/ages";

const useMapPage = (ageIndex, mapId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mapsList, setMapsList] = useState(null);
  const [waypointsList, setWaypointsList] = useState(null);
  const [eventsList, setEventsList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const url = URL_MAP_GET_ALL_BY_ERA + `/${ages[ageIndex]}`;
        const response = await axios.get(url);
        setMapsList(response.data);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();

    (async function () {
      try {
        setIsLoading(true);
        const url = URL_E_GET_ALL_BY_ERA + `/${ages[ageIndex]}`;
        const response = await axios.get(url);
        setEventsList(response.data);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [ageIndex]);

  useEffect(() => {
    (async function () {
      if (!mapId) return 0;
      try {
        setIsLoading(true);
        const url = URL_WAYPOINTS_GET_ALL_BY_MAP + `/${mapId}`;
        const response = await axios.get(url);
        setWaypointsList(response.data);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [mapId]);

  return {
    isLoading,
    mapsList,
    waypointsList,
    eventsList,
    error,
    setWaypointsList,
  };
};

export default useMapPage;
