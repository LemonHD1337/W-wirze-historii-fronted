import Warning from "../shared/Warning";

const MapSelect = ({ defaultValue, onChange, data, map }) => {
  if (data.length === 0) return <Warning message={"brak danych"} />;

  return (
    <select className="input m-2" onChange={onChange} value={map}>
      <option value={defaultValue}>{defaultValue}</option>
      {data.map(element => {
        return (
          <option key={element.id} value={element.imageURL}>
            {element.title}
          </option>
        );
      })}
    </select>
  );
};

export default MapSelect;
