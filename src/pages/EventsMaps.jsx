import { useState } from "react";

import Map from "../components/Map/Map";
import Loading from "../components/shared/Loading";
import useMapPage from "../hooks/useMapPage";
import Warning from "../components/shared/Warning";
import Error from "../components/shared/Error";
import EraSlider from "../components/Map/EraSlider";
import MapSelect from "../components/Map/MapSelect";
import AddWaypoint from "../components/Map/AddWaypoint";
import DeleteWaypoint from "../components/Map/DeleteWaypoint";

const EventsMaps = () => {
  const [era, setEra] = useState(0);
  const [map, setMap] = useState("");
  const [mapId, setMapId] = useState();
  const [source, setSource] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const {
    isLoading,
    eventsList,
    mapsList,
    waypointsList,
    error,
    setWaypointsList,
  } = useMapPage(era, mapId);

  if (isLoading) return <Loading />;
  if (!mapsList) return <Warning message={"Brak map"} />;
  if (error) return <Error />;

  const onMapSelect = e => {
    setMap(e.target.value);
    mapsList.forEach(element => {
      if (e.target.value === element.imageURL) {
        setMapId(element.id);
        setSource(element.source);
      }
    });
  };

  return (
    <div className="w-full min-h-full flex lap:flex-col overflow-auto p-2 flex-grow">
      <div className="text-center w-2/6 overflow-auto overflow-x-hidden lapL:w-3/4 lap:w-full lap:h-fit">
        <h1>Filtry</h1>
        <EraSlider
          setEra={setEra}
          era={era}
          setWaypoints={setWaypointsList}
          setMapId={setMapId}
          setMap={setMap}
        />
        <MapSelect
          data={mapsList}
          defaultValue={"wybierz mapę"}
          onChange={onMapSelect}
          map={map}
        />
        <AddWaypoint lat={lat} lng={lng} eventsList={eventsList} id={mapId} />
        <DeleteWaypoint waypoints={waypointsList} />
      </div>
      <div className="w-full flex items-center justify-center lap:w-full lap:h-96">
        <Map
          urlMap={map}
          source={source}
          setLat={setLat}
          setLng={setLng}
          waypoints={waypointsList}
        />
      </div>
    </div>
  );
};

export default EventsMaps;
