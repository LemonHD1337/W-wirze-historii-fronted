import { useEffect, useState } from "react";
import GuessDateAdd from "./GuessDateAdd";
import GuessDateUpdate from "./GuessDateUpdate";
import Loading from "./Loading";

import axios from "axios";
import { urlGetDataGuessDate } from "../services/api/endpoints";

const GuessDateOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(urlGetDataGuessDate)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {})
      .finally(setIsLoading(false));
  }, []);

  const handleChange = (e) => {
    setSelectedId(e.target.value);
  };

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      <GuessDateAdd />
      <select onChange={handleChange} className="input mt-3">
        <option value={0}>Wybierz datę którą chcesz zmodyfikować</option>
        {data.map((record) => {
          return (
            <option key={record.id} value={record.id}>
              {record.title}
            </option>
          );
        })}
      </select>

      <GuessDateUpdate id={selectedId} />
    </>
  );
};

export default GuessDateOptions;
