import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import fetcher from "@config/fetcher";
import { useState } from "react";
import InputAutoComplete from "@components/rhf/input/AutoComplete";

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
      substitute: [{}]
    },
    mode: "onChange",
  });

  const [ready, setReady] = useState(false);
  const [state, setState] = useState({});

  const { data, error, mutate } = useSWR(
    ready
      ? ["POST", "/api/insertMalt", JSON.stringify(control._formValues)]
      : null,
    fetcher
  );

  const showForm = () => {
    setState(getValues())
  }

  const onSubmit = async (data: FormValuesMalt) => {
    console.log(data);
    console.log(control);
    await setReady(true);
    ready ? mutate() : null;
    setReady(false);
  };

  return (
      <form>
        <InputTextField
          control={control}
          name="maltName"
          label="Malt"
          rules={{ required: true }}
          type={""}
        />
        <InputAutoComplete
          control={control}
          name="cerealType"
          label="Cereal"
          rules={{ required: true }}
          options={["Barley", "Wheat"]}
        />
        <DialogActions>
          <Button variant="contained" onClick={showForm}>
            Form Data
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Add Malt
          </Button>
        </DialogActions>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </form>
  );
};

export default Malt;
