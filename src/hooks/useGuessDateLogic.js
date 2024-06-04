import { useState } from "react";

const useGuessDateLogic = (data, setNext) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");

  const handleChange = e => {
    setResult("");
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

  const handleClick = e => {
    if (e.target.name === "next") {
      setNext(prevState => prevState + 1);
      return;
    }

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
          `${data.day}-${data.month}-${data.year}`,
      );
    }
  };

  return { handleClick, handleChange, result, day, month, year };
};

export default useGuessDateLogic;
