import * as React from 'react';
import { useForm } from "react-hook-form";
import useSWR from "swr";

// MUI
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// CUSTOM
import DialogActions from "@mui/material/DialogActions";
import SimpleSnackbar from "@components/layout/snackbar";
import poster from "@config/poster";

import DialogContent from '@mui/material/DialogContent';
import { FormValuesMalt } from '@components/screens/Malt';
import RHFMaltBody from '@components/rhf/form/ingredients/Malt';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: any;
  onClose: () => void;
  dialogTitle: string;
  refetch: () => void;
}

export type IngredientState = {
  _id: string;
  update: any;
  collection: string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, dialogTitle, refetch } = props;

  const [ready, setReady] = React.useState(false);

  const [snackbarState, setSnackbarState] = React.useState(false);

  const { handleSubmit, control, getValues } = useForm<FormValuesMalt>({
    defaultValues: {
      maltName: selectedValue.row.maltName,
      cerealType: selectedValue.row.cerealType,
      substitute: selectedValue?.row?.substitute
    },
    mode: "onChange",
  });

  const [state, setState] = React.useState({
    _id: selectedValue.id,
    update: getValues(),
    collection: `malts`
  });

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/modifiesAnExistingDocument", JSON.stringify(state)]
      : null,
    poster, {
    onSuccess: async (data, key, config) => {
      setSnackbarState(true)
      refetch()
      setTimeout(() => {
        onClose()
      }, 1000)
    }
  }
  );

  const showForm = () => {
    setState({ ...state, update: getValues() })
  }

  const onSubmit = async (data: FormValuesMalt) => {
    setState(Object.assign(state, { update: data }))
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };

  return (
    <Dialog
      onClose={onClose}
      open={Object.keys(selectedValue).length > 0}
      maxWidth={'md'}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <form>
          <Grid
            container
            spacing={1}
            sx={{ pt: 1 }}
          >
            <RHFMaltBody control={control} />
            <Grid item xs={12}>
              <DialogActions>
                <Button variant="contained" onClick={showForm}>
                  Form Data
                </Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  Modify Malt
                </Button>
              </DialogActions>
            </Grid>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            {snackbarState ? <SimpleSnackbar /> : null}
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog