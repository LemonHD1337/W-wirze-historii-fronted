import useUpdateMapLogic from "../../../hooks/useUpdateMapLogic";
import Loading from "../../shared/Loading";

const MapUpdate = ({ id }) => {
  const {
    title,
    handleSubmit,
    status,
    handleChange,
    isLoading,
    isUpdating,
    source,
    imageURL,
  } = useUpdateMapLogic(id);

  if (isLoading) return <Loading />;
  if (!id) return null;

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="addContent-h1">Edytowanie!</h1>
      <div className="div-input">
        <input
          className="input"
          type="text"
          name={"title"}
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          name={"source"}
          value={source}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          name={"imageURL"}
          value={imageURL}
          onChange={handleChange}
        />
      </div>
      <button className="btn mt-2">
        {isUpdating ? "przetwarzanie..." : "zmodyfikuj mapę"}
      </button>
      <p className="p-2">{status}</p>
    </form>
  );
};

export default MapUpdate;
