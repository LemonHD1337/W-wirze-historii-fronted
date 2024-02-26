import { useState } from "react";
import axios from "axios";
import { urlCreateEvent } from "../services/api/endpoints";

const AddEvent = ({ era }) => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [pic, setPic] = useState();
  const [doc, setDoc] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("day", day);
    formdata.append("month", month);
    formdata.append("year", year);
    formdata.append("pic", pic);
    formdata.append("doc", doc);
    formdata.append("era", era);

    setIsLoading(true);

    axios
      .post(urlCreateEvent, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setMessage("dodano wpis");
        setTitle();
        setDay();
        setMonth();
        setYear();
        setPic();
        setDoc();
      })
      .catch((err) => {
        console.log(err);
        setMessage("błąd");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <h1>Dodaj wpis</h1>
      <div>
        <input
          type="text"
          placeholder="Nazwa wydarzenia"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="dzień wydarzenia"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="miesiąc wydarzenia"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="rok wydarzenia"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
      </div>
      <div>
        <label>
          Dodaj zdjęcie wydarzenia
          <input
            type="file"
            onChange={(e) => {
              setPic(e.target.files[0]);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Dodaj treść w word
          <input
            type="file"
            onChange={(e) => {
              setDoc(e.target.files[0]);
            }}
          />
        </label>
      </div>
      <button>{isLoading ? "przetwarzanie ..." : "dodaj wpis"}</button>
      <p>{message}</p>
    </form>
  );
};

export default AddEvent;
