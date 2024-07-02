import useAddMapLogic from "../../../hooks/useAddMapLogic";

const MapAdd = ({ era }) => {
  const {
    handleSubmit,
    handleChange,
    status,
    isLoading,
    source,
    title,
    imageURL,
  } = useAddMapLogic(era);

  if (!era || era === "0") return null;

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="addContent-h1">Dodaj Mapę</h1>
      <div className="div-input">
        <input
          className="input"
          type="text"
          placeholder="nazwa mapy"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="div-input">
        <input
          className="input"
          type="text"
          placeholder="link do strony"
          name="source"
          value={source}
          onChange={handleChange}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          placeholder="link do mapy"
          name="imageURL"
          value={imageURL}
          onChange={handleChange}
        />
      </div>
      <button className="btn">
        {isLoading ? "przetwarzanie..." : "dodaj mapę"}
      </button>
      <p className="p-2">{status}</p>
    </form>
  );
};

export default MapAdd;
