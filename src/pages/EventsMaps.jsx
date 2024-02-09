import mapa from "../assets/mapa1000.jpg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const EventsMaps = () => {
  const [currentMap, setCurrentMap] = useState(mapa);

  var map;

  useEffect(() => {
    map = L.map("map", {
      crs: L.CRS.Simple,
    });

    var bounds = [
      [0, 0],
      [1000, 1000],
    ];

    L.imageOverlay(currentMap, bounds).addTo(map);
    map.fitBounds(bounds);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="container">
      <div id="map"></div>
    </div>
  );
};

export default EventsMaps;
