import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import {
  urlGetContentHistoricalFigures,
  urlSearchInfoHistoricalFigure,
} from "../services/api/endpoints";
import axios from "axios";
import Loading from "../components/Loading";
import HistoricalFigureCard from "../components/HistoricalFigureCard";

const HistoricalFigures = () => {
  //states for navbar
  const [search, setSearch] = useState("");
  //satates for content
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (search.length === 0) {
      setLoading(true);
      axios
        .get(urlGetContentHistoricalFigures)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError("błąd");
        })
        .finally(setLoading(false));
    }
  }, [search]);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (search.length !== 0) {
        setLoading(true);
        axios
          .post(urlSearchInfoHistoricalFigure, { search: search })
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center mt-3">{error}</p>;
  }

  return (
    <>
      <SearchBar onChange={handleSearch} onKeyPress={onKeyPress} value={search} />
      <div className="w-full h-full flex flex-wrap">
        {data.map((element) => {
          return <HistoricalFigureCard element={element} key={element.id} />;
        })}
      </div>
    </>
  );
};

export default HistoricalFigures;
