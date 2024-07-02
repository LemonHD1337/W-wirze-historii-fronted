import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_USER_CHECK_CODE } from "../services/api/endpoints";
import axios from "axios";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = e => {
    setCode(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = {
      id: id,
      code: code,
    };

    try {
      const res = await axios.post(URL_USER_CHECK_CODE, data);

      navigate("/password/reset/verified/" + id);
    } catch (e) {
      e.toJSON();
      if (e.code === "403") {
        setError(e.data.message);
        return;
      } else {
        setError("błąd");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <form className={"form"} onSubmit={handleSubmit}>
        <p className={"addContent-p"}>
          Wprowadź kod, który wysłaliśmy ci na pocztę
        </p>
        <div className={"div-input"}>
          <input
            type="text"
            placeholder={"kod"}
            className={"input"}
            onChange={handleChange}
            value={code}
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

export default VerifyCode;
