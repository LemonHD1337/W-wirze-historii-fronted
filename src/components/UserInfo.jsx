import { useEffect, useState } from "react";
import Loading from "./Loading";

import axios from "axios";
import { urlGetUserInfo, urlChangeUserInfo } from "../services/api/endpoints";

const UserInfo = ({ id }) => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (id !== null) {
      setIsLoading(true);
      axios
        .post(urlGetUserInfo, { id: id })
        .then((res) => {
          setName(res.data.name);
          setSurname(res.data.surname);
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: id,
      name: name,
      surname: surname,
      email: email,
    };

    setIsLoading(true);
    axios
      .put(urlChangeUserInfo, data)
      .then((res) => {
        setMessage("zmieniono danę");
      })
      .catch((err) => {
        console.log(err);
        setMessage("błąd");
      })
      .finally(setIsLoading(false));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-1/5">
      <form
        onSubmit={handleSubmit}
        className="shadow border border-bor p-5 text-center rounded-xl ">
        <h1 className="font-bold text-2xl">Zmień dane</h1>
        <div className="div-input">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="div-input">
          <input
            className="input"
            type="text"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
        </div>
        <div className="div-input">
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn">
          {isLoading ? "przetwarzanie" : "zmień danę"}
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default UserInfo;
