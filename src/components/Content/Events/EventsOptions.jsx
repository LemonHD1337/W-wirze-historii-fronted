import { useState } from "react";
import AddEvent from "./AddEvent";
import DeleteEvent from "./DeleteEvent";
import useFetch from "../../../hooks/useFetch";
import { URL_E_GET_ALL_BY_ERA } from "../../../services/api/endpoints";

const Select = ({ handleChange, data, era }) => {
  if (!data || !era) return null;
  if (data.length === 0) return null;

  return (
    <>
      <p className="addContent-p">
        Aby odpalić narzędzie usuwania, należy wybrać wpis, który chcemy usunąć
        z poniższej listy
      </p>
      <select
        onChange={handleChange}
        className="addContent-select"
        name="select"
      >
        <option value={0}>Wybierz wpis</option>
        {data.map(element => {
          return (
            <option value={element.id} key={element.id}>
              {element.title}
            </option>
          );
        })}
      </select>
    </>
  );
};

const EventsOptions = () => {
  const [era, setEra] = useState(0);
  const { data } = useFetch(URL_E_GET_ALL_BY_ERA + `/${era}`);
  const [eventId, setEventId] = useState(0);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "select") setEventId(Number(value));
    if (e.target.name === "age") {
      if (e.target.value === "0") {
        setEra(Number(e.target.value));
      } else {
        setEra(e.target.value);
      }
    }
  };

  return (
    <div className="addContent-div">
      <h1 className="addContent-h1">Narzędzia</h1>
      <p className="addContent-p">
        Aby odpalić narzędzie dodawania wpisu, należy wybrać epokę
        odpowiadającej wydarzeniu
      </p>
      <select onChange={handleChange} className="input m-5 w-2/5" name="age">
        <option value="0">Wybierz epokę</option>
        <option value="Prehistoria">Prehistoria</option>
        <option value="Starożytność">Starożytność</option>
        <option value="Średniowiecze">Średniowiecze</option>
        <option value="Nowożytność">Nowożytność</option>
        <option value="Współczesność">Współczesność</option>
      </select>
      <AddEvent era={era} />
      <Select data={data} handleChange={handleChange} era={era} />
      <DeleteEvent eventId={eventId} />
    </div>
  );
};

export default EventsOptions;
