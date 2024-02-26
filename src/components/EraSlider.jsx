import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const EraSlider = ({ setEra, era, ages, setData }) => {
  const changeEra = (e, value) => {
    setData(null);
    setEra(value);
  };

  return (
    <Box sx={{ width: "100%", marginLeft: "40px" }}>
      <Slider
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
