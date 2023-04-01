import fetcher from "@config/fetcher";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"
import React from "react";
import { useController } from "react-hook-form";
import useSWR from "swr";

type ControlledAutoComplete = {
  control: any;
  name: string;
  label: string;
  rules: { required: boolean };
  options: string[];
  restfulCall: string;
}

const InputAutoComplete2 = ({ control, name, label, rules, restfulCall, options }: ControlledAutoComplete) => {

  const [options2, setOptions2] = React.useState([]);

  const getOptions = async () => {
    const result = await fetcher("GET", `${restfulCall}`)
    setOptions2(result?.data)
  }

  React.useEffect(() => {
    getOptions()
  }, [])

  const {
    field: { ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name,
    control,
    rules: { required: rules?.required }
  });

  return (
    <Autocomplete
      {...inputProps}
      onChange={(e, newValue) => {
        inputProps.onChange(newValue);
      }}
      options={options2}
      isOptionEqualToValue={(option, value) =>
        option._id === value._id
      }
      getOptionLabel={(option) => option?.maltName}
      multiple={true}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant={"outlined"}
          label={label}
          error={error && error !== undefined || false}
          helperText={error ? `${inputProps.name} is required` : ""}
          required={rules?.required !== false || false}
        />
      )}
    />
  )
}

export default InputAutoComplete2