import { useEffect, useState } from "react";

import MapAdd from "./MapAdd";
import MapUpdate from "./MapUpdate";
import MapDelete from "./MapDelete";

import axios from "axios";
import { URL_MAP_GET_ALL_BY_ERA } from "../services/api/endpoints";

const MapOptions = () => {
  const [era, setEra] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const [selectedMap, setSelectedMap] = useState(0);

  const ages = [
    "Prehistoria",
    "Starożytność",
    "Średniowiecze",
    "Nowożytność",
    "Współczesność",
  ];

  useEffect(() => {
    if (era !== 0) {
      setIsLoading(true);
      axios
        .post(URL_MAP_GET_ALL_BY_ERA + `/${era}`)
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
          setMessage(err);
        })
        .finally(setIsLoading(false));
    }
  }, [era]);

  const showMaps = () => {
    if (data) {
      return (
        <select
          className="input my-2"
          onChange={e => {
            setSelectedMap(e.target.value);
          }}
        >
          <option value="0">wybierz mapę</option>
          {data.map((map, index) => {
            return (
              <option value={map.id} key={index}>
                {map.title}
              </option>
            );
          })}
        </select>
      );
    }
  };

  const showOptions = () => {
    if (era !== 0 && !isLoading && !message) {
      if (selectedMap !== 0) {
        return (
          <>
            <MapAdd era={era} />
            <MapUpdate id={selectedMap} />
            <MapDelete id={selectedMap} />
          </>
        );
      } else {
        return <MapAdd era={era} />;
      }
    }
    return null;
  };

  return (
    <>
      <p className="text-lg">
        Aby wyświetlić mapę trzeba najpierw wybrać epokę, która odpowiada mapie
      </p>

      <div>
        <select
          className="input mt-2"
          onChange={e => {
            const value = e.target.value;
            if (value !== 0) {
              setEra(value);
            }
          }}
        >
          <option value="0">Wybierz epokę</option>
          {ages.map((title, index) => {
            return (
              <option value={title} key={index}>
                {title}
              </option>
            );
          })}
        </select>
      </div>

      {showMaps()}
      {showOptions()}
      {message}
    </>
  );
};

export default MapOptions;
