import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import InputAutoComplete from "@components/rhf/input/AutoComplete";
import SimpleSnackbar from "@components/layout/snackbar";
import InputAutoCompleteRestfulOptions from "@components/rhf/input/AutoCompleteRestfullOptions";
import poster from "@config/poster";
import Grid from "@mui/material/Grid";

export type FormValuesMalt = {
  maltName: string;
  cerealType: string;
  substitute: any[];
};

const Malt = () => {
  const { handleSubmit, control, getValues } = useForm<FormValuesMalt>({
    defaultValues: {
      maltName: "",
      cerealType: "Barley",
      substitute: []
    },
    mode: "onChange",
  });

  const [ready, setReady] = useState(false);
  const [state, setState] = useState({});
  const [snackbarState, setSnackbarState] = useState(false);

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/Malt/insertOne", JSON.stringify(control._formValues)]
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

  const onSubmit = async (data: FormValuesMalt) => {
    // console.log(data);
    // console.log(control);
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };


  return (
    <form>
      <Grid container spacing={1}>
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
        <Grid item xs={12}>
          <DialogActions>
            <Button variant="contained" onClick={showForm}>
              Form Data
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Add Malt
            </Button>
          </DialogActions>
        </Grid>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        {snackbarState ? <SimpleSnackbar /> : null}
      </Grid>
    </form>
  );
};

export default Malt;
