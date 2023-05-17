import { Control } from "react-hook-form"

// Types
import { FormValuesMiscellaneous } from "@components/screens/Misc"

// RHF
import InputTextField from "@components/rhf/input/TextField"

// MUI
import Grid from "@mui/material/Grid"

const RHFMiscBody = (
  { control }: { control: Control<FormValuesMiscellaneous> }
) => {
  return (<>
    <Grid item xs={12}>
      <InputTextField
        control={control}
        name="miscName"
        label="Miscellaneous Name"
        rules={{ required: true }}
        type={""}
      />
    </Grid><Grid item xs={12}>
      <InputTextField
        control={control}
        name="miscType"
        label="Miscellaneous Type"
        rules={{ required: true }}
        type={""}
      />
    </Grid>
  </>)
}

export default RHFMiscBody