import useGuessDateAddLogic from "../../../hooks/useGuessDateAddLogic";
import Loading from "../../shared/Loading";

const GuessDateAdd = () => {
  const {
    isUpdating,
    handleChange,
    handleSubmit,
    title,
    day,
    year,
    status,
    month,
  } = useGuessDateAddLogic();

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="addContent-h1">Dodaj nową datę!</h1>
      <p>Miesiąc należy podać w formie liczbowej</p>
      <div className="div-input">
        <input
          type="text"
          placeholder="Tytuł"
          name="title"
          value={title}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="dzień"
          name="day"
          value={day}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="miesiąc"
          value={month}
          name="month"
          onChange={handleChange}
          className="input"
        />
      </div>
      <div className="div-input">
        <input
          type="text"
          placeholder="rok"
          name="year"
          value={year}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div>
        <button className="btn m-2">
          {isUpdating ? <Loading /> : "Dodaj treść"}
        </button>
      </div>
      <p>{status}</p>
    </form>
  );
};

export default GuessDateAdd;
