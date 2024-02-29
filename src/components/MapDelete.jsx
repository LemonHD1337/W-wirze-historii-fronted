import { useState } from "react";
import { urlDeleteMap } from "../services/api/endpoints";
import axios from "axios";

const MapDelete = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id !== 0) {
      setIsLoading(true);
      axios
        .delete(urlDeleteMap + id)
        .then((res) => {
          setMessage("usunięto mapę");
        })
        .catch((err) => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form mt-2">
      <h1 className="font-bold text-2xl">Usuń mapę</h1>
      <button className="btn mt-2">{isLoading ? "usuwanie..." : "usuń mapę"}</button>
      <p>{message}</p>
    </form>
  );
};

export default MapDelete;
