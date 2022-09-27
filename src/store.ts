import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import { employeesSlice } from "./reducers/EmployeeReducer";
import { configureStore } from "@reduxjs/toolkit";
import { companySlice } from "./reducers/CompanyReducer";

const rootReducer = {
  form: formReducer,
  employees: employeesSlice.reducer,
  company: companySlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
