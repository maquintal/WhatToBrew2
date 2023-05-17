import { useFieldArray, Control } from "react-hook-form";

// MUI
import Grid from "@mui/material/Grid"
import InputAutoCompleteRestfulOptions2 from "@components/rhf/input/AutoCompleteRestfullOptions2";
import InputTextField from "@components/rhf/input/TextField";

// UI
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type FormValuesRecipeMisc = {
  selected: {
    _id: string;
    miscName: string;
  },
  quantity: number;

};

const RHFRecipeBodyMisc = (
  { control }: { control: Control<any> }
) => {

  const { fields: fieldsMiscs, append: appendMisc, remove: removeMisc } = useFieldArray({
    name: "miscs",
    control
  });

  return (<>
    <Grid container>
      <Grid item xs={12} sx={{ marginTop: "1%" }}>
        <ControlPointDuplicateOutlinedIcon
          fontSize="large"
          type="button"
          onClick={() =>
            appendMisc(
              {
                selected: {
                  _id: "",
                  miscName: ""
                },
                quantity: 0
              }
            )
          }
        />
      </Grid>
    </Grid>
    {fieldsMiscs.map((field, index: any) => {
      return (
        <Grid container key={field.id} spacing={1}>
          <Grid item xs={5}>
            <InputAutoCompleteRestfulOptions2
              control={control}
              index={index}
              field={field}
              name={`miscs.${index}.selected`}
              label="Misc Name"
              rules={{ required: false }}
              restfulCall="/api/Queries/Misc/all"
              options={[]}
              objectLabel={"miscName"}
            />
          </Grid>
          <Grid item xs={5}>
            <InputTextField
              control={control}
              name={`miscs.${index}.quantity`}
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
              onClick={() => removeMisc(index)}
            />
          </Grid>
        </Grid>
      )
    })}
  </>)
}

export default RHFRecipeBodyMisc