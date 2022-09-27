import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
} from "@material-ui/core";

const renderField = ({
  label,
  input,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => {
  switch (type) {
    case "search":
      return (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          autoComplete="on"
        >
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label={label}
            type={type}
            InputLabelProps={{ shrink: true }}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
          />
        </Box>
      );
    case "text":
      return (
        <TextField
          required
          fullWidth
          label={label}
          type={type}
          InputLabelProps={{ shrink: true }}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      );
    case "date":
      return (
        <TextField
          required
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          label={label}
          type={type}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      );

    case "radios":
      return (
        <FormControl
          {...input}
          {...custom}
          label={label}
          type={type}
          error={touched && invalid}
          helperText={touched && error}
        >
          <FormLabel id="demo-controlled-radio-buttons-group">Φύλο</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel
              value="Γυναίκα"
              control={<Radio />}
              label="Γυναίκα"
            />
            <FormControlLabel
              value="Άνδρας"
              control={<Radio />}
              label="Άνδρας"
            />
          </RadioGroup>
        </FormControl>
      );

    case "select":
      return (
        <FormControl
          {...input}
          {...custom}
          label={label}
          type={type}
          error={touched && invalid}
          helperText={touched && error}
        >
          <InputLabel id="demo-simple-select-label">Εθνικότητα</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="nationality"
          >
            <MenuItem value="ΕΛΛΗΝ">ΕΛΛΗΝ</MenuItem>
            <MenuItem value="ΒΑΡΒΑΡΟΣ">ΒΑΡΒΑΡΟΣ</MenuItem>
          </Select>
        </FormControl>
      );

    case "company":
      return (
        <FormControl
          {...input}
          {...custom}
          label={label}
          type={type}
          error={touched && invalid}
          helperText={touched && error}
        >
          <InputLabel id="demo-simple-select-label">Εταιρεία</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="company"
          >
            {custom.customProps &&
              custom.customProps.map((element) => (
                <MenuItem value={element.id}>{element.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      );
  }
};

export default renderField;
