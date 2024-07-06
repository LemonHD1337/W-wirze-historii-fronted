import { useState } from "react";
import axios from "axios";
import { URL_USER_UPDATE_PASSWORD } from "../../services/api/endpoints";

const ChangePassword = ({ id }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const isValidated = checkPasswords();
    if (!isValidated || id === null) return;

    try {
      setIsLoading(true);
      await axios.put(URL_USER_UPDATE_PASSWORD + `/${id}`, {
        password: password,
      });
      setStatus("Pomyśle zmieniono hasło");
    } catch (e) {
      console.log(e);
      setStatus("Błąd");
    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswords = () => {
    if (password.length !== 0 && password.length !== 0) {
      if (password === password2) {
        return true;
      } else {
        setStatus("hasła są różne");
      }
    } else {
      setStatus("pola nie mogą być puste");
    }
  };

  return (
    <div className="w-full flex justify-center m-3">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="font-bold text-2xl">Zmień hasło</h1>
        <div className="div-input">
          <input
            className="input"
            type="password"
            placeholder={"wpisz hasło"}
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
            placeholder={"powtórz hasło"}
            value={password2}
            onChange={e => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <button className="btn m-2">
          {isLoading ? "przetwarzanie..." : "zmień hasło"}
        </button>
        <p>{status}</p>
      </form>
    </div>
  );
};

export default ChangePassword;
