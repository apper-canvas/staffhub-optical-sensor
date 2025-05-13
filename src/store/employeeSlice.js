import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchEmployees, 
  addEmployee, 
  updateEmployeeStatus, 
  deleteEmployee 
} from '../services/employeeService';

export const fetchEmployeesAsync = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchEmployees();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEmployeeAsync = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await addEmployee(employeeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployeeStatusAsync = createAsyncThunk(
  'employees/updateEmployeeStatus',
  async ({ employeeId, status }, { rejectWithValue }) => {
    try {
      const response = await updateEmployeeStatus(employeeId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  'employees/deleteEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      await deleteEmployee(employeeId);
      return employeeId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  employees: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filteredEmployees: [],
  filterCriteria: {
    searchTerm: '',
    department: 'All',
    status: 'All'
  }
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setFilterCriteria: (state, action) => {
      state.filterCriteria = { ...state.filterCriteria, ...action.payload };
      
      // Apply filters directly in the reducer
      let results = [...state.employees];
      const { searchTerm, department, status } = state.filterCriteria;
      
      // Apply search
      if (searchTerm) {
        results = results.filter(
          employee => 
            employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply department filter
      if (department !== 'All') {
        results = results.filter(employee => employee.department === department);
      }
      
      // Apply status filter
      if (status !== 'All') {
        results = results.filter(employee => employee.status === status.toLowerCase());
      }
      
      state.filteredEmployees = results;
    },
    clearFilters: (state) => {
      state.filterCriteria = {
        searchTerm: '',
        department: 'All',
        status: 'All'
      };
      state.filteredEmployees = state.employees;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch employees cases
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
        state.filteredEmployees = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add employee cases
      .addCase(addEmployeeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees.push(action.payload);
        // Apply current filters to update filteredEmployees
        const { searchTerm, department, status } = state.filterCriteria;
        if (
          (department === 'All' || action.payload.department === department) &&
          (status === 'All' || action.payload.status === status.toLowerCase()) &&
          (!searchTerm || 
            action.payload.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            action.payload.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            action.payload.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            action.payload.position.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ) {
          state.filteredEmployees.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addEmployeeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update employee status cases
      .addCase(updateEmployeeStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmployeeStatusAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.employees.findIndex(emp => emp.Id === action.payload.Id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        
        // Update in filtered list as well
        const filteredIndex = state.filteredEmployees.findIndex(emp => emp.Id === action.payload.Id);
        if (filteredIndex !== -1) {
          state.filteredEmployees[filteredIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEmployeeStatusAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete employee cases
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = state.employees.filter(emp => emp.Id !== action.payload);
        state.filteredEmployees = state.filteredEmployees.filter(emp => emp.Id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setFilterCriteria, clearFilters } = employeeSlice.actions;
export default employeeSlice.reducer;