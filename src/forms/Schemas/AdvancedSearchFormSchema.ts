const AdvancedSearchFormSchema = {
  label: "SearchForm",
  name: "SearchForm",
  initialValues: {},
  property: {},
  style: { display: "flex", flexDirection: "row" },
  elements: [
    {
      label: "Όνομα",
      name: "firstname",
      type: "search",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingLeft: 10, paddingRight: 2, marginBottom: 1 },
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
      type: "search",
      properties: {
        size: { xs: 12, sm: 4 },
        fieldSize: "small",
        sx: { paddingRight: 30, marginBottom: 1 },
      },
      validation: {
        readOnly: false,
        disabled: true,
        required: true,
      },
    },
    {
      label: "ΑΦΜ",
      name: "afm",
      type: "search",
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
  ],
};

export default AdvancedSearchFormSchema;
