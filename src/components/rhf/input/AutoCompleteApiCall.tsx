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

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
]

const InputAutoCompleteRestful = async (
  { control, name, label, rules, options, restfulCall }: ControlledAutoComplete) => {

    // const [ready, setReady] = React.useState(true);
    // const [options, setOptions] = React.useState([]);
    // mutate()
  const {
    field: { ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name,
    control,
    rules: { required: rules?.required },
  });

  // const { data, errorSwr, mutate } = useSWR(
  //   // ready
  //     // ? 
  //     ["GET", `${restfulCall}`],
  //     // : null,
  //   fetcher, {
  //     onSuccess: (data, key, config) => {
  //       console.log({ data });
  //       // setOptions(data)
  //       setReady(false)
  //     }
  //   }
  // );

  // const [options, setOptions] = React.useState([])

  return (
    <Autocomplete
      {...inputProps}
      onChange={(e, newValue) => {
        inputProps.onChange(newValue);
      }}
      options={options}
      // isOptionEqualToValue={(option, value) =>
        // console.log(`${option} --- ${value}`)
        // option?.label === value?.label
      // }
      getOptionLabel={(option) => option}
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

export default InputAutoCompleteRestful