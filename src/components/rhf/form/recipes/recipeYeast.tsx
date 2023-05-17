import { useFieldArray, Control } from "react-hook-form";

// MUI
import Grid from "@mui/material/Grid"
import InputAutoCompleteRestfulOptions2 from "@components/rhf/input/AutoCompleteRestfullOptions2";
import InputTextField from "@components/rhf/input/TextField";

// UI
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type FormValuesRecipeYeast = {
  selected: {
    _id: string;
    yeastName: string;
  },
  quantity: number;

};

const RHFRecipeBodyYeast = (
  { control }: { control: Control<any> }
) => {

  const { fields: fieldsYeasts, append: appendYeast, remove: removeYeast } = useFieldArray({
    name: "yeasts",
    control
  });

  return (<>
    <Grid container>
      <Grid item xs={12} sx={{ marginTop: "1%" }}>
        <ControlPointDuplicateOutlinedIcon
          fontSize="large"
          type="button"
          onClick={() =>
            appendYeast(
              {
                selected: {
                  _id: "",
                  yeastName: ""
                },
                quantity: 0
              }
            )
          }
        />
      </Grid>
    </Grid>
    {fieldsYeasts.map((field, index: any) => {
      return (
        <Grid container key={field.id} spacing={1}>
          <Grid item xs={5}>
            <InputAutoCompleteRestfulOptions2
              control={control}
              index={index}
              field={field}
              name={`yeasts.${index}.selected`}
              label="Yeast Name"
              rules={{ required: false }}
              restfulCall="/api/Queries/Yeast/all"
              options={[]}
              objectLabel={"yeastName"}
            />
          </Grid>
          <Grid item xs={5}>
            <InputTextField
              control={control}
              name={`yeasts.${index}.quantity`}
              label="Quantity"
              rules={{ required: true }}
              type={"number"}
            />
          </Grid>
          <Grid item xs={1}>%</Grid>
          <Grid item xs={1} sx={{ marginTop: "1%", height: "70px" }}>
            <DeleteOutlineOutlinedIcon
              fontSize="large"
              type="button"
              onClick={() => removeYeast(index)}
            />
          </Grid>
        </Grid>
      )
    })}
  </>)
}

export default RHFRecipeBodyYeast