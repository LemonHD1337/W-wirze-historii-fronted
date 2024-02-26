import { useEffect, useState } from "react";
import { urlGetRecordGuessDate } from "../services/api/endpoints";
import Loading from "../components/Loading";
import axios from "axios";
import GuessDateGame from "../components/GuessDateGame";

const GuessDate = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");
  const [next, setNext] = useState(0);

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
      setResult(
        "Niestety! Zrobiłeś błąd. Prawidołowa odpowiedz to: " +
          `${data.day}-${data.month}-${data.year}`
      );
    }
  };

  useEffect(() => {
    const fetechData = async () => {
      axios
        .get(urlGetRecordGuessDate)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(setIsLoading(false));
    };

    fetechData();
  }, [next]);

  //render
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="guess-date-container">
      <GuessDateGame
        data={data}
        handleChange={handleChange}
        handleClick={handleClick}
        result={result}
        setNext={setNext}
        next={next}
      />
      <p>{error}</p>
    </div>
  );
};

export default GuessDate;
