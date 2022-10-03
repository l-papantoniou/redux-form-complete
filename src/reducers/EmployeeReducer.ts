import axios from "axios";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { EmployeeInterface } from "../interfaces/EmpoyeeInterface";
import { SearchInterface } from "../interfaces/SearchInterface";

// Actions

//get employees
export const getEmployees = createAsyncThunk(
  "employees/fetch",
  async (page: number) => {
    const requestUrl = `http://localhost:5000/employee?page=${page}`;
    const response = await axios.get(requestUrl);
    return response;
  }
);
//search an employee
export const searchEmployee = createAsyncThunk(
  "searchEmployee/fetch",
  async (entity: SearchInterface) => {
    if (!entity.firstname && entity.lastname) {
      const requestUrl = `http://localhost:5000/employee?lastname=${entity.lastname}`;
      const response = await axios.get(requestUrl);
      return response;
    }
    if (entity.firstname && !entity.lastname) {
      const requestUrl = `http://localhost:5000/employee?firstname=${entity.firstname}`;
      const response = await axios.get(requestUrl);
      return response;
    }

    if (entity.firstname && entity.lastname) {
      const requestUrl = `http://localhost:5000/employee?firstname=${entity.firstname}&&lastname=${entity.lastname}`;
      const response = await axios.get(requestUrl);
      return response;
    }
  }
);

// //advanced search an employee
// export const advancedSearchEmployee = createAsyncThunk(
//   "searchEmployee/fetch",
//   async (entity: SearchInterface) => {
//     const requestUrl = `http://localhost:5000/employee?firstname=${entity.firstname}&lastname=${entity.lastname}&afm=${entity.afm}`;
//     const response = await axios.get(requestUrl);
//     console.log(response);
//     return response;
//   }
// );

//advanced search an employee
export const advancedSearchEmployee = createAsyncThunk(
  "searchEmployee/fetch",
  async (entity: SearchInterface) => {
    if (entity.afm) {
      const requestUrl = `http://localhost:5000/employee?afm=${entity.afm}`;
      const response = await axios.get(requestUrl);
      return response;
    }
  }
);
//create employee
export const createEmployee = createAsyncThunk(
  "employee/create",
  async (entity: EmployeeInterface) => {
    const requestUrl = "http://localhost:5000/employee/new";
    const response = await axios.post(requestUrl, entity);
    return response;
  }
);

//delete employee
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id: number) => {
    const requestUrl = `http://localhost:5000/employees/${id}`;
    return await axios.delete(requestUrl);
  }
);

//update employee
export const updateEmployee = createAsyncThunk(
  "employee/edit",
  async (entity: EmployeeInterface) => {
    console.log(entity);
    const requestUrl = `http://localhost:5000/employee/${entity.id}`;
    const response = await axios.put(requestUrl, entity);
    return response;
  }
);

//load employee
export const loadEmployee = createAsyncThunk(
  "employee/load",
  async (id: string | number) => {
    const requestUrl = `http://localhost:5000/employee/${id}`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

//get unemployeed
export const getUnemployeed = createAsyncThunk(
  "unemployeed/fetch",
  async () => {
    const requestUrl = `http://localhost:5000/unemployeed`;
    const response = await axios.get(requestUrl);
    return response;
  }
);

const initialState = {
  entities: [],
  totalEmployees: 0,
  countPages: 0,
  pageNumber: 0,
  loadEmployee: {},
  unemployeed: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearUpdateEmployee: (state) => {
      state.loadEmployee = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.entities = action.payload.data.employees;
        state.totalEmployees = action.payload.data.totalEmployees;
        state.countPages = action.payload.data.countPages;
        state.pageNumber = action.payload.data.pageNumber;
      })
      .addCase(getUnemployeed.fulfilled, (state, action) => {
        state.unemployeed = action.payload.data;
      })
      .addCase(searchEmployee.fulfilled, (state, action) => {
        state.entities = action.payload.data;
      })
      .addCase(loadEmployee.fulfilled, (state, action) => {
        state.loadEmployee = action.payload.data;
      });
  },
});

export const employeeActions = employeesSlice.actions;

export default employeesSlice.reducer;
