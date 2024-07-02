import useAddEventLogic from "../../../hooks/useAddEventLogic";

const AddEvent = ({ era }) => {
  const {
    isLoading,
    handleChange,
    handleSubmit,
    status,
    refDoc,
    refPic,
    title,
  } = useAddEventLogic(era);

  if (!era) return null;

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="form"
    >
      <h1 className="text-2xl font-bold">Dodaj wpis</h1>
      <div className="div-input">
        <input
          className="input"
          type="text"
          placeholder="Nazwa wydarzenia"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="div-input">
        <label>
          Dodaj zdjęcie wydarzenia
          <input
            className="input"
            type="file"
            name="pic"
            onChange={handleChange}
            ref={refPic}
            accept="image/*"
          />
        </label>
      </div>
      <div className="div-input">
        <label>
          Dodaj treść w word
          <input
            className="input"
            type="file"
            name="doc"
            onChange={handleChange}
            accept="application/pdf"
            ref={refDoc}
          />
        </label>
      </div>
      <button className="btn">
        {isLoading ? "przetwarzanie ..." : "dodaj wpis"}
      </button>
      <p className="p-2">{status}</p>
    </form>
  );
};

export default AddEvent;
