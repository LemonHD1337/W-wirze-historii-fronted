import useAddWayLogic from "../../hooks/useAddWayLogic";
import Loading from "../shared/Loading";
import { useContext } from "react";
import authContext from "../../store/authContext";

const AddWaypoint = ({ checked, setChecked, eventsList, lat, lng, id }) => {
  const { status, isLoading, handleSubmit, handleChange } = useAddWayLogic(
    lat,
    lng,
    id,
  );

  const { user } = useContext(authContext);

  if (!eventsList || !id) return null;
  if (!user.authenticated) return null;
  if (user.role === "user" || !user.role) return null;
  if (isLoading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className=" border-w-full m-2 text-centery-2 border-bor p-5"
    >
      <h1 className="font-bold text-2xl p-2">Dodaj zaznacznik</h1>
      <p className="font-lg p-2">
        Aby dodać zaznacznik, należy kliknąć na mapie w odpowiednim miejscu i
        wybrać odpowiednie wydarzenie
      </p>
      <select className="input w-full" onChange={handleChange}>
        <option value="0">wybierz wpis do zaznacznika</option>
        {eventsList.map((event, index) => {
          return (
            <option value={event.id} title={event.title} key={index}>
              {event.title}
            </option>
          );
        })}
      </select>
      <br />

      <input
        type="checkbox"
        id={"selectOnlyNotUsed"}
        checked={checked}
        onChange={e => setChecked(!checked)}
      />
      <label htmlFor="selectOnlyNotUsed" className={"font-lg p-2"}>
        Szukać wpisów niewykorzystanych
      </label>

      <br />
      <input
        name={"checkbox"}
        type="text"
        placeholder="Latitude"
        value={lat}
        className="input my-2"
        disabled={true}
      />
      <br />
      <input
        type="text"
        placeholder="Longitude"
        value={lng}
        className="input my-2"
        disabled={true}
      />
      <br />
      <button className="btn">
        {isLoading ? "przetwarzanie..." : "Dodaj zaznacznik"}
      </button>
      <p className={"p-2"}>{status}</p>
    </form>
  );
};

export default AddWaypoint;
