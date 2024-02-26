import { useState } from "react";
import AddEvent from "./AddEvent";
import DeleteEvent from "./DeleteEvent";

const EventsOptions = () => {
  const [era, setEra] = useState("Prehistoria");

  return (
    <>
      <select onChange={(e) => setEra(e.target.value)}>
        <option value="Prehistoria">Prehistoria</option>
        <option value="Starożytność">Starożytność</option>
        <option value="Średniowiecze">Średniowiecze</option>
        <option value="Nowożytność">Nowożytność</option>
        <option value="Współczesność">Współczesność</option>
      </select>
      <AddEvent era={era} />
      <DeleteEvent era={era} />
    </>
  );
};

export default EventsOptions;
