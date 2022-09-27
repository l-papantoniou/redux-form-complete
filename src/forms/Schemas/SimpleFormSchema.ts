const SimpleFormSchema = {
  label: "EmployeeForm",
  name: "EmployeeForm",
  initialValues: {},
  style: { display: "flex", flexDirection: "column" },
  elements: [
    {
      label: "Όνομα",
      name: "firstname",
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
      label: "Επώνυμο",
      name: "lastname",
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
      label: "Ημερομηνία Γέννησης ",
      name: "birthdate",
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
      label: "ΑΦΜ",
      name: "afm",
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

    {
      label: "Φύλλο",
      name: "sex",
      type: "radios",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: {
          paddingLeft: 2,
          paddingRight: 6,
          paddingTop: 2,
          paddingBottom: 2,
          marginBottom: 1,
        },
        options: [
          { value: "Άνδρας", label: "Άνδρας" },
          { value: "Γυναίκα", label: "Γυναίκα" },
        ],
        row: true,
      },
      validation: {
        readOnly: false,
        disabled: false,
        required: false,
      },
    },
    {
      label: "Εθνικότητα",
      name: "nationality",
      type: "select",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: {
          paddingLeft: 2,
          paddingRight: 6,
          paddingTop: 2,
          paddingBottom: 2,
          marginBottom: 1,
        },
        options: [],
      },
      validation: {
        readOnly: false,
        disabled: false,
        required: false,
      },
    },
    {
      label: "Εταιρεία",
      name: "company_id",
      type: "company",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: {
          paddingLeft: 2,
          paddingRight: 6,
          paddingTop: 2,
          paddingBottom: 2,
          marginBottom: 1,
        },
        options: [],
      },
      validation: {
        readOnly: false,
        disabled: false,
        required: false,
      },
    },
  ],
};

export default SimpleFormSchema;
