import { useState } from "react";
import axios from "axios";
import { URL_USER_DELETE } from "../../services/api/endpoints";
import { useNavigate } from "react-router-dom";

const DeleteUser = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const navigate = new useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (id === null) return;

    try {
      await axios.delete(URL_USER_DELETE + `/${id}`);
      navigate("/user/logout");
    } catch (e) {
      console.log(e);
      setStatus("Błąd");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-center mt-2">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="text-2xl font-bold">Usuń konto</h1>
        <button className="btn m-2">
          {isLoading ? "usuwanie..." : "Usuń konto"}
        </button>
        <p>{status}</p>
      </form>
    </div>
  );
};

export default DeleteUser;
