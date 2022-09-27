const RecruitmentFormSchema = {
  label: "RecruitmentForm",
  name: "RecruitmentForm",
  initialValues: {},
  style: { display: "flex", flexDirection: "column" },
  elements: [
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

export default RecruitmentFormSchema;
