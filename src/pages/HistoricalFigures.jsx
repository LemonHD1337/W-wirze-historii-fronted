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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios
        .get(urlGetContentHistoricalFigures)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

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

  return (
    <>
      <SearchBar onChange={handleSearch} onKeyPress={onKeyPress} />
      <div className="historical-figures-content">
        {data.map((element) => {
          return <HistoricalFigureCard element={element} key={element.id} />;
        })}
      </div>
    </>
  );
};

export default HistoricalFigures;
