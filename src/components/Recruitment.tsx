import React, { useEffect } from "react";
import "../forms/SingleForm";
import FormEmployee from "../forms/FormEmployee";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompanyEmployee,
  getAllCompanies,
} from "../reducers/CompanyReducer";
import { RootState } from "../store";
import { cloneDeep } from "lodash";
import RecruitmentFormSchema from "../forms/Schemas/RecruitmentFormSchema";
import { RecruitmentInterface } from "../interfaces/RecruitmentInterface";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const Recruitment: React.FC<{ setAuth: (boolean) => void }> = (
  setAuth
) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const companies = useSelector(
    (state: RootState) => state.company.getAllCompanies
  );
  //dynamically add options to select field
  const schema = cloneDeep(RecruitmentFormSchema);
  schema.elements[0].properties.options = companies;

  useEffect(() => {
    dispatch(getAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = async (entity: RecruitmentInterface) => {
    try {
      const response: any = await dispatch(
        createCompanyEmployee({
          ...entity,
          employee_id: params.id,
        })
      );
      console.log(response);
      navigate("/unemployeed");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Dialog open fullWidth>
      <DialogTitle>ΠΡΟΣΛΗΨΗ</DialogTitle>
      <DialogContent>
        <DialogContentText>Επιλέξτε την ΕΤΑΙΡΕΙΑ ανάθεσης:</DialogContentText>
        <FormEmployee schema={schema} onSubmit={onSubmitForm} />
      </DialogContent>
    </Dialog>
  );
};
