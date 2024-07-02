import { useState } from "react";
import { URL_USER_CHECK_EMAIL } from "../services/api/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(URL_USER_CHECK_EMAIL, { email: email });
      navigate("/password/reset/verify/" + res.data.id);
    } catch (e) {
      console.log(e);
      setError("Nie znaleziono konta powiązanego z tym emailem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={onSubmit} className="form">
        <h1 className="addContent-h1">Resetowanie hasła</h1>
        <p>Wpisz email, który jest połączony z twoim kontem</p>
        <div className={"div-input"}>
          <input
            type="text"
            placeholder={"E-mail"}
            className={"input"}
            value={email}
            onChange={handleChange}
          />
        </div>
        <button className={"btn"}>
          {isLoading ? "przetwarzanie..." : "Dalej"}
        </button>
        <p className={"p-2"}>{error}</p>
      </form>
    </div>
  );
};

export default PasswordReset;
