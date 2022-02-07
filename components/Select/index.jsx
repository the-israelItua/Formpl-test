import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Icon from "components/Icons";

export default function BasicSelect({ label, options, onChange, reset }) {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (event) => {
    setSelected(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    if (reset) setSelected(options[0]);
  }, [reset]);

  return (
    <Box sx={{ height: "19px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: "0.875em" }}>
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label={label}
          onChange={handleChange}
          native={false}
          variant="outlined"
          IconComponent={() => (
            <div className="margin-right-15">
              <Icon id="DropdownIcon" />
            </div>
          )}
          sx={{
            height: "39px",
            outline: "none",
            fontSize: "0.875em",
            color: "#3F3F3F",
          }}
        >
          {options.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
