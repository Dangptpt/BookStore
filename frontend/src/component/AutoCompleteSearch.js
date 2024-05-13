import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function AutoComplete({ optionList, onChange, width }) {
  return (
    <Autocomplete
      disablePortal
      autoHighlight
      options={optionList}
      getOptionLabel={(option) => option.name}
      onChange={onChange ? onChange : ''}
      sx={{
        "& .MuiAutocomplete-input": {
          fontSize: '20px',
        },
        width: width ? width : 350,
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.name} (số lượng: {option.quantity})
        </Box>
      )}
      renderInput={(params) => <TextField {...params}  required={true} />}
    />
  );
}