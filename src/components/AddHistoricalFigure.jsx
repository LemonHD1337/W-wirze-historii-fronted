import { useState } from "react";
import { urlInsertContentHistoricalFigures } from "../services/api/endpoints";
import axios from "axios";

const AddHistoricalFigure = () => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [death, setDeath] = useState("");
  const [pic, setPic] = useState(null);
  const [doc, setDoc] = useState(null);

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
        setDoc(null);
        setPic(null);
        setMessage("dodano zawartość");
      })
      .catch((err) => {
        console.log(err);
        setMessage("błąd");
      })
      .finally(setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Dodaj treść</h1>
      <label>
        dodaj zdjęcie postaci
        <br />
        <input type="file" name="pic" onChange={handleChange} />
      </label>
      <br />
      <input
        type="text"
        placeholder="imię i nazwisko"
        name="name"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        placeholder="data i miejsce urodzenia"
        name="birth"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        placeholder="data i miejsce śmierci"
        name="death"
        onChange={handleChange}
      />
      <br />
      <label>
        dodaj opis związany z tą osobą w dokumencie word. Proszę unikać dodawania zdjęć w
        dokumencie.
        <br />
        <input type="file" name="doc" onChange={handleChange} />
      </label>

      <div>
        <button>{isLoading ? "dodawanie ..." : "Dodaj nową treść"}</button>
        <p>{message}</p>
      </div>
    </form>
  );
};

export default AddHistoricalFigure;
