import * as React from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSWR from "swr";

// Custom Tools
import poster from "@config/poster";

// Cutom
import RecipeReviewCard from "@components/screens/surfaces/cardIngredients";
import InputAutoCompleteRestfulOptions2 from "@components/rhf/input/AutoCompleteRestfullOptions2";
import InputTextField from "@components/rhf/input/TextField";

// UI
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Grid from "@mui/material/Grid";
import SimpleSnackbar from "@components/layout/snackbar";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

export type FormValuesRecipe = {
  malts: [
    {
      selected: {
        _id: string;
        maltName: string;
      },
      quantity: number;
    }
  ],
  hops: [
    {
      selected: {
        _id: string;
        hopName: string;
      },
      quantity: number;
    }
  ]
};

const Recipe = () => {
  const { handleSubmit, control, getValues } = useForm<FormValuesRecipe>({
    defaultValues: {
      malts: [
        {
          selected: {
            _id: "",
            maltName: ""
          },
          quantity: 0
        }
      ],
      hops: [
        {
          selected: {
            _id: "",
            hopName: ""
          },
          quantity: 0
        }
      ]
    },
    mode: "onChange",
  });

  const { fields: fieldsMalts, append: appendMalt, remove: removeMalt } = useFieldArray({
    name: "malts",
    control
  });

  const { fields: fieldsHops, append: appendHop, remove: removeHop } = useFieldArray({
    name: "hops",
    control
  });

  const [ready, setReady] = useState(false);
  const [state, setState] = useState({});
  const [snackbarState, setSnackbarState] = useState(false);

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/Recipe/insertOne", JSON.stringify(control._formValues)]
      : null,
    poster, {
    onSuccess: (data, key, config) => {
      setSnackbarState(true)
    }
  }
  );

  const showForm = () => {
    setState(getValues())
  }

  const onSubmit = async (data: FormValuesRecipe) => {
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };


  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <RecipeReviewCard
            title={"Custom Title"}
            body={<>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ marginTop: "1%" }} justifyContent="flex-end">
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
                        options={[]}
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
            </>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <RecipeReviewCard
            body={<>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ marginTop: "1%" }}>
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
                {fieldsHops.map((field, index: any) => {
                  return (
                    <Grid container key={field.id} spacing={1}>
                      <Grid item xs={1} sx={{ marginTop: "1%", height: "70px" }}>
                        {fieldsHops.length > 1 && (
                          <IndeterminateCheckBoxOutlinedIcon
                            fontSize="large"
                            type="button"
                            onClick={() => removeHop(index)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={5}>
                        <InputAutoCompleteRestfulOptions2
                          control={control}
                          index={index}
                          field={field}
                          name={`hops.${index}.selected`}
                          label="Hop Name"
                          rules={{ required: false }}
                          restfulCall="/api/Queries/Hop/all"
                          options={["Barley", "Wheat"]}
                          objectLabel={"hopName"}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputTextField
                          control={control}
                          name={`hops.${index}.quantity`}
                          label="Quantity"
                          rules={{ required: true }}
                          type={"number"}
                        />
                      </Grid>
                    </Grid>
                  )
                })}
              </Grid>
            </>}
          />
        </Grid>
        <Grid item xs={12}>
          <DialogActions>
            <Button variant="contained" onClick={showForm}>
              Form Data
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Add Yeast
            </Button>
          </DialogActions>
        </Grid>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        {snackbarState ? <SimpleSnackbar /> : null}
      </Grid>

    </form >
  );
};

export default Recipe;
