import { useState } from "react";
import { URL_HF_GETALL } from "../../../services/api/endpoints";
import AddHistoricalFigure from "./AddHistoricalFigure";
import DeleteHistoricalFigure from "./DeleteHistoricalFigure";
import Loading from "../../shared/Loading";
import Error from "../../shared/Error";
import Warning from "../../shared/Warning";
import useFetch from "../../../hooks/useFetch";

const HistoricalFiguresOptions = () => {
  const { isLoading, data, error } = useFetch(URL_HF_GETALL);
  const [selectedId, setSelectedId] = useState(0);

  const handleChange = e => {
    setSelectedId(e.target.value);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!data) return <Warning message="Brak danych" />;

  return (
    <div className="addContent-div">
      <h1 className="addContent-h1">Narzędzia</h1>
      <AddHistoricalFigure />
      <p className="addContent-p">
        Aby zmodyfikować dane należy usunąć i dodać od nowa
      </p>
      <Select data={data} handleChange={handleChange} />
      <DeleteHistoricalFigure id={selectedId} />
    </div>
  );
};

const Select = ({ handleChange, data }) => {
  return (
    <select onChange={handleChange} className="addContent-select">
      <option value="0">wybierz wpis</option>
      {data.map(record => {
        return (
          <option key={record.id} value={record.id}>
            {record.name}
          </option>
        );
      })}
    </select>
  );
};

export default HistoricalFiguresOptions;
