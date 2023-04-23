import * as React from 'react';
import { useForm } from "react-hook-form";
import useSWR, { SWRResponse } from "swr";

// MUI
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// CUSTOM
import InputTextField from "@components/rhf/input/TextField";
import DialogActions from "@mui/material/DialogActions";
import InputAutoComplete from "@components/rhf/input/AutoComplete";
import SimpleSnackbar from "@components/layout/snackbar";
import InputAutoCompleteRestfulOptions from "@components/rhf/input/AutoCompleteRestfullOptions";
import poster from "@config/poster";

import { FormValuesMalt } from '../form/Malt';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: any;
  onClose: any; //(value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const [ready, setReady] = React.useState(false);
  const [state, setState] = React.useState({});
  const [snackbarState, setSnackbarState] = React.useState(false);

  // const { data, error, mutate } = useSWR(
  //   ready
  //     ? ["POST", "/api/Mutations/Malt/insertOne", JSON.stringify(control._formValues)]
  //     : null,
  //   poster, {
  //   onSuccess: (data, key, config) => {
  //     console.log({ data }); //this always prints "undefined"
  //     //  data = data;
  //     //  error = error;
  //     setSnackbarState(true)
  //   }
  // }
  // );

  const { handleSubmit, control, getValues } = useForm<FormValuesMalt>({
    defaultValues: {
      maltName: selectedValue.row.maltName,
      cerealType: selectedValue.row.cerealType,
      // substitute: [selectedValue?.row?.substitute]
    },
    mode: "onChange",
  });

  const showForm = () => {
    setState(getValues())
  }

  const onSubmit = async (data: FormValuesMalt) => {
    // console.log(data);
    // console.log(control);
    await setReady(true);
    // ready ? mutate() : null;
    setReady(false);
  };

  console.log(Object.keys(selectedValue))

  return (
    <Dialog onClose={onClose} open={Object.keys(selectedValue).length > 0}>
      <DialogTitle>Set backup account</DialogTitle>
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
    </Dialog>
  );
}

export default SimpleDialog