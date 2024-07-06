import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  URL_GUESSDATE_GET,
  URL_GUESSDATE_UPDATE,
} from "../services/api/endpoints";
import authContext from "../store/authContext";

const useGuessDateUpdateLogic = id => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(null);
  const { user } = useContext(authContext);

  useEffect(() => {
    if (!id || id === 0) return;

    (async function () {
      try {
        setIsLoading(true);
        const res = await axios.get(URL_GUESSDATE_GET + `/${id}`, {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        });
        const { title, day, month, year } = res.data;
        setDay(day);
        setTitle(title);
        setMonth(month);
        setYear(year);
      } catch (e) {
        console.log(e);
        setStatus("Coś poszło nie tak");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const handleChange = e => {
    const { value, name } = e.target;

    if (name === "title") setTitle(value);
    if (name === "day") setDay(value);
    if (name === "month") setMonth(value);
    if (name === "year") setYear(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      title: title,
      day: day,
      month: month,
      year: year,
    };

    try {
      setIsUpdating(true);
      await axios.put(URL_GUESSDATE_UPDATE + `/${id}`, data, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      setStatus("Zaktualizowano dane");
    } catch (e) {
      console.log(e);
      setStatus("Coś poszło nie tak");
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    status,
    day,
    title,
    year,
    month,
    isUpdating,
    isLoading,
    handleSubmit,
    handleChange,
  };
};

export default useGuessDateUpdateLogic;
