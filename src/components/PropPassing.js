import { TextField } from "@mui/material";
import React from "react";

const TextFieldProp = (props) => {
  return <TextField size={props.prop1} placeholder={props.prop1} />;
};

const PropPassing = () => {
  return (
    <>
      <TextFieldProp prop1={"small"} prop2={"Karthik"} />
      <TextFieldProp prop1={"large"} prop2={"Chockalingam"} />
    </>
  );
};

export default PropPassing;
