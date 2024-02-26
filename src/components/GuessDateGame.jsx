import Loading from "./Loading";

const GuessDateGame = ({ data, handleChange, handleClick, result, setNext, next }) => {
  if (!data) {
    return <Loading />;
  }

  return (
    <div className="guess-date-container-game">
      <div className="guess-date-info">
        <h2>Informacje o grze</h2>
        <p>W tej grze trzeba podać datę wydarzenia podanego poniżej: </p>
      </div>

      <h1>{data.title}</h1>

      <div className="inputs-container">
        <div>
          <input type="text" placeholder="dzień" name="day" onChange={handleChange} />
        </div>

        <div>
          <input type="text" placeholder="miesiąc" name="month" onChange={handleChange} />
        </div>

        <div>
          <input type="text" placeholder="rok" name="year" onChange={handleChange} />
        </div>
      </div>

      <div className="btn-container-guess-date">
        <button onClick={handleClick}>Sprawdź</button>
        <button onClick={(e) => setNext(next++)}>Następne</button>
      </div>

      <div className="result-guess-date">
        <p>{result}</p>
      </div>
    </div>
  );
};

export default GuessDateGame;
