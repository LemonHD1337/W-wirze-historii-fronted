import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { URL_GUESSDATE_GET_ALL } from "../../../services/api/endpoints";
import GuessDateAdd from "./GuessDateAdd";
import GuessDateUpdate from "./GuessDateUpdate";
import Loading from "../../shared/Loading";
import Warning from "../../shared/Warning";
import Error from "../../shared/Error";

const GuessDateOptions = () => {
  const { isLoading, error, data } = useFetch(URL_GUESSDATE_GET_ALL);
  const [selectedId, setSelectedId] = useState(0);

  const handleChange = e => {
    setSelectedId(Number(e.target.value));
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={"Błąd"} />;
  if (!data) return <Warning message={"Brak danych"} />;

  return (
    <div className="addContent-div">
      <h1 className="addContent-h1">Narzędzia dodawania i edytowania</h1>
      <GuessDateAdd />
      <p className="addContent-p">
        Aby zmodyfikować datę, należy wybrać z poniższej listy dane wydarzenie
        historyczne
      </p>

      <Select handleChange={handleChange} data={data} />
      <GuessDateUpdate id={selectedId} />
    </div>
  );
};

const Select = ({ handleChange, data }) => {
  return (
    <select onChange={handleChange} className="addContent-select">
      <option value={0}>Wybierz</option>
      {data.map(record => {
        return (
          <option key={record.id} value={record.id}>
            {record.title}
          </option>
        );
      })}
    </select>
  );
};

export default GuessDateOptions;
