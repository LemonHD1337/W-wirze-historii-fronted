import { useState, useEffect } from "react";
import axios from "axios";
import { urlGetMapById, urlUpdateMapById } from "../services/api/endpoints";

const MapUpdate = ({ id }) => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (id !== 0) {
      setIsLoading(true);
      axios
        .get(urlGetMapById + id)
        .then((res) => {
          const { title, imageURL, source } = res.data;
          setTitle(title);
          setSource(source);
          setImageURL(imageURL);
        })
        .catch((err) => {})
        .finally(setIsLoading(false));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidated = source.length !== 0 && title.length !== 0 && imageURL !== 0;

    if (id !== 0) {
      if (isValidated) {
        const data = {
          title: title,
          source: source,
          imageURL: imageURL,
        };
        setIsLoading(true);
        axios
          .put(urlUpdateMapById + id, data)
          .then((res) => {
            setMessage("zmodyfikowano mapę");
          })
          .catch((err) => {
            console.log(err);
            setMessage("błąd");
          })
          .finally(setIsLoading(false));
      } else {
        setMessage("pola nie mogą być puste");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form mt-2">
      <h1 className="font-bold text-2xl">Edutuj mapę</h1>
      <div className="div-input">
        <input
          className="input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
          }}
        />
      </div>
      <button className="btn mt-2">
        {isLoading ? "przetwarzanie..." : "zmodyfikuj mapę"}
      </button>
      <p>{message}</p>
    </form>
  );
};

export default MapUpdate;
