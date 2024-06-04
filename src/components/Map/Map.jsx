import { useEffect } from "react";
import markerImg from "../../assets/marker-icon.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ waypoints, urlMap, source, setLng, setLat }) => {
  useEffect(() => {
    let map = L.map("map", {
      crs: L.CRS.Simple,
    });

    map.on("click", e => {
      const clickedLatitude = e.latlng.lat;
      const clickedLongitude = e.latlng.lng;
      setLat(clickedLatitude);
      setLng(clickedLongitude);
    });

    let bounds = [
      [0, 0],
      [1000, 1000],
    ];

    if (!urlMap) urlMap = "";
    L.imageOverlay(urlMap, bounds).addTo(map);
    map.fitBounds(bounds);

    let title = L.tileLayer("", {
      attribution: `<a href="${source}">Źródło</a>`,
    });

    map.addLayer(title);

    if (waypoints) {
      let myIcon = L.icon({
        iconUrl: markerImg,
        iconSize: [32, 32],
      });

      waypoints.forEach(element => {
        let marker = L.marker([element.latitude, element.longitude], {
          icon: myIcon,
        });

        const path = "/all/events/" + element.EventId.id;

        marker.bindPopup(`<a href="${path}">${element.title}</a>`);
        marker.addTo(map);
      });
    }

    return () => {
      map.remove();
    };
  }, [urlMap, source, waypoints, setLat, setLng]);

  return <div id="map"></div>;
};

export default Map;
