import useFetch from "../../../hooks/useFetch";
import { URL_GUESSDATE_GET_RANDOM } from "../../../services/api/endpoints";
import Warning from "../../shared/Warning";
import Loading from "../../shared/Loading";
import Error from "../../shared/Error";
import useGuessDateLogic from "../../../hooks/useGuessDateLogic";
import { useState } from "react";

const GuessDateGame = () => {
  const [next, setNext] = useState(0);
  const { data, isLoading, error } = useFetch(URL_GUESSDATE_GET_RANDOM, next);
  const { handleClick, handleChange, result, day, year, month } =
    useGuessDateLogic(data, setNext);

  if (isLoading) return <Loading />;
  if (!data) return <Warning message={"Brak danych"} />;
  if (error) return <Error message={error} />;

  return (
    <div className="p-5 text-center">
      <div className="guess-date-info">
        <h2 className="font-bold text-2xl">Informacje o grze</h2>
        <p className="text">
          W tej grze trzeba podać datę wydarzenia podanego poniżej:{" "}
        </p>
      </div>

      <h1 className="font-bold text-2xl my-2">{data.title}</h1>

      <div className="w-full h-full flex justify-center md:flex-col">
        <div className="div-input">
          <input
            type="text"
            placeholder="dzień"
            name="day"
            value={day}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="div-input">
          <input
            type="text"
            placeholder="miesiąc"
            name="month"
            value={month}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="div-input">
          <input
            type="text"
            placeholder="rok"
            name="year"
            value={year}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div>
        <button onClick={handleClick} className="btn m-2">
          Sprawdź
        </button>
        <button onClick={handleClick} name="next" className="btn m-2">
          Następne
        </button>
      </div>

      <div className="result-guess-date">
        <p>{result}</p>
      </div>
    </div>
  );
};

export default GuessDateGame;
