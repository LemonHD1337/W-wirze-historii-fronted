import { useState } from "react";
import axios from "axios";
import { urlDeleteHistoricalFigure } from "../services/api/endpoints";

const DeleteHistoricalFigure = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  if (!id || id === 0) {
    return null;
  }

  const handleClick = () => {
    setIsLoading(true);
    axios
      .post(urlDeleteHistoricalFigure, { id: id })
      .then((res) => {
        setMessage("usunięto wpis");
      })
      .catch((err) => {
        console.log(err);
        setMessage("błąd");
      })
      .finally(setIsLoading(false));
  };

  return (
    <div>
      <p>
        Aby usunąć wpis należy wybrać u góry konkretny wpis i kliknąć przycisk poniżej
      </p>
      <button onClick={handleClick}>{isLoading ? "usuwanie..." : "usuń"}</button>
      <p>{message}</p>
    </div>
  );
};

export default DeleteHistoricalFigure;
