import { useContext, useState } from "react";
import { URL_MAP_DELETE } from "../../../services/api/endpoints";
import axios from "axios";
import authContext from "../../../store/authContext";

const MapDelete = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useContext(authContext);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!id) return;

    try {
      setIsDeleting(true);
      await axios.delete(URL_MAP_DELETE + `/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setStatus("Usunięto mapę!");
    } catch (e) {
      console.log(e);
      setStatus("Błąd");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!id) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="form "
      style={{ marginTop: "1.25rem" }}
    >
      <h1 className="addContent-h1">Usuwanie!</h1>
      <p className="addContent-p">Czy na pewno chcesz usunąć mapę?</p>
      <button className="btn">
        {isDeleting ? "usuwanie..." : "Tak, usuń mapę"}
      </button>
      <p className="p-2">{status}</p>
    </form>
  );
};

export default MapDelete;
