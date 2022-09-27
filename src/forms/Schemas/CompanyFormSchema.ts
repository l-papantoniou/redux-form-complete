const CompanyFormSchema = {
  label: "CompanyForm",
  name: "CompanyForm",
  initialValues: {},
  style: { display: "flex", flexDirection: "column" },
  elements: [
    {
      label: "Όνομα Eταιρείας",
      name: "name",
      type: "text",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: true,
      },
    },
    {
      label: "ΑΦΜ",
      name: "company_afm",
      type: "text",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: true,
      },
    },
    {
      label: "Ημερομηνία Ίδρυσης",
      name: "establishment_year",
      type: "date",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: false,
      },
    },
    {
      label: "Τηλέφωνο",
      name: "phone",
      type: "text",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 2, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: false,
      },
    },
  ],
};

export default CompanyFormSchema;
