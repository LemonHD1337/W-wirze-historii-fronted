import { useState } from "react";
import axios from "axios";
import { URL_HF_DELETE } from "../../../services/api/endpoints";

const DeleteHistoricalFigure = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  if (!id) {
    return null;
  }

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(URL_HF_DELETE + `/${id}`);
      setStatus("usunięto wpis!");
      setTimeout(() => {
        setStatus("");
      }, 1000);
    } catch (e) {
      console.log(e);
      setStatus("Coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <h1 className="addContent-h1">Usuwanie postaci!</h1>
      <p className="addContent-p">
        Czy na pewno chcesz usunąć historczyną postać?
      </p>
      <button onClick={handleClick} className="btn">
        {isLoading ? "usuwanie..." : "Tak, usuń"}
      </button>
      <p className="p-2">{status}</p>
    </div>
  );
};

export default DeleteHistoricalFigure;
