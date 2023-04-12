import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import SimpleSnackbar from "@components/layout/snackbar";
import InputAutoCompleteRestfulOptions from "@components/rhf/input/AutoCompleteRestfullOptions";
import poster from "@config/poster";
import Grid from "@mui/material/Grid";

export type FormValuesHop = {
  hopName: string;
  substitute: any[];
};

const Hop = () => {
  const { handleSubmit, control, getValues } = useForm<FormValuesHop>({
    defaultValues: {
      hopName: "",
      substitute: []
    },
    mode: "onChange",
  });

  const [ready, setReady] = useState(false);
  const [state, setState] = useState({});
  const [snackbarState, setSnackbarState] = useState(false);

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/Hop/insertOne", JSON.stringify(control._formValues)]
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

  const onSubmit = async (data: FormValuesHop) => {
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
            name="hopName"
            label="Hop"
            rules={{ required: true }}
            type={""}
          />
        </Grid>
        <Grid item xs={12}>
          <InputAutoCompleteRestfulOptions
            control={control}
            name="substitute"
            label="Substitute(s)"
            rules={{ required: false }}
            restfulCall="/api/Queries/Hop/all"
            options={[]}
            objectLabel={"hopName"}
          />
        </Grid>
        <Grid item xs={12}>
          <DialogActions>
            <Button variant="contained" onClick={showForm}>
              Form Data
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Add Hop
            </Button>
          </DialogActions>
        </Grid>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        {snackbarState ? <SimpleSnackbar /> : null}
      </Grid>
    </form>
  );
};

export default Hop;
