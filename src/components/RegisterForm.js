import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button, TextField } from "@mui/material";

const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      fullname: "",
      socials: { insta: "", facebook: "" },
      phone: ["", ""],
      age: 0,
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = (data) => {
    console.log("Submitted", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <div className="m-5 bg-gray-100 text-center">
      <form
        className=" w-full p-5 text-left"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="p-2">
          <TextField
            label="Username"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
              validate: (fieldValue) => {
                return fieldValue.trim() !== "" || "Username cannot be empty";
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </div>
        <div className="p-2">
          <TextField
            label="Email"
            type="email "
            id="email"
            {...register("email", {
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email format",
              },
              required: { value: true, message: "Email is required" },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>
        <div className="p-2">
          <TextField
            label="Fullname"
            id="fullname"
            {...register("fullname", {
              required: { value: true, message: "Fullname is required" },
              validate: (fieldValue) => {
                return fieldValue.trim() !== "" || "Fullname cannot be empty";
              },
            })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />
        </div>
        <div className="p-2">
          <TextField
            label="Instagram Id"
            id="instaId"
            {...register("socials.insta")}
          />
        </div>
        <div className="p-2">
          <TextField
            label="Facebook Id"
            id="facebookId"
            {...register("socials.facebook")}
          />
        </div>
        <div className="p-2">
          <TextField
            label="Primary Ph.no"
            id="pPhoneNumber"
            {...register("phone[0]")}
          />
        </div>
        <div className="p-2">
          <TextField
            label="Secondary Ph.no"
            id="sPhoneNumber"
            {...register("phone[1]")}
          />
        </div>
        <div className="p-2">
          <TextField
            label="Age"
            type="number"
            {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "Age is required" },

              pattern: {
                value: /^\S[0-9]{0,2}$/,
                message: "age",
              },
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        </div>
        <div className="p-2">
          <Button
            variant="contained"
            color="inherit"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default RegisterForm;
