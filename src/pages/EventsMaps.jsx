import { useState, useEffect, useContext } from "react";
import authContext from "../store/authContext";

import { urlGetMap, urlGetEventsByEra, urlGetWaypoints } from "../services/api/endpoints";
import axios from "axios";

import Map from "../components/Map";
import MapFilters from "../components/MapFilters";
import Loading from "../components/Loading";
import AddWaypoint from "../components/AddWaypoint";
import DeleteWaypoint from "../components/DeleteWaypoint";

const EventsMaps = () => {
  const [era, setEra] = useState(0);
  const [map, setMap] = useState("");
  const [mapId, setMapId] = useState();
  const [source, setSource] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  //context
  const { user } = useContext(authContext);

  //fetch
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [error, setError] = useState();

  const ages = [
    "Prehistoria",
    "Starożytność",
    "Średniowiecze",
    "Nowożytność",
    "Współczesność",
  ];

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(urlGetMap, { era: ages[era] })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("błąd");
      })
      .finally(setIsLoading(false));

    setIsLoading(true);
    axios
      .post(urlGetEventsByEra, { era: ages[era] })
      .then((res) => {
        setEventsList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("błąd");
      })
      .finally(setIsLoading(false));

    if (mapId) {
      setIsLoading(true);
      axios
        .get(urlGetWaypoints + mapId)
        .then((res) => {
          setWaypoints(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError("błąd");
        })
        .finally(setIsLoading(false));
    }
  }, [era, mapId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Loading />;
  }

  const showMap = () => {
    if (map.length === 0 || map === "Wybierz mape") {
      return <Loading />;
    }
    return (
      <Map
        urlMap={map}
        source={source}
        setLat={setLat}
        setLng={setLng}
        waypoints={waypoints}
      />
    );
  };

  const showAddWaypoint = () => {
    if (user.role === "admin" || user.role === "creator") {
      if (eventsList.length !== 0 && mapId) {
        return <AddWaypoint lat={lat} lng={lng} eventsList={eventsList} id={mapId} />;
      }
    }
  };

  const showDeleteWaypoints = () => {
    if (user.role === "admin" || user.role === "creator") {
      if (waypoints.length !== 0) {
        return <DeleteWaypoint waypoints={waypoints} />;
      }
    }
  };

  return (
    <div className="w-full h-full flex mt-2 md:flex-col">
      <div className="w-1/4 h-full md:w-full ">
        <MapFilters
          setEra={setEra}
          era={era}
          ages={ages}
          setMap={setMap}
          data={data}
          setSource={setSource}
          setData={setData}
          setMapId={setMapId}
        />
        {showAddWaypoint()}
        {showDeleteWaypoints()}
        <p>{error}</p>
      </div>
      <div className="w-3/4 flex items-center justify-center md:w-full md:h-96">
        {showMap()}
      </div>
    </div>
  );
};

export default EventsMaps;
