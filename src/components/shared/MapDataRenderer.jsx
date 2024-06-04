import Card from "./Card";

const MapDataRenderer = ({ data, type = null }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 w-11/12">
      {data.map(element => (
        <Card key={element.id} data={element} type={type} />
      ))}
    </div>
  );
};

export default MapDataRenderer;
