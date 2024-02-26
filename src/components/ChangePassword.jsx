import { useState } from "react";
import axios from "axios";
import { urlChangeUserPassword } from "../services/api/endpoints";

const ChangePassword = ({ id }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = await checkPasswords();

    if (isValidated && id !== null) {
      setIsLoading(true);
      axios
        .put(urlChangeUserPassword, { id: id, password: password })
        .then((res) => {
          setMessage("Pomyśle zmieniono hasło");
        })
        .catch((err) => {
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
    <div>
      <h1>Zmień hasło</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <button>{isLoading ? "przetwarzanie..." : "zmień hasło"}</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default ChangePassword;
