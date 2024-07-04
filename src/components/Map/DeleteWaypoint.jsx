import useDeleteWaypointLogic from "../../hooks/useDeleteWaypointLogic";
import { useContext } from "react";
import authContext from "../../store/authContext";
import Loading from "../shared/Loading";

const DeleteWaypoint = ({ waypoints }) => {
  const { status, isLoading, handleChange, handleSubmit } =
    useDeleteWaypointLogic();

  const { user } = useContext(authContext);

  if (!waypoints) return null;
  if (!user.authenticated) return null;
  if (user.role === "user" || !user.role) return null;
  if (isLoading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className="border-w-full m-2 text-centery-2 border-bor p-5"
    >
      <h1 className="text-2xl font-bold p-2">Usuń zaznacznik</h1>

      <p className="font-lg p-2">
        Aby usunąć zaznacznik z mapy, należy go wybrąc z listy
      </p>

      <select className="input w-full" onChange={handleChange}>
        <option value="0">Wybierz zaznacznik</option>
        {waypoints.map((waypoint, index) => {
          return (
            <option value={waypoint.id} key={index}>
              {waypoint.title}
            </option>
          );
        })}
      </select>

      <br />

      <button className="btn mt-2">
        {isLoading ? "usuwanie..." : "Usuń zaznacznik"}
      </button>
      <p className={"p-2"}>{status}</p>
    </form>
  );
};

export default DeleteWaypoint;
