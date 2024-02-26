import { useEffect } from "react";
import { Link } from "react-router-dom";
import markerImg from "../assets/marker-icon.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ urlMap, source, setLat, setLng, waypoints }) => {
  useEffect(() => {
    var map = L.map("map", {
      crs: L.CRS.Simple,
    });

    map.on("click", (e) => {
      const clickedLatitude = e.latlng.lat;
      const clickedLongitude = e.latlng.lng;
      setLat(clickedLatitude);
      setLng(clickedLongitude);
    });

    var bounds = [
      [0, 0],
      [1000, 1000],
    ];

    L.imageOverlay(urlMap, bounds).addTo(map);
    map.fitBounds(bounds);

    var title = L.tileLayer("", {
      attribution: `<a href="${source}">Źródło</a>`,
    });

    if (waypoints.length !== 0) {
      map.addLayer(title);
      var myIcon = L.icon({
        iconUrl: markerImg,
        iconSize: [32, 32],
      });

      waypoints.forEach((element) => {
        var marker = L.marker([element.latitude, element.longitude], { icon: myIcon });

        const path = "/all/events/" + element.EventId.id;

        marker.bindPopup(`<a href="${path}">${element.title}</a>`);
        marker.addTo(map);
      });
    }

    return () => {
      map.remove();
    };
  }, [urlMap, source, waypoints]);

  return <div id="map"></div>;
};

export default Map;
