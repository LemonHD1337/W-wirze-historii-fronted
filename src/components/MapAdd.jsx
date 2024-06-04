import { useState } from "react";
import axios from "axios";
import { URL_MAP_CREATE } from "../services/api/endpoints";

const MapAdd = ({ era }) => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    const isValidated =
      title.length !== 0 &&
      era !== 0 &&
      source.length !== 0 &&
      imageURL.length !== 0;
    if (isValidated) {
      const data = {
        title: title,
        source: source,
        era: era,
        imageURL: imageURL,
      };

      setIsLoading(true);
      axios
        .post(URL_MAP_CREATE, data)
        .then(res => {
          setMessage("dodano mapę");
          setTitle("");
          setSource("");
          setImageURL("");
        })
        .catch(err => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
    setMessage("pola nie mogą być puste");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="font-bold text-2xl">Dodaj Mapę</h1>
      <div className="div-input">
        <input
          className="input"
          type="text"
          placeholder="nazwa mapy"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="div-input">
        <input
          className="input"
          type="text"
          placeholder="link do strony"
          value={source}
          onChange={e => {
            setSource(e.target.value);
          }}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          placeholder="link do mapy"
          value={imageURL}
          onChange={e => {
            setImageURL(e.target.value);
          }}
        />
      </div>
      <button className="btn">
        {isLoading ? "przetwarzanie..." : "dodaj mapę"}
      </button>
      <p>{message}</p>
    </form>
  );
};

export default MapAdd;
