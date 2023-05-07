import { Control } from "react-hook-form"

// Types
import { FormValuesMalt } from "@components/screens/Malt"

// RHF
import InputTextField from "@components/rhf/input/TextField"

// MUI
import Grid from "@mui/material/Grid"
import InputAutoComplete from "@components/rhf/input/AutoComplete";
import InputAutoCompleteRestfulOptions from "@components/rhf/input/AutoCompleteRestfullOptions";

const RHFMaltBody = (
  { control }: { control: Control<FormValuesMalt> }
) => {
  return (<>
    <Grid item xs={12}>
      <InputTextField
        control={control}
        name="maltName"
        label="Malt"
        rules={{ required: true }}
        type={""}
      />
    </Grid>
    <Grid item xs={12}>
      <InputAutoComplete
        control={control}
        name="cerealType"
        label="Cereal"
        rules={{ required: true }}
        options={["Barley", "Wheat"]}
      />
    </Grid>
    <Grid item xs={12}>
      <InputAutoCompleteRestfulOptions
        control={control}
        name="substitute"
        label="Substitute(s)"
        rules={{ required: false }}
        restfulCall="/api/Queries/Malt/all"
        options={["Barley", "Wheat"]}
        objectLabel={"maltName"}
      />
    </Grid>
  </>)
}

export default RHFMaltBody