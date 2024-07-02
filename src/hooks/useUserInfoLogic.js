import { useEffect, useState } from "react";
import axios from "axios";
import {
  URL_USER_GET,
  URL_USER_UPDATE_DETAILS,
} from "../services/api/endpoints";

const useUserInfoLogic = id => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      if (id == null) return;

      setIsLoading(true);

      try {
        const res = await axios.get(URL_USER_GET + `/${id}`);
        const { name, surname, email } = res.data;
        setName(name);
        setSurname(surname);
        setEmail(email);
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      name: name,
      surname: surname,
      email: email,
    };

    setIsLoading(true);
    try {
      await axios.post(URL_USER_UPDATE_DETAILS + `/${id}`, data);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = e => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "surname") setSurname(value);
    if (name === "email") setEmail(value);
  };

  return { isLoading, name, surname, email, error, handleSubmit, onChange };
};

export default useUserInfoLogic;
