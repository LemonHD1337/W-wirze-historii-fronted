import { useState } from "react";
import axios from "axios";
import { URL_HF_DELETE } from "../services/api/endpoints";

const DeleteHistoricalFigure = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  if (!id || id === 0) {
    return null;
  }

  const handleClick = () => {
    setIsLoading(true);
    axios
      .get(URL_HF_DELETE + `/${id}`)
      .then(res => {
        setMessage("usunięto wpis");
      })
      .catch(err => {
        console.log(err);
        setMessage("błąd");
      })
      .finally(setIsLoading(false));
  };

  return (
    <div className="form mt-2">
      <p className="text-lg">
        Aby usunąć wpis należy wybrać u góry konkretny wpis i kliknąć przycisk
        poniżej
      </p>
      <button onClick={handleClick} className="btn mt-2">
        {isLoading ? "usuwanie..." : "usuń"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default DeleteHistoricalFigure;
