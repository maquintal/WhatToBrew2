import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR, { SWRResponse } from "swr";

// MUI
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, DialogActions, Button } from "@mui/material";

// Custom Tools
import fetcher from "@config/fetcher";
import poster from "@config/poster";

// Custom
import SimpleDialog from "@components/screens/surfaces/dialogIngredients";
import SimpleSnackbar from "@components/layout/snackbar";
import RHFMaltBody from "@components/rhf/form/Malt";

export type FormValuesMalt = {
  maltName: string;
  cerealType: string;
  substitute: any[];
};

const Malt = () => {

  const { data: dataMalts, error: dataError, mutate: mutateMalt }: SWRResponse = useSWR(
    ["GET", "/api/Queries/Malt/all"], fetcher
  );

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'maltName', headerName: 'Malt Name', width: 130 },
    { field: 'cerealType', headerName: 'Cereal Type', width: 130 },
    {
      field: 'substitute',
      headerName: 'Substitute(s)',
      width: 400,
      valueGetter: (params) => params.row?.substitute.map((item: any) => item.maltName)
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});

  // RHF Insert Malt
  const { handleSubmit, control, getValues } = useForm<FormValuesMalt>({
    defaultValues: {
      maltName: "",
      cerealType: "Barley",
      substitute: []
    },
    mode: "onChange",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const [ready, setReady] = React.useState(false);
  const [state, setState] = React.useState({});
  const [snackbarState, setSnackbarState] = React.useState(false);

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/Mutations/Malt/insertOne", JSON.stringify(control._formValues)]
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

  const onSubmit = async (data: FormValuesMalt) => {
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };

  if (!dataMalts || dataError) {
    return null
  }

  return (<>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={dataMalts?.data}
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
        dialogTitle={`Modify Existing Malt`}
        refetch={() => mutateMalt()}
      />
      || null}

    <form>
      <Grid container spacing={1}>
        <RHFMaltBody control={control} />
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

  </>
  );
};

export default Malt;
