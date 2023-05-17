import { useFieldArray, Control } from "react-hook-form";

// MUI
import Grid from "@mui/material/Grid"
import InputAutoCompleteRestfulOptions2 from "@components/rhf/input/AutoCompleteRestfullOptions2";
import InputTextField from "@components/rhf/input/TextField";

// UI
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type FormValuesRecipeHop = {
  selected: {
    _id: string;
    hopName: string;
  },
  quantity: number;
}


const RHFRecipeBodyHop = (
  { control }: { control: Control<any> }
) => {

  const { fields: fieldsHops, append: appendHop, remove: removeHop } = useFieldArray({
    name: "hops",
    control
  });

  return (<>
    <Grid container>
      <Grid item xs={12} sx={{ marginTop: "1%" }}>
        <ControlPointDuplicateOutlinedIcon
          fontSize="large"
          type="button"
          onClick={() =>
            appendHop(
              {
                selected: {
                  _id: "",
                  hopName: ""
                },
                quantity: 0
              }
            )
          }
        />
      </Grid>
    </Grid>
    {fieldsHops.map((field, index: any) => {
      return (
        <Grid container key={field.id} spacing={1}>
          <Grid item xs={5}>
            <InputAutoCompleteRestfulOptions2
              control={control}
              index={index}
              field={field}
              name={`hops.${index}.selected`}
              label="Hop Name"
              rules={{ required: false }}
              restfulCall="/api/Queries/Hop/all"
              options={[]}
              objectLabel={"hopName"}
            />
          </Grid>
          <Grid item xs={5}>
            <InputTextField
              control={control}
              name={`hops.${index}.quantity`}
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
              onClick={() => removeHop(index)}
            />
          </Grid>
        </Grid>
      )
    })}
  </>)
}

export default RHFRecipeBodyHop