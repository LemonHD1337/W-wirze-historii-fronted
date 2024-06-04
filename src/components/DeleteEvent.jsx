import { useEffect, useState } from "react";
import axios from "axios";
import { URL_E_DELETE, URL_E_GET_ALL_BY_ERA } from "../services/api/endpoints";

const DeleteEvent = ({ era }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [eventId, setEventId] = useState();

  useEffect(() => {
    if (era) {
      axios
        .get(URL_E_GET_ALL_BY_ERA + `/${era}`)
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  }, [era]);

  const handleSubmit = e => {
    e.preventDefault();

    if (eventId !== 0) {
      axios
        .delete(URL_E_DELETE + `/${eventId}`)
        .then(res => {
          setMessage("usunięto wpis");
        })
        .catch(err => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form mt-2">
      <select onChange={e => setEventId(e.target.value)} className="input">
        <option value={0}>Wybierz wpis</option>
        {data.map(element => {
          return (
            <option value={element.id} key={element.id}>
              {element.title}
            </option>
          );
        })}
      </select>
      <br />
      <button className="btn mt-2">
        {isLoading ? "przetwarzanie..." : "Usuń wpis"}
      </button>
      <p>{message}</p>
    </form>
  );
};

export default DeleteEvent;
