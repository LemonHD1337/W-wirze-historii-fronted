import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import EventCard from "../components/EventCard";
import axios from "axios";
import { urlGetEventsByEra, urlSearchEvents } from "../services/api/endpoints";

const Events = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (search.length === 0) {
      setLoading(true);
      axios
        .get(urlGetEventsByEra)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(setLoading(false));
    }
  }, [search]);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (search.length !== 0) {
        setLoading(true);
        axios
          .post(urlSearchEvents, { search: search })
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            setError(error);
            console.log(error);
          })
          .finally(setLoading(false));
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center mt-5">błąd</p>;
  }

  return (
    <>
      <SearchBar onKeyPress={onKeyPress} onChange={handleSearch} value={search} />
      <div className="w-full h-full flex flex-wrap">
        {data.map((element, index) => {
          return <EventCard element={element} key={index} />;
        })}
      </div>
    </>
  );
};

export default Events;
