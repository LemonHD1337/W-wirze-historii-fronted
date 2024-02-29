import { useState, useEffect } from "react";

import axios from "axios";
import { urlGetContentHistoricalFigures } from "../services/api/endpoints";

import AddHistoricalFigure from "./AddHistoricalFigure";
import DeleteHistoricalFigure from "./DeleteHistoricalFigure";
import Loading from "./Loading";

const HistoricalFiguresOptions = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(urlGetContentHistoricalFigures)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
  }, []);

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AddHistoricalFigure />
      <select onChange={(e) => setSelectedId(e.target.value)} className="input mt-2">
        <option value="0">wybierz wpis</option>
        {data.map((record) => {
          return (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          );
        })}
      </select>
      <div className="mt-2 text-lg">
        <p>Aby zmodyfikować dane należy usunąć i dodać od nowa</p>
      </div>
      <DeleteHistoricalFigure id={selectedId} />
    </>
  );
};

export default HistoricalFiguresOptions;
