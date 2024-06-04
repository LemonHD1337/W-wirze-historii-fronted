import { useState } from "react";
import axios from "axios";
import { URL_USER_DELETE } from "../services/api/endpoints";
import { useNavigate } from "react-router-dom";

const DeleteUser = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = new useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (id !== null) {
      setIsLoading(true);
      axios
        .delete(URL_USER_DELETE + `/${id}`)
        .then(res => {
          setMessage("usunięto konto");
        })
        .catch(err => {
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
    <div className="w-1/5 mt-2">
      <form
        onSubmit={handleSubmit}
        className="text-center border-bor border rounded-xl shadow p-5"
      >
        <h1 className="text-2xl font-bold">Usuń konto</h1>
        <button className="btn">
          {isLoading ? "usuwanie..." : "Usuń konto"}
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default DeleteUser;
