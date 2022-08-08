import * as React from "react";
import { useForm } from "react-hook-form";

import InputTextField from "@components/rhf/input/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

export type FormValuesMalt = {
  maltName: string;
  cerealType: string;
  substitute: string[];
};

const Malt = () => {
  const { handleSubmit, control } = useForm<FormValuesMalt>({
    defaultValues: {
      maltName: "",
      cerealType: ""
    },
    mode: "onChange"
  });
  const onSubmit = (data: FormValuesMalt) => console.log(data);

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
          onSubmit={handleSubmit(onSubmit)}
        >
          Add Malt
        </Button>
      </DialogActions>
    </form>
  );
}

export default Malt