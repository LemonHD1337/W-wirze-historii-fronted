import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ages from "../../utils/ages";

const EraSlider = ({ era, setEra, setWaypoints, setMapId, setMap }) => {
  const changeEra = (e, value) => {
    setEra(value);
    setWaypoints(null);
    setMapId(null);
    setMap(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        sx={{ width: "80%" }}
        value={era}
        min={0}
        max={ages.length - 1}
        step={1}
        marks={ages.map((age, index) => ({
          value: index,
          label: age,
        }))}
        onChange={changeEra}
      />
    </Box>
  );
};

export default EraSlider;
