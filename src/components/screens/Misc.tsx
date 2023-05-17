import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import SimpleSnackbar from "@components/layout/snackbar";
import poster from "@config/poster";
import Grid from "@mui/material/Grid";
import RHFMiscBody from "@components/rhf/form/ingredients/Misc";

export type FormValuesMiscellaneous = {
  miscName: string;
  miscType: string;
};

const Miscellaneous = () => {
  const { handleSubmit, control, getValues } = useForm<FormValuesMiscellaneous>({
    defaultValues: {
      miscName: "",
      miscType: ""
    },
    mode: "onChange",
  });

  const [ready, setReady] = useState(false);
  const [state, setState] = useState({});
  const [snackbarState, setSnackbarState] = useState(false);

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/Misc/insertOne", JSON.stringify(control._formValues)]
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
