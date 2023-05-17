import { Control } from "react-hook-form"

// Types
import { FormValuesYeast } from "@components/screens/Yeast";

// RHF
import InputTextField from "@components/rhf/input/TextField"

// MUI
import Grid from "@mui/material/Grid"
import InputAutoComplete from "@components/rhf/input/AutoComplete";

const RHFYeastBody = (
  { control }: { control: Control<FormValuesYeast> }
) => {
  return (<>
    <Grid item xs={12}>
      <InputTextField
        control={control}
        name="yeastName"
        label="Yeast"
        rules={{ required: true }}
        type={""}
      />
    </Grid>
    <Grid item xs={12}>
      <InputAutoComplete
        control={control}
        name="yeastType"
        label="Ale"
        rules={{ required: true }}
        options={["Ale", "Lager"]}
      />
    </Grid>
  </>)
}

export default RHFYeastBody