import { useContext, useState } from "react";
import axios from "axios";
import { URL_GUESSDATE_CREATE } from "../services/api/endpoints";
import authContext from "../store/authContext";

const useGuessDateAddLogic = () => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(null);
  const { user } = useContext(authContext);

  const handleChange = e => {
    const { value, name } = e.target;

    if (name === "title") setTitle(value);
    if (name === "day") setDay(value);
    if (name === "month") setMonth(value);
    if (name === "year") setYear(value);
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

  const handleSubmit = async e => {
    e.preventDefault();
    const isValidated = validate();

    if (!isValidated) return;

    const data = {
      title: title,
      day: day,
      month: month,
      year: year,
    };

    try {
      setIsUpdating(true);
      await axios.post(URL_GUESSDATE_CREATE, data, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      setStatus("Dodano nową treść");
      setTitle("");
      setDay("");
      setMonth("");
      setYear("");
    } catch (err) {
      console.log(err);
      setStatus("Coś poszło nie tak");
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    status,
    title,
    day,
    month,
    year,
    handleChange,
    handleSubmit,
  };
};

export default useGuessDateAddLogic;
