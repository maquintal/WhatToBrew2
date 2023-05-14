import { useFieldArray, Control } from "react-hook-form";

// Types
import { FormValuesMalt } from "@components/screens/Malt"

// MUI
import Grid from "@mui/material/Grid"
import InputAutoCompleteRestfulOptions2 from "@components/rhf/input/AutoCompleteRestfullOptions2";
import InputTextField from "@components/rhf/input/TextField";

// UI
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

export type FormValuesRecipeMalt = {
  selected: {
    _id: string;
    maltName: string;
  },
  quantity: number;

};

const RHFRecipeBodyMalt = (
  { control }: { control: Control<any> }
) => {

  const { fields: fieldsMalts, append: appendMalt, remove: removeMalt } = useFieldArray({
    name: "malts",
    control
  });

  return (<>
    <Grid container justifyContent="flex-end">
      <Grid item sx={{ marginTop: "1%" }}>
        <ControlPointDuplicateOutlinedIcon
          fontSize="large"
          type="button"
          onClick={() =>
            appendMalt(
              {
                selected: {
                  _id: "",
                  maltName: ""
                },
                quantity: 0
              }
            )
          }
        />
      </Grid>
    </Grid>
    {fieldsMalts.map((field, index: any) => {
      return (
        <Grid container key={field.id} spacing={1}>
          <Grid item xs={1} sx={{ marginTop: "1%", height: "70px" }}>
            <IndeterminateCheckBoxOutlinedIcon
              fontSize="large"
              type="button"
              onClick={() => removeMalt(index)}
            />
          </Grid>
          <Grid item xs={5}>
            <InputAutoCompleteRestfulOptions2
              control={control}
              index={index}
              field={field}
              name={`malts.${index}.selected`}
              label="Malt Name"
              rules={{ required: false }}
              restfulCall="/api/Queries/Malt/all"
              options={["Barley", "Wheat"]}
              objectLabel={"maltName"}
            />
          </Grid>
          <Grid item xs={4}>
            <InputTextField
              control={control}
              name={`malts.${index}.quantity`}
              label="Quantity"
              rules={{ required: true }}
              type={"number"}
            />
          </Grid>
          <Grid item xs={1}>%</Grid>

        </Grid>
      )
    })}
  </>)
}

export default RHFRecipeBodyMalt