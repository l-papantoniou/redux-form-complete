import React, { Fragment } from "react";
import { useDispatch, connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { employeeActions } from "../reducers/EmployeeReducer";
import mapStateToProps from "../initialValues/InitialState";
import renderField from "./TextField";
import type {} from "redux-thunk/extend-redux";
import { companyActions } from "../reducers/CompanyReducer";

interface IRootState {
  employees?: any;
  id?: number | string | null;
  isNew?: boolean;
}

export type FormValues = { [key: string]: any };

export const ReduxForm: React.FC<
  IRootState & InjectedFormProps<FormValues, IRootState>
> = (props) => {
  const { handleSubmit, pristine, submitting, onSubmit, schema, errorMessage } =
    props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(employeeActions.clearUpdateEmployee());
    dispatch(companyActions.clearLoadCompany());
    dispatch(companyActions.clearEmployeeCompanyId());
    navigate("/");
  };
  //required fields validation
  const required = (value) => (value ? undefined : "Required");

  console.log(schema);
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {schema.property && (
          <div style={schema.style}>
            {schema.elements.map((element) => (
              <Field
                label={element.label}
                name={element.name}
                type={element.type}
                validate={required}
                component={renderField}
              />
            ))}
          </div>
        )}{" "}
        {!schema.property && (
          <div style={schema.style}>
            {schema.elements.map((element) => (
              <Field
                label={element.label}
                name={element.name}
                type={element.type}
                component={renderField}
                {...{
                  customProps: element.properties.options,
                }}
              />
            ))}
          </div>
        )}
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong> {errorMessage} </strong>
          </Alert>
        )}
        {!schema.property && (
          <DialogActions>
            <Button onClick={() => handleClose()}>ΕΞΟΔΟΣ</Button>
            <Button disabled={pristine || submitting} type="submit">
              ΕΓΓΡΑΦΗ
            </Button>
          </DialogActions>
        )}
      </form>
    </Fragment>
  );
};

export const SingleForm = (name: string) =>
  (connect(mapStateToProps) as any)(
    reduxForm<{}, IRootState>({
      form: name,
      destroyOnUnmount: false,
      enableReinitialize: true,
    })(ReduxForm)
  );
