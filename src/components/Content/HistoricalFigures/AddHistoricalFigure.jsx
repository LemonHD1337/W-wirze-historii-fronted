import useAddHistoricalFigureLogic from "../../../hooks/useAddHistoricalFigureLogic";

const AddHistoricalFigure = () => {
  const {
    isLoading,
    handleChange,
    handleSubmit,
    status,
    refDoc,
    refPic,
    name,
  } = useAddHistoricalFigureLogic();

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="form"
    >
      <h1 className="addContent-h1">Dodaj treść!</h1>
      <div className="div-input">
        <input
          type="text"
          placeholder="imię i nazwisko"
          name="name"
          onChange={handleChange}
          className="input"
          value={name}
        />
      </div>

      <div className="div-input">
        <label>
          dodaj zdjęcie postaci
          <br />
          <input
            type="file"
            name="pic"
            onChange={handleChange}
            className="input"
            accept="image/*"
            ref={refPic}
          />
        </label>
      </div>

      <div className="div-input">
        <br />
        <label>
          Dołącz plik o rozszerzeniu pdf zawierający opis postaci
          <br />
          <input
            type="file"
            name="doc"
            onChange={handleChange}
            className="input"
            accept="application/pdf"
            ref={refDoc}
          />
        </label>
      </div>

      <div>
        <button className="btn">
          {isLoading ? "dodawanie ..." : "Dodaj nową treść"}
        </button>
        <p className="p-2">{status}</p>
      </div>
    </form>
  );
};

export default AddHistoricalFigure;
