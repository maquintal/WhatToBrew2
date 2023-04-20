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
  malts2: [
    {
      selected: {
        _id: string;
        maltName: string;
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
      malts2: [
        {
          selected: {
            _id: "",
            maltName: ""
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

  const { fields, append, remove } = useFieldArray({
    name: "malts",
    control
  });

  const { fields2, append: append2, remove: remove2 } = useFieldArray({
    name: "malts2",
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
      <Grid container>
        {fields.map((field, index) => {
          return (
            <Grid container key={field.id} spacing={1}>
              <Grid item xs={1} sx={{ marginTop: "1%", height: "60px" }}>
                {fields.length > 1 && (
                  <IndeterminateCheckBoxOutlinedIcon
                    fontSize="large"
                    type="button"
                    onClick={() => remove(index)}
                  />
                )}
              </Grid>
              <Grid item xs={2}>
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
              <Grid item xs={2}>
                <InputTextField
                  control={control}
                  name={`malts.${index}.quantity`}
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
                    append(
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
              <Grid item xs={6}>
                <RecipeReviewCard
                  buddy={
                    <Grid container key={field.id} spacing={1}>
                      <Grid item xs={1} sx={{ marginTop: "1%", height: "60px" }}>
                        {fields.length > 1 && (
                          <IndeterminateCheckBoxOutlinedIcon
                            fontSize="large"
                            type="button"
                            onClick={() => remove(index)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        <InputAutoCompleteRestfulOptions2
                          control={control}
                          index={index}
                          field={field}
                          name={`malts2.${index}.selected`}
                          label="Malt Name"
                          rules={{ required: false }}
                          restfulCall="/api/Queries/Malt/all"
                          options={["Barley", "Wheat"]}
                          objectLabel={"maltName"}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <InputTextField
                          control={control}
                          name={`malts2.${index}.quantity`}
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
                            append(
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
                  }
                />
              </Grid>
            </Grid>
          );
        })}
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

    </form>
  );
};

export default Recipe;
