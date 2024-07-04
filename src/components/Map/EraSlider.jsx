import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ages from "../../utils/ages";
import { Typography } from "@mui/material";

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
        sx={{ width: "85%" }}
        value={era}
        min={0}
        max={ages.length - 1}
        step={1}
        aria-label={"chuj"}
        marks={ages.map((age, index) => ({
          value: index,
          label: (
            <Typography component={"span"} fontSize={"9px"}>
              {age}
            </Typography>
          ),
        }))}
        onChange={changeEra}
        fontSize={"1px"}
      />
    </Box>
  );
};

export default EraSlider;
