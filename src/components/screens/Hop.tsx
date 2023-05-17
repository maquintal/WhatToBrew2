import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR, { SWRResponse } from "swr";
import { useState } from "react";

// MUI
import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Custom Tools
import poster from "@config/poster";
import fetcher from "@config/fetcher";

// Custom
import SimpleSnackbar from "@components/layout/snackbar";
import SimpleDialog from "@components/screens/surfaces/dialogIngredients";
import InputAutoCompleteRestfulOptions from "@components/rhf/input/AutoCompleteRestfullOptions";
import RHFHopBody from "@components/rhf/form/ingredients/Hop";

export type FormValuesHop = {
  hopName: string;
  substitute: any[];
};

const Hop = () => {

  const { data: dataHops, error: dataError, mutate: mutateHops }: SWRResponse = useSWR(
    ["GET", "/api/Queries/Hop/all"], fetcher
  );

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'hopName', headerName: 'Hops', width: 130 },
    {
      field: 'substitute',
      headerName: 'Hop Substitute(s)',
      width: 400,
      valueGetter: (params) => params.row?.substitute.map((item: any) => item.hopName)
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});

  const { handleSubmit, control, getValues } = useForm<FormValuesHop>({
    defaultValues: {
      hopName: "",
      substitute: []
    },
    mode: "onChange",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const [ready, setReady] = useState(false);
  const [state, setState] = useState({});
  const [snackbarState, setSnackbarState] = useState(false);

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/Hop/insertOne", JSON.stringify(control._formValues)]
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

  const onSubmit = async (data: FormValuesHop) => {
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };

  if (!dataHops || dataError) {
    return null
  }

  return (<>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={dataHops?.data}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        onRowClick={(clicked) => { setSelectedValue(clicked); setOpen(true) }}
      // checkboxSelection
      />
    </div>

    {open &&
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        dialogTitle={`Modify Existing Hop`}
        refetch={() => mutateHops()}
      />
      || null}

    <form>
      <Grid container spacing={1}>
        <RHFHopBody control={control} />
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
  </>);
};

export default Hop;
