import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import InputAutoComplete from "@components/rhf/input/AutoComplete";
import SimpleSnackbar from "@components/layout/snackbar";
import poster from "@config/poster";
import Grid from "@mui/material/Grid";
import RHFMiscBody from "@components/rhf/form/Misc";

export type FormValuesMiscellaneous = {
  miscellaneousName: string;
  miscellaneousType: string;
};

const Miscellaneous = () => {
  const { handleSubmit, control, getValues } = useForm<FormValuesMiscellaneous>({
    defaultValues: {
      miscellaneousName: "",
      miscellaneousType: ""
    },
    mode: "onChange",
  });

  const [ready, setReady] = useState(false);
  const [state, setState] = useState({});
  const [snackbarState, setSnackbarState] = useState(false);

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/Miscellaneous/insertOne", JSON.stringify(control._formValues)]
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

  const onSubmit = async (data: FormValuesMiscellaneous) => {
    // console.log(data);
    // console.log(control);
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };


  return (
    <form>
      <Grid container spacing={1}>
        <RHFMiscBody control={control} />
        <Grid item xs={12}>
          <DialogActions>
            <Button variant="contained" onClick={showForm}>
              Form Data
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Add Misc
            </Button>
          </DialogActions>
        </Grid>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        {snackbarState ? <SimpleSnackbar /> : null}
      </Grid>
    </form>
  );
};

export default Miscellaneous;
