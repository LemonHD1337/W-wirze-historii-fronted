import { useContext, useState } from "react";
import axios from "axios";
import { URL_E_DELETE } from "../../../services/api/endpoints";
import authContext from "../../../store/authContext";

const DeleteEvent = ({ eventId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useContext(authContext);

  if (!eventId) return null;

  const handleSubmit = async e => {
    e.preventDefault();

    if (eventId === 0) return;
    try {
      setIsDeleting(true);
      await axios.delete(URL_E_DELETE + `/${eventId}`, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      setStatus("usunięto wpis");
    } catch (e) {
      console.log(e);
      setStatus("Coś poszło nie tak");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form mt-2">
      <h1 className="addContent-h1">Usuń wpis!</h1>
      <p className="addContent-p">Czy na pewno chcesz usunąć wydarzenie?</p>
      <button className="btn">
        {isDeleting ? "przetwarzanie..." : "Tak, usuń wpis"}
      </button>
      <p className="p-2">{status}</p>
    </form>
  );
};

export default DeleteEvent;
