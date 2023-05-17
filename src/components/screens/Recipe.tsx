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
import RHFRecipeBodyMalt, { FormValuesRecipeMalt } from "@components/rhf/form/recipes/recipeMalt";
import RHFRecipeBodyHop, { FormValuesRecipeHop } from "@components/rhf/form/recipes/recipeHop";

// UI
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import Grid from "@mui/material/Grid";
import SimpleSnackbar from "@components/layout/snackbar";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import RHFRecipeBodyYeast, { FormValuesRecipeYeast } from "@components/rhf/form/recipes/recipeYeast";
import RHFRecipeBodyMisc, { FormValuesRecipeMisc } from "@components/rhf/form/recipes/recipeMisc";


export type FormValuesRecipe = {
  malts: FormValuesRecipeMalt[],
  hops: FormValuesRecipeHop[],
  yeasts: FormValuesRecipeYeast[],
  miscs: FormValuesRecipeMisc[]
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
      ],
      yeasts: [
        {
          selected: {
            _id: "",
            yeastName: ""
          },
          quantity: 0
        }
      ],
      miscs: [
        {
          selected: {
            _id: "",
            miscName: ""
          },
          quantity: 0
        }
      ]
    },
    mode: "onChange",
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
            title={"Custom Title - Malt"}
            body={<RHFRecipeBodyMalt control={control} />}
          />
        </Grid>
        <Grid item xs={6}>
          <RecipeReviewCard
            title={"Custom Title - Hop"}
            body={<RHFRecipeBodyHop control={control} />}
          />
        </Grid>
        <Grid item xs={6}>
          <RecipeReviewCard
            title={"Custom Title - Yeast"}
            body={<RHFRecipeBodyYeast control={control} />}
          />
        </Grid>
        <Grid item xs={6}>
          <RecipeReviewCard
            title={"Custom Title - Misc"}
            body={<RHFRecipeBodyMisc control={control} />}
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
