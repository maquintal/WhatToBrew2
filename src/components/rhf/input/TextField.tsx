import TextField from "@mui/material/TextField"
import { useController } from "react-hook-form";

type ControlledTextField = {
  control: any;
  name: string;
  label: string;
  type: string;
  rules: {required: boolean};
}

const InputTextField = ({ control, name, label, type, rules }: ControlledTextField) => {
  const {
    field: { ...inputProps },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name,
    control,
    rules: {required: rules?.required},
  });

  const displayError = (isSubmitted && rules?.required !== false && inputProps.value === "") || false
  const displayHelperText = error ? `${inputProps.name} is required` : ""

  return (
    <TextField
      fullWidth
      {...inputProps}
      variant={"outlined"}
      label={label}
      type={type}
      error={displayError}
      helperText={displayHelperText}
      required={rules?.required !== false || false}
    />
  )
}

export default InputTextField