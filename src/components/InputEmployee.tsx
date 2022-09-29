import React, { useEffect, useState } from "react";
import "../forms/SingleForm";
import SimpleFormSchema from "../forms/Schemas/SimpleFormSchema";
import FormEmployee from "../forms/FormEmployee";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";
import { createEmployee } from "../reducers/EmployeeReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompanyEmployee,
  getAllCompanies,
} from "../reducers/CompanyReducer";
import { RootState } from "../store";
import { cloneDeep } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const InputEmployee: React.FC<{ setAuth: (boolean) => void }> = (
  setAuth
) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const companies = useSelector(
    (state: RootState) => state.company.getAllCompanies
  );
  console.log(companies);

  const schema = cloneDeep(SimpleFormSchema);

  schema.elements[6].properties.options = companies;
  console.log(schema);

  useEffect(() => {
    dispatch(getAllCompanies());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = async (entity: EmployeeInterface) => {
    console.log(entity);

    try {
      const response: any = await dispatch(createEmployee(entity));
      if (
        response.payload.data === "Λάθος ΑΦΜ" ||
        response.payload.data ===
          'duplicate key value violates unique constraint "employees_afm_key"'
      ) {
        setErrorMessage("Λάθος ΑΦΜ!");
        throw Error();
      }
      if (entity.company_id !== undefined) {
        const result: any = await dispatch(
          createCompanyEmployee({
            ...entity,
            employee_id: response.payload.data.id,
          })
        );
        console.log(result);
      }

      navigate("/employees");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Dialog open fullWidth>
      <DialogTitle>ΕΓΓΡΑΦΗ </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Εισάγετε τα στοιχεία του ΥΠΑΛΛΗΛΟΥ:
        </DialogContentText>
        <FormEmployee
          schema={schema}
          onSubmit={onSubmitForm}
          errorMessage={errorMessage}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InputEmployee;
