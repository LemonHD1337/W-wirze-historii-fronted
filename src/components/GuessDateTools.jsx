import { useState } from "react";
import axios from "axios";
import { urlInsertDataGuessDate } from "../services/api/endpoints";
import Loading from "./Loading";

const GuessDateTools = () => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
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

  const handleClick = () => {
    const isValidated = validate();

    console.log("klik", isValidated);

    if (isValidated) {
      const data = {
        title: title,
        day: day,
        month: month,
        year: year,
      };

      setIsLoading(true);
      axios
        .post(urlInsertDataGuessDate, data)
        .then((res) => {
          setStatus("Dodano nową treść");
        })
        .catch((error) => {
          setStatus("Coś poszło nie tak");
        })
        .finally(setIsLoading(false));
    }
  };

  return (
    <div className="guess-date-tools">
      <h1>Narzedzia</h1>
      <p>Miesiąc należy podać w formie liczbowej</p>
      <div>
        <input
          type="text"
          placeholder="Tytuł"
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="dzień"
          name="day"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="miesiąc"
          name="month"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="rok"
          name="year"
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleClick}>
          {isLoading ? <Loading /> : "Dodaj treść"}
        </button>
      </div>
      <p>{status}</p>
    </div>
  );
};

export default GuessDateTools;
