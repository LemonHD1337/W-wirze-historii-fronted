import { useState } from "react";
import ages from "../../../utils/ages";
import { URL_MAP_GET_ALL_BY_ERA } from "../../../services/api/endpoints";
import MapAdd from "./MapAdd";
import MapUpdate from "./MapUpdate";
import MapDelete from "./MapDelete";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../shared/Loading";
import Error from "../../shared/Error";

const MapOptions = () => {
  const [selectedMap, setSelectedMap] = useState(0);
  const [era, setEra] = useState(0);
  const { isLoading, error, data } = useFetch(
    URL_MAP_GET_ALL_BY_ERA + `/${era}`,
    era,
  );

  if (isLoading) return <Loading />;
  if (error) return <Error message={"Błąd"} />;

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "ages") setEra(value);
    if (name === "map") setSelectedMap(Number(value));
  };

  return (
    <div className="addContent-div">
      <h1 className="addContent-h1">
        Narzędzia do dodawania, edytowania i usuwania map
      </h1>
      <p className="addContent-p">
        Aby odpalić narzędzie dodawania mapy, należy wybrać epokę odpowiadającej
        mapie
      </p>
      <SelectAge handleChange={handleChange} era={era} />
      <MapAdd era={era} />
      <SelectMap data={data} handleChange={handleChange} era={era} />
      <MapUpdate id={selectedMap} />
      <MapDelete id={selectedMap} />
    </div>
  );
};

const SelectAge = ({ handleChange, era }) => {
  return (
    <select
      className="addContent-select"
      onChange={handleChange}
      name="ages"
      value={era}
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
  );
};

const SelectMap = ({ data, handleChange, era }) => {
  if (!era || era === "0" || !data) return null;
  if (data.length === 0) return null;

  return (
    <>
      <p className="addContent-p">
        Aby odpalić narzędzie edytowania i usuwania, należy wybrać mapę, którą
        chcemy zmodyfikować z poniższej listy
      </p>
      <select className="addContent-select" onChange={handleChange} name="map">
        <option value="0">wybierz mapę</option>
        {data.map((map, index) => {
          return (
            <option value={map.id} key={index}>
              {map.title}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default MapOptions;
