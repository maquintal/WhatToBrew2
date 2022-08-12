import * as React from "react";
import { useForm } from "react-hook-form";
import useSWR from 'swr'

import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import fetcher from "../../../../config/fetcher";
import { useState } from "react";

export type FormValuesMalt = {
  maltName: string;
  cerealType: string;
  substitute: string[];
};

const Malt = () => {

  const { handleSubmit, control } = useForm<FormValuesMalt>({
    defaultValues: {
      maltName: "",
      // cerealType: ""
    },
    mode: "onChange"
  });

  const [ready, setReady] = useState(false)

  const { data, error, mutate } = useSWR(
    ready ?
      ["POST", '/api/insertMalt', JSON.stringify(control._formValues)]
    : null,
    fetcher
    )

  const onSubmit = async (data: FormValuesMalt) => {
    console.log(data)
    console.log(control)
    await setReady(true)
    ready ? mutate() : null
    setReady(false)
  }

  return (
    <form>
      <InputTextField
        control={control}
        name="maltName"
        label="Malt"
        rules={{ required: true }}
        type={""}
      />
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Add Malt
        </Button>
      </DialogActions>
    </form>
  );
}

export default Malt
