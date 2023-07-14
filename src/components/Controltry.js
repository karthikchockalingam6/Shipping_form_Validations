import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const schema = yup.object().shape({
  name: yup.string().required("You must enter Name"),
});

const defaultValues = {
  name: "",
};

function BasicForm() {
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </CardContent>
      </Card>
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <DevTool control={control} />
    </form>
  );
}

export default BasicForm;
