import EraSlider from "./EraSlider";

const MapFilters = ({
  setEra,
  era,
  ages,
  data,
  setMap,
  setSource,
  setData,
  setMapId,
}) => {
  return (
    <div className="text-center w-full">
      <p>Filtry</p>
      <EraSlider setEra={setEra} era={era} ages={ages} setData={setData} />
      <p>Mapy</p>
      <select
        className="input m-2"
        onChange={(e) => {
          setMap(e.target.value);
          data.forEach((element) => {
            if (e.target.value === element.imageURL) {
              setMapId(element.id);
              setSource(element.source);
            }
          });
        }}>
        <option value={null}>Wybierz mape</option>
        {data.map((element) => {
          return (
            <option key={element.id} value={element.imageURL} source={element.source}>
              {element.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MapFilters;
