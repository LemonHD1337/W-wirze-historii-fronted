import Loading from "./Loading";

const GuessDateGame = ({ data, handleChange, handleClick, result, setNext, next }) => {
  if (!data) {
    return <Loading />;
  }

  return (
    <div className="p-5 text-center">
      <div className="guess-date-info">
        <h2 className="font-bold text-2xl">Informacje o grze</h2>
        <p className="text">W tej grze trzeba podać datę wydarzenia podanego poniżej: </p>
      </div>

      <h1 className="font-bold text-2xl my-2">{data.title}</h1>

      <div className="w-full h-full flex justify-center md:flex-col">
        <div className="div-input">
          <input
            type="text"
            placeholder="dzień"
            name="day"
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="div-input">
          <input
            type="text"
            placeholder="miesiąc"
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
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div>
        <button onClick={handleClick} className="btn m-2">
          Sprawdź
        </button>
        <button onClick={(e) => setNext(next++)} className="btn m-2">
          Następne
        </button>
      </div>

      <div className="result-guess-date">
        <p>{result}</p>
      </div>
    </div>
  );
};

export default GuessDateGame;
