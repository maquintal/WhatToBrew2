import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSWR from "swr";

import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import InputAutoComplete from "@components/rhf/input/AutoComplete";
import SimpleSnackbar from "@components/layout/snackbar";
import InputAutoCompleteRestfulOptions2 from "@components/rhf/input/AutoCompleteRestfullOptions2";
import poster from "@config/poster";
import Grid from "@mui/material/Grid";

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import RecipeReviewCard from "@components/rhf/surfaces/cardIngredients";
import InputAdornment from "@mui/material/InputAdornment";

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
  // maltName: string;
  // cerealType: string;
  // substitute: any[];
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
      // maltName: "",
      // cerealType: "Barley",
      // substitute: []
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
      console.log({ data }); //this always prints "undefined"
      //  data = data;
      //  error = error;
      setSnackbarState(true)
    }
  }
  );

  const showForm = () => {
    setState(getValues())
  }

  const onSubmit = async (data: FormValuesRecipe) => {
    // console.log(data);
    // console.log(control);
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };


  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <RecipeReviewCard
            title={"Matls"}
            buddy={<>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ marginTop: "1%" }}>
                  <AddBoxOutlinedIcon
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
              })
              }
            </>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <RecipeReviewCard
            buddy={
              fieldsHops.map((field, index: any) => {
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
                    <Grid item xs={6}>
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
                    <Grid item xs={1} sx={{ marginTop: "1%" }}>
                      <AddBoxOutlinedIcon
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
                )
              })
            }
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
