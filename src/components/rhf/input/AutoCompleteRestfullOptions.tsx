import fetcher from "@config/fetcher";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField"
import React from "react";
import { useController } from "react-hook-form";

type ControlledAutoComplete = {
  control: any;
  name: string;
  label: string;
  rules: { required: boolean };
  restfulCall: string;
  options: string[];
  objectLabel: string;
}

const InputAutoCompleteRestfulOptions = ({ control, name, label, rules, restfulCall, options, objectLabel }: ControlledAutoComplete) => {

  const [optionsRestful, setOptionsRestful] = React.useState([]);

  const getOptions = async () => {
    const restCallResult = await fetcher("GET", `${restfulCall}`)
    setOptionsRestful(restCallResult?.data)
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

        const customOutput = newValue.map((item) => {

          let propsKey = item?.[`${objectLabel}`]
          const { _id, } = item

          return { _id, [`${objectLabel}`]: propsKey }
        })

        inputProps.onChange(customOutput);
        // inputProps.onChange(newValue); // whole object
      }}
      options={optionsRestful}
      isOptionEqualToValue={(option, value) =>
        option._id === value._id
      }
      getOptionLabel={(option) => option?.[`${objectLabel}`]}
      // filterOptions={(selected) => selected}
      filterSelectedOptions
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

export default InputAutoCompleteRestfulOptions