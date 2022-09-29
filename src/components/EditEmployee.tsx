import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../forms/SingleForm";
import SimpleFormSchema from "../forms/Schemas/SimpleFormSchema";
import {
  employeeActions,
  loadEmployee,
  updateEmployee,
} from "../reducers/EmployeeReducer";
import FormEmployee from "../forms/FormEmployee";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";
import {
  companyActions,
  createCompanyEmployee,
  getAllCompanies,
  loadEmployeeCompanyId,
  updateCompanyEmployee,
} from "../reducers/CompanyReducer";
import { RootState } from "../store";
import { cloneDeep } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const EditEmployee: React.FC<{ setAuth: (boolean) => void }> = (
  setAuth
) => {
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //set options for companies
  const companies = useSelector(
    (state: RootState) => state.company.getAllCompanies
  );
  const schema = cloneDeep(SimpleFormSchema);
  schema.elements[6].properties.options = companies;

  // check if employee belongs to a company already
  const company_id = useSelector(
    (state: any) => state.company.loadEmployeeCompanyId.company_id
  );

  const load = async (id) => {
    await dispatch(loadEmployee(params.id)).then;
    await dispatch(loadEmployeeCompanyId(params.id));
  };

  useEffect(() => {
    dispatch(getAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (params.id) {
      load(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onSubmitForm = async (entity: EmployeeInterface) => {
    console.log(entity);
    try {
      const response: any = await dispatch(
        updateEmployee({ ...entity, id: params.id })
      );
      console.log(response);

      if (
        response.payload.data === "Λάθος ΑΦΜ" ||
        response.payload.data ===
          'duplicate key value violates unique constraint "employees_afm_key"'
      ) {
        setErrorMessage("Λάθος ΑΦΜ!");
        throw Error();
      }

      if (company_id && entity.company_id !== undefined) {
        const result1: any = await dispatch(
          updateCompanyEmployee({
            ...entity,
            employee_id: params.id,
          })
        );
        console.log(result1);
      } else if (!company_id && entity.company_id !== undefined) {
        const result2: any = await dispatch(
          createCompanyEmployee({
            ...entity,
            employee_id: params.id,
          })
        );
        console.log(result2);
      }

      dispatch(companyActions.clearEmployeeCompanyId());
      dispatch(employeeActions.clearUpdateEmployee());
      dispatch(companyActions.clearCompanyEmployee());
      navigate("/employees");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Dialog open fullWidth>
      <DialogTitle>ΕΝΗΜΕΡΩΣΗ</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Εισάγετε τα στοιχεία του ΥΠΑΛΛΗΛΟΥ:
        </DialogContentText>
        <FormEmployee
          onSubmit={onSubmitForm}
          schema={schema}
          errorMessage={errorMessage}
          id={params.id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployee;
