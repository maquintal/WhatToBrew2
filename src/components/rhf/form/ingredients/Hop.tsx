import { Control } from "react-hook-form"

// Types
import { FormValuesHop } from "@components/screens/Hop"

// RHF
import InputTextField from "@components/rhf/input/TextField"

// MUI
import Grid from "@mui/material/Grid"
import InputAutoCompleteRestfulOptions from "@components/rhf/input/AutoCompleteRestfullOptions";

const RHFHopBody = (
  { control }: { control: Control<FormValuesHop> }
) => {
  return (<>
    <Grid item xs={12}>
      <InputTextField
        control={control}
        name="hopName"
        label="Hop"
        rules={{ required: true }}
        type={""}
      />
    </Grid>
    <Grid item xs={12}>
      <InputAutoCompleteRestfulOptions
        control={control}
        name="substitute"
        label="Substitute(s)"
        rules={{ required: false }}
        restfulCall="/api/Queries/Hop/all"
        options={[]}
        objectLabel={"hopName"}
      />
    </Grid>
  </>)
}

export default RHFHopBody