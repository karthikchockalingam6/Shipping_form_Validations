import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LockIcon from "@mui/icons-material/Lock";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

import FormHelperText from "@mui/material/FormHelperText";

const schema = yup.object({
  fullName: yup.string().required("Fullname is requirerd").trim(),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required")
    .trim(),
  address: yup.string().required("Address is required").trim(),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(10, "Atleast 10 characters required")
    .matches(/^[6789][0-9]{9}$/, "Invalid number"),
  city: yup.string().required("City is required"),
  zipCode: yup
    .string()
    .required("Zipcode is required")
    .matches(/^[1-9][0-9]{5}$/, "Invalid Zipcode"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  date: yup
    .date()
    .required("Date is required")
    .typeError("Enter a valid date")
    .min("01/01/1900", "Year cannot be less than 1900")
    .max("01/01/2100", "Year cannot be more than 2100"),
  checkBox: yup.bool().oneOf([true], "Required*"),
});

const defaultValues = {
  fullName: "",
  email: "",
  address: "",
  phone: "",
  city: null,
  state: null,
  country: null,
  zipCode: "",
  checkBox: false,
  date: null,
};
const RegisterForm = () => {
  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = (data) => {
    console.log("Submitted", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const country = ["India", "America", "Europe"];
  const city = ["Chennai", "Coimbatore", "Madurai"];
  const state = ["Tamilnadu", "Kerala", "Karnataka"];

  const CityStateCountry = ({ name, label, option, errorAndMessage }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete
            {...field}
            options={option}
            fullWidth
            onChange={(_, data) => onChange(data)}
            className="inputRounded"
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={ref}
                label={label}
                error={!!errorAndMessage}
                helperText={errorAndMessage?.message}
              />
            )}
          />
        )}
      />
    );
  };

  return (
    <>
      <div className="m-5 mt-30 w-1/2 h-full float-left">
        <div className="ml-7 text-3xl font-semibold">Shipping address</div>
        <div className="p-10 pb-2 ml-5 mt-2 border rounded-3xl bg-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex space-x-4 ">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full name"
                    variant="outlined"
                    fullWidth
                    className="inputRounded"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    className="inputRounded"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </div>

            <div className="pt-5 flex space-x-4 ">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    variant="outlined"
                    fullWidth
                    className="inputRounded"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    className="inputRounded"
                    // { valueAsNumber: true }
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </div>
            <div className="pt-5 flex space-x-4 ">
              <CityStateCountry
                name={"city"}
                label={"City"}
                option={city}
                errorAndMessage={errors.city}
              />

              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Zipcode"
                    variant="outlined"
                    fullWidth
                    className="inputRounded"
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                  />
                )}
              />

              <CityStateCountry
                name={"state"}
                label={"State"}
                option={state}
                errorAndMessage={errors.state}
              />
            </div>

            <div className="pt-5 flex space-x-4 ">
              <CityStateCountry
                name={"country"}
                label={"Country"}
                option={country}
                errorAndMessage={errors.country}
              />

              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="Date"
                      className="inputRounded"
                      slotProps={{
                        textField: {
                          error: !!errors.date,
                          helperText: errors.date?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
            <div className="mt-3 ml-1 flex justify-between">
              <div
                className={
                  errors.checkBox ? "text-[#d23130]" : "text-green-600"
                }
              >
                <Controller
                  name="checkBox"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      control={
                        <Checkbox defaultChecked size="small" color="success" />
                      }
                      label="Shipping address same as billing"
                    />
                  )}
                />
                {errors?.checkBox && (
                  <FormHelperText style={{ color: "#d23130" }}>
                    {errors?.checkBox?.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <Button
                  size="small"
                  variant="contained"
                  color="inherit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
          <DevTool control={control} />
        </div>
        <div className="flex ml-7 mt-2 text-xs font-medium items-center text-gray-400">
          <LockIcon fontSize="inherit" color="disabled" />
          Your information is safe
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
