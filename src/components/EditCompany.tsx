import React, { useEffect, useState } from "react";
import "../forms/SingleForm";
import FormEmployee from "../forms/FormEmployee";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  companyActions,
  loadCompany,
  updateCompany,
} from "../reducers/CompanyReducer";
import { CompanyInterface } from "../interfaces/CompanyInterface";
import CompanyFormSchema from "../forms/Schemas/CompanyFormSchema";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const EditCompany = (setAuth) => {
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(loadCompany(params.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onSubmitForm = async (entity: CompanyInterface) => {
    console.log(entity);
    try {
      console.log(entity);

      const response: any = await dispatch(
        updateCompany({ ...entity, id: params.id })
      );
      if (
        response.payload.data === "Λάθος ΑΦΜ" ||
        response.payload.data ===
          'duplicate key value violates unique constraint "employees_afm_key"'
      ) {
        setErrorMessage("Λάθος ΑΦΜ!");
        throw Error();
      }
      dispatch(companyActions.clearLoadCompany());
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Dialog open fullWidth>
      <DialogTitle>ΕΝΗΜΕΡΩΣΗ </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Εισάγετε τα στοιχεία της ΕΤΑΙΡΕΙΑΣ:
        </DialogContentText>
        <FormEmployee
          schema={CompanyFormSchema}
          onSubmit={onSubmitForm}
          errorMessage={errorMessage}
          id={params.id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCompany;
