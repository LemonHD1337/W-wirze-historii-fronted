import { useState, useEffect } from "react";
import axios from "axios";
import { urlGetEvents, urlDeleteEvent } from "../services/api/endpoints";

const DeleteEvent = ({ era }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [eventId, setEventId] = useState();

  useEffect(() => {
    if (era) {
      axios
        .post(urlGetEvents, { era: era })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  }, [era]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (eventId !== 0) {
      axios
        .delete(urlDeleteEvent + eventId)
        .then((res) => {
          setMessage("usunięto wpis");
        })
        .catch((err) => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setEventId(e.target.value)}>
        <option value={0}>Wybierz wpis</option>
        {data.map((element) => {
          return (
            <option value={element.id} key={element.id}>
              {element.title}
            </option>
          );
        })}
      </select>
      <button>{isLoading ? "przetwarzanie..." : "Usuń wpis"}</button>
      <p>{message}</p>
    </form>
  );
};

export default DeleteEvent;
