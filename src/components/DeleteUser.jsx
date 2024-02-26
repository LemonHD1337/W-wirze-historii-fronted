import { useState } from "react";
import axios from "axios";
import { urlDeleteAccount } from "../services/api/endpoints";
import { useNavigate } from "react-router-dom";

const DeleteUser = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = new useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== null) {
      setIsLoading(true);
      axios
        .delete(urlDeleteAccount + id)
        .then((res) => {
          setMessage("usunięto konto");
        })
        .catch((err) => {
          console.log(err);
          setMessage("błąd");
        })
        .finally(() => {
          setIsLoading(false);
          navigate("/user/logout");
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Usuń konto</h1>
      <button>{isLoading ? "usuwanie..." : "Usuń konto"}</button>
      <p>{message}</p>
    </form>
  );
};

export default DeleteUser;
