import React from "react";
import { ISchema } from "../interfaces/IschemaInterface";
import { SingleForm } from "./SingleForm";

interface SimpleFormProps {
  onSubmit?: any;
  isNew?: boolean;
  errorMessage?: string;
  id: string;
  name: string;
  schema: ISchema;
  autoDiffSummary?: boolean;
  validationOpts?: any;
}
export const SimpleForm: React.FC<SimpleFormProps> = (props) => {
  const { schema, id, onSubmit, errorMessage } = props;

  const Form = React.useMemo(() => SingleForm(schema.name), [schema]);
  return (
    <div>
      <Form
        form={schema.name}
        id={id}
        schema={schema}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
};
