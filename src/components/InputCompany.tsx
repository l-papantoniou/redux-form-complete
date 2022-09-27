import React, { useState } from "react";
import "../forms/SingleForm";
import FormEmployee from "../forms/FormEmployee";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCompany } from "../reducers/CompanyReducer";
import { CompanyInterface } from "../interfaces/CompanyInterface";
import CompanyFormSchema from "../forms/Schemas/CompanyFormSchema";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const InputCompany = (setAuth) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm = async (entity: CompanyInterface) => {
    try {
      const response: any = await dispatch(createCompany(entity));
      if (
        response.payload.data === "Λάθος ΑΦΜ" ||
        response.payload.data ===
          'duplicate key value violates unique constraint "employees_afm_key"'
      ) {
        setErrorMessage("Λάθος ΑΦΜ!");
        throw Error();
      }
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Dialog open fullWidth>
      <DialogTitle>ΕΓΓΡΑΦΗ </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Εισάγετε τα στοιχεία της ΕΤΑΙΡΕΙΑΣ:
        </DialogContentText>
        <FormEmployee
          schema={CompanyFormSchema}
          onSubmit={onSubmitForm}
          errorMessage={errorMessage}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InputCompany;
