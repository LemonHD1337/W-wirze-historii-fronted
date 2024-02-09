import { useEffect, useState, useContext } from "react";
import { urlGetDataGuessDate } from "../services/api/endpoints";
import Loading from "../components/Loading";
import axios from "axios";
import authContext from "../store/authContext";
import GuessDateTools from "../components/GuessDateTools";

const GuessDate = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");

  const { user } = useContext(authContext);

  const handleChange = (e) => {
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

  const handleClick = (e) => {
    e.preventDefault();
    let dayVal = false;
    let monthVal = false;
    let yearVal = false;

    if (day === data.day) dayVal = true;
    if (year === data.year) yearVal = true;

    if (month.length > 2) {
      const monthsString = {
        styczeń: "1",
        luty: "2",
        marzec: "3",
        kwiecień: "4",
        maj: "5",
        czerwiec: "6",
        lipiec: "7",
        sierpień: "8",
        wrzesień: "9",
        październik: "10",
        listopad: "11",
        grudzień: "12",
      };

      if (monthsString[month] === data.month) {
        monthVal = true;
      }
    } else if (month === data.month) {
      monthVal = true;
    }

    if (dayVal && monthVal && yearVal) {
      setResult("Brawo! Podałeś prawidłową odpowiedź");
    } else {
      setResult("Niestety! Zrobiłeś błąd");
    }
  };

  useEffect(() => {
    const fetechData = async () => {
      axios
        .get(urlGetDataGuessDate)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(setIsLoading(false));
    };

    fetechData();
  }, []);

  const showTools = () => {
    if (user.role === "creator " || user.role === "admin") {
      return <GuessDateTools />;
    }
  };

  //render
  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="guess-date-container">
      {showTools()}
      <div className="guess-date-container-game">
        <div className="guess-date-info">
          <h2>Informacje o grze</h2>
          <p>W tej grze trzeba podać datę wydarzenia podanego poniżej: </p>
        </div>

        <h1>{data.title}</h1>

        <div className="inputs-container">
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
        </div>

        <div className="btn-container-guess-date">
          <button onClick={handleClick}>Sprawdź</button>
        </div>

        <div className="result-guess-date">
          {error ? <p>{error}</p> : <p>{result}</p>}
        </div>
      </div>
    </div>
  );
};

export default GuessDate;
