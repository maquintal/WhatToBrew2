import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR, { SWRResponse } from "swr";

// UI
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, DialogActions, Button } from "@mui/material";

import fetcher from "@config/fetcher";
import poster from "@config/poster";

// Custom
import SimpleDialog from "@components/rhf/surfaces/dialogIngredients";
import SimpleSnackbar from "@components/layout/snackbar";

import InputAutoComplete from "@components/rhf/input/AutoComplete";
import InputAutoCompleteRestfulOptions from "@components/rhf/input/AutoCompleteRestfullOptions";
import InputTextField from "@components/rhf/input/TextField";

export type FormValuesMalt = {
  maltName: string;
  cerealType: string;
  substitute: any[];
};

const Malt = () => {

  // <DataGrid /> 
  const { data: dataMalts, error: dataError }: SWRResponse = useSWR(
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

  if (!dataMalts || dataError) {
    return null
  }

  return (<>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={dataMalts?.data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // onRowClick={(clicked) => { console.log(clicked) }}
      onRowClick={(clicked) => { setSelectedValue(clicked); setOpen(true) }}
      // checkboxSelection
      />
    </div>

    {open && <SimpleDialog
      selectedValue={selectedValue}
      open={open}
      onClose={handleClose}
    /> || null}

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

  </>
  );
};

export default Malt;
