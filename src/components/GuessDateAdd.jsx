import { useState } from "react";
import axios from "axios";
import { URL_GUESSDATE_CREATE } from "../services/api/endpoints";
import Loading from "./shared/Loading";

const GuessDateAdd = () => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }

    if (e.target.name === "day") {
      setDay(e.target.value);
    }

    if (e.target.name === "month") {
      setMonth(e.target.value);
    }

    if (e.target.name === "year") {
      setYear(e.target.value);
    }
  };

  const validate = () => {
    let titleVal = false;
    let dayVal = false;
    let monthVal = false;
    let yearVal = false;

    if (title.length > 0) titleVal = true;
    if (day.length > 0) dayVal = true;
    if (month.length > 0) monthVal = true;
    if (year.length > 0) yearVal = true;

    if (titleVal && dayVal && monthVal && yearVal) {
      return true;
    } else {
      setStatus("pola nie moga być puste");
      return false;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isValidated = validate();

    if (isValidated) {
      const data = {
        title: title,
        day: day,
        month: month,
        year: year,
      };

      setIsLoading(true);
      axios
        .post(URL_GUESSDATE_CREATE, data)
        .then(res => {
          setStatus("Dodano nową treść");
          setTitle("");
          setDay("");
          setMonth("");
          setYear("");
        })
        .catch(error => {
          setStatus("Coś poszło nie tak");
        })
        .finally(setIsLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/5 text-center border border-bor shadow rounded-xl p-5"
    >
      <h1 className="text-2xl font-bold">Narzedzia</h1>
      <p>Miesiąc należy podać w formie liczbowej</p>
      <div className="div-input">
        <input
          type="text"
          placeholder="Tytuł"
          name="title"
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="dzień"
          name="day"
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="miesiąc"
          name="month"
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="rok"
          name="year"
          onChange={handleChange}
          className="input"
        />
      </div>
      <div>
        <button className="btn">
          {isLoading ? <Loading /> : "Dodaj treść"}
        </button>
      </div>
      <p>{status}</p>
    </form>
  );
};

export default GuessDateAdd;
