import { useEffect, useState } from "react";
import {
  URL_GUESSDATE_GET,
  URL_GUESSDATE_UPDATE,
} from "../services/api/endpoints.js";
import axios from "axios";

const GuessDateUpdate = ({ id }) => {
  const [title, setTitle] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [isLoading, setIsLoading] = useState();
  const [validationStatus, setValidationStatus] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (id && id !== 0) {
      setIsLoading(true);
      axios
        .post(URL_GUESSDATE_GET + `${id}`)
        .then(res => {
          const { title, day, month, year } = res.data;
          setDay(day);
          setTitle(title);
          setMonth(month);
          setYear(year);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(setIsLoading(false));
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    if (
      day.length === 0 &&
      month.length === 0 &&
      year.length === 0 &&
      title.length === 0
    ) {
      setValidationStatus("pola nie mogą być puste");
    }

    const data = {
      id: id,
      title: title,
      day: day,
      month: month,
      year: year,
    };
    setIsUpdating(true);
    axios
      .post(URL_GUESSDATE_UPDATE + `/${id}`, data)
      .then(res => {
        setMessage("zmodyfikowano dane");
      })
      .catch(err => {
        console.log(err);
        setMessage("błąd");
      })
      .finally(setIsUpdating(false));
  };

  if (!id || id === 0 || isLoading) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/5 border border-bor p-5 rounded-xl text-center mt-2"
    >
      <div className="div-input">
        <input
          className="input"
          type="text"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          value={day}
          onChange={e => {
            setDay(e.target.value);
          }}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          value={month}
          onChange={e => {
            setMonth(e.target.value);
          }}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          value={year}
          onChange={e => {
            setYear(e.target.year);
          }}
        />
      </div>
      <button className="btn">
        {isUpdating ? "przetwarzanie... " : "zmodyfikuj"}
      </button>
      <p>{validationStatus}</p>
      <p>{message}</p>
    </form>
  );
};

export default GuessDateUpdate;
