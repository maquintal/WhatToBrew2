import * as React from "react";
import { useForm } from "react-hook-form";

import InputTextField from "@components/rhf/input/TextField";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <TextField control={control} name="FirstName" label="Malt Name" required={true} /> */}
      <InputTextField
                  control={control}
                  name="maltName"
                  label="Numero Civic"
                  rules={{ required: true }}
                />
      <input type="submit" />
    </form>
  );
}

export default Malt