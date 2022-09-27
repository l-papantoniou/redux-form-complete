import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CompanyInterface } from "../interfaces/CompanyInterface";
import { CompanyEmployeeInterface } from "../interfaces/CompanyEmployeeInterface";

//get companies
export const getCompanies = createAsyncThunk(
  "companies/fetch",
  async (page: number) => {
    const requestUrl = `http://localhost:5000/company?page=${page}`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

//get companies
export const getAllCompanies = createAsyncThunk(
  "allCompanies/fetch",
  async () => {
    const requestUrl = `http://localhost:5000/companies`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

//create company
export const createCompany = createAsyncThunk(
  "company.reducer/createCompany",
  async (entity: CompanyInterface) => {
    const requestUrl = "http://localhost:5000/company";
    const response = await axios.post(requestUrl, entity);
    return response;
  }
);

//create companyEmployee
export const createCompanyEmployee = createAsyncThunk(
  "company.reducer/createCompanyEmployee",
  async (entity: CompanyEmployeeInterface) => {
    const requestUrl = "http://localhost:5000/companyemployees";
    const response = await axios.post(requestUrl, entity);
    return response;
  }
);

//update companyEmployee
export const updateCompanyEmployee = createAsyncThunk(
  "company.reducer/createCompanyEmployee",
  async (entity: CompanyEmployeeInterface) => {
    console.log(entity);
    const requestUrl = `http://localhost:5000/companyemployees`;
    const response = await axios.put(requestUrl, entity);
    return response;
  }
);

//load a company Name
export const loadEmployeeCompanyId = createAsyncThunk(
  "company.reducer/loadCompanyEmployee/companyName",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/companyemployees/companyname/${id}`;
    const response = await axios.get(requestUrl);
    console.log(response);
    return response;
  }
);

//create company
export const updateCompany = createAsyncThunk(
  "company.reducer/updateCompany",
  async (entity: CompanyInterface) => {
    const requestUrl = `http://localhost:5000/company/${entity.id}`;
    const response = await axios.put(requestUrl, entity);
    return response;
  }
);

//load a company
export const loadCompany = createAsyncThunk(
  "company.reducer/loadCompany",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/company/${id}`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

//get employees by company
export const getCompaniesEmployees = createAsyncThunk(
  "company.reducer/fetch companiesEmployees",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/companyemployees/${id}`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

//delete company
export const deleteCompany = createAsyncThunk(
  "company.reducer/deleteCompany",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/company/${id}`;
    const response = await axios.delete(requestUrl);
    return response;
  }
);

//delete company's Employees
export const deleteCompanyEmployees = createAsyncThunk(
  "company.reducer/deleteCompanyEmployees",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/companyemployees/companyname/${id}`;
    const response = await axios.delete(requestUrl);
    return response;
  }
);

//delete an employee from a company
export const deleteEmployeeCompany = createAsyncThunk(
  "company.reducer/deleteEmployeeCompany",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/companyemployees/employee/${id}`;
    const response = await axios.delete(requestUrl);
    return response;
  }
);

const initialState = {
  entities: [],
  countPages: 0,
  companyEmployees: [],
  loadCompany: {},
  getAllCompanies: [],
  loadEmployeeCompanyId: {},
};

export const companySlice = createSlice({
  name: "compamy",
  initialState,
  reducers: {
    clearCompanyEmployee: (state) => {
      state.companyEmployees = [];
    },
    clearLoadCompany: (state) => {
      state.loadCompany = {};
    },
    clearEmployeeCompanyId: (state) => {
      state.loadEmployeeCompanyId = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.entities = action.payload.data;
        state.countPages = action.payload.data;
      })
      .addCase(getCompaniesEmployees.fulfilled, (state, action) => {
        state.companyEmployees = action.payload.data;
      })
      .addCase(loadCompany.fulfilled, (state, action) => {
        state.loadCompany = action.payload.data;
      })
      .addCase(loadEmployeeCompanyId.fulfilled, (state, action) => {
        state.loadEmployeeCompanyId = action.payload.data;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.getAllCompanies = action.payload.data;
      });
  },
});

export const companyActions = companySlice.actions;

export default companySlice.reducer;
