//format birthday date //
const FormatBday = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-CA");
};

export interface IRootState {
  company?: any;
  employees?: any;
  isNew?: boolean;
  id?: number | string | null;
}

const mapStateToProps = (state: IRootState) => {
  return {
    initialValues: {
      name: state.company.loadCompany.name,
      company_afm: state.company.loadCompany.company_afm,
      establishment_year: FormatBday(
        state.company.loadCompany.establishment_year
      ),
      phone: state.company.loadCompany.phone,
      firstname: state.employees.loadEmployee.firstname,
      lastname: state.employees.loadEmployee.lastname,
      birthdate: FormatBday(state.employees.loadEmployee.birthdate),
      afm: state.employees.loadEmployee.afm,
      sex: state.employees.loadEmployee.sex,
      nationality: state.employees.loadEmployee.nationality,
      company_id: state.company.loadEmployeeCompanyId.company_id,
    },
  };
};

export default mapStateToProps;
