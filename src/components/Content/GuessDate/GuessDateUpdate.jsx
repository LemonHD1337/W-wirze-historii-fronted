import useGuessDateUpdateLogic from "../../../hooks/useGuessDateUpdateLogic";
import Loading from "../../shared/Loading";

const GuessDateUpdate = ({ id }) => {
  const {
    isLoading,
    isUpdating,
    day,
    title,
    month,
    year,
    handleChange,
    status,
    handleSubmit,
  } = useGuessDateUpdateLogic(id);

  if (!id || id === 0) return null;
  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="addContent-h1">Edytowanie!</h1>
      <div className="div-input">
        <input
          className="input"
          type="text"
          value={title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          name="day"
          value={day}
          onChange={handleChange}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          name="month"
          value={month}
          onChange={handleChange}
        />
      </div>
      <div className="div-input">
        <input
          className="input"
          type="text"
          name="year"
          value={year}
          onChange={handleChange}
        />
      </div>
      <p className="addContent-p">Czy na pewno chcesz zmodyfikować dane?</p>
      <button className="btn">
        {isUpdating ? "przetwarzanie... " : "Tak, zmodyfikuj"}
      </button>
      <p className="p-2">{status}</p>
    </form>
  );
};

export default GuessDateUpdate;
