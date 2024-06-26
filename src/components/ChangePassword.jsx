import { useState } from "react";
import axios from "axios";
import { URL_USER_UPDATE_PASSWORD } from "../services/api/endpoints";

const ChangePassword = ({ id }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const isValidated = await checkPasswords();

    if (isValidated && id !== null) {
      setIsLoading(true);
      axios
        .put(URL_USER_UPDATE_PASSWORD + `/${id}`, { password: password })
        .then(res => {
          setMessage("Pomyśle zmieniono hasło");
        })
        .catch(err => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(setIsLoading(false));
    }
  };

  const checkPasswords = () => {
    if (password.length !== 0 && password.length !== 0) {
      if (password === password2) {
        return true;
      } else {
        setMessage("hasła są różne");
      }
    } else {
      setMessage("pola nie mogą być puste");
    }
  };

  return (
    <div className="w-1/5 mt-2">
      <form
        onSubmit={handleSubmit}
        className="text-center border border-bor rounded-xl shadow p-5"
      >
        <h1 className="font-bold text-2xl">Zmień hasło</h1>
        <div className="div-input">
          <input
            className="input"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="div-input">
          <input
            className="input"
            type="password"
            value={password2}
            onChange={e => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <button className="btn">
          {isLoading ? "przetwarzanie..." : "zmień hasło"}
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default ChangePassword;
