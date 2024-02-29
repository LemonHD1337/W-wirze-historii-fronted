import { useState, useRef } from "react";
import { urlInsertContentHistoricalFigures } from "../services/api/endpoints";
import axios from "axios";

const AddHistoricalFigure = () => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [death, setDeath] = useState("");
  const [pic, setPic] = useState(null);
  const [doc, setDoc] = useState(null);

  const refPic = useRef();
  const refDoc = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "birth") setBirth(value);
    if (name === "death") setDeath(value);
    if (name === "name") setName(value);
    if (name === "pic") setPic(files[0]);
    if (name === "doc") setDoc(files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("birth", birth);
    formdata.append("death", death);
    formdata.append("pic", pic);
    formdata.append("doc", doc);
    setIsLoading(true);
    axios
      .post(urlInsertContentHistoricalFigures, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setName(null);
        setBirth(null);
        setDeath(null);
        refDoc.current.value = "";
        refPic.current.value = "";
        setMessage("dodano zawartość");
      })
      .catch((err) => {
        console.log(err);
        setMessage("błąd");
      })
      .finally(setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
      <h1 className="font-bold text-2xl">Dodaj treść</h1>
      <div className="div-input">
        <label>
          dodaj zdjęcie postaci
          <br />
          <input
            type="file"
            name="pic"
            onChange={handleChange}
            className="input"
            accept="image/*"
          />
        </label>
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="imię i nazwisko"
          name="name"
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="data i miejsce urodzenia"
          name="birth"
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="data i miejsce śmierci"
          name="death"
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="div-input">
        <br />
        <label>
          dodaj opis związany z tą osobą w dokumencie word. Proszę unikać dodawania zdjęć
          w dokumencie.
          <br />
          <input
            type="file"
            name="doc"
            onChange={handleChange}
            className="input"
            accept=".doc, .docx"
          />
        </label>
      </div>

      <div>
        <button className="btn">
          {isLoading ? "dodawanie ..." : "Dodaj nową treść"}
        </button>
        <p>{message}</p>
      </div>
    </form>
  );
};

export default AddHistoricalFigure;
