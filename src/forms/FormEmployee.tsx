import React from "react";
import { SimpleForm } from "./SimpleForm";

const FormEmployee = (props) => {
  const { schema, id, onSubmit, errorMessage } = props;

  return (
    <SimpleForm
      id={id}
      onSubmit={onSubmit}
      name={schema.name}
      schema={schema}
      errorMessage={errorMessage}
    ></SimpleForm>
  );
};

export default FormEmployee;
