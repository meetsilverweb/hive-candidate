//@ts-nocheck
//eslint-disable
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export interface EmployeeProfile {
  isLoading: boolean
  getEmployeeData: object
  updateEmployeeData: object
  uploadResumeData: string
  uploadProfileData: string
  getAllRolesData: Array
  disableValue: boolean
  getAllCitiesData: []
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: EmployeeProfile = {
  isLoading: false,
  getEmployeeData: {},
  updateEmployeeData: {},
  uploadResumeData: '',
  uploadProfileData: '',
  getAllRolesData: [],
  disableValue: false,
  getAllCitiesData: []
}
export const getEmployee = createAsyncThunk('employee/getAllEmployee', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getEmployeeById/${payload?.id}`, {
      headers
    })

    return response?.data?.data
  } catch (error: any) {
    console.log(error, 'error')
    toast.error('Something Went Wrong!')
    return rejectWithValue(error?.response?.data)
  }
})

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (payload: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/employeeUpdate/${payload?.id}`, payload, {
        headers
      })

      toast.success('Updated Successfully')
      return response?.data?.data
    } catch (error: any) {
      toast.error('Something Went Wrong!')
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const uploadResume = createAsyncThunk('employee/uploadResume', async (payload: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/resumeUpload/${payload?.id}`, payload, {
      headers
    })
    toast.success('Uploaded Successfully')
    return response?.data?.data
  } catch (error: any) {
    toast.error('Something Went Wrong!')
    return rejectWithValue(error?.response?.data)
  }
})

export const uploadProfile = createAsyncThunk(
  'employee/uploadProfile',
  async (payload: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/ProfileUpload/${payload?.id}`, payload, {
        headers
      })
      toast.success('Uploaded Successfully')
      return response?.data?.data
    } catch (error: any) {
      toast.error('Something Went Wrong!')
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const getAllRoles = createAsyncThunk('employee/getAllRoles', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getAllRole`, {
      headers
    })

    return response?.data?.data
  } catch (error: any) {
    toast.error('Something Went Wrong!')
    return rejectWithValue(error?.response?.data)
  }
})

export const getAllCities = createAsyncThunk('employee/getAllCities', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getCity`, {
      headers
    })

    return response?.data?.data
  } catch (error: any) {
    toast.error('Something Went Wrong!')
    return rejectWithValue(error?.response?.data)
  }
})

export const dashboardSlice = createSlice({
  name: 'addJobPostSlice',
  initialState,
  reducers: {
    setDisableValue: (state, action) => {
      state.disableValue = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getEmployee.pending, state => {
        state.isLoading = true
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.getEmployeeData = action.payload
      })
      .addCase(getEmployee.rejected, state => {
        state.isLoading = false
      })
      .addCase(updateEmployee.pending, state => {
        state.isLoading = true
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.updateEmployeeData = action.payload
      })
      .addCase(updateEmployee.rejected, state => {
        state.isLoading = false
      })
      .addCase(uploadResume.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.isLoading = false
        state.uploadResumeData = action.payload
      })
      .addCase(uploadResume.rejected, state => {
        state.isLoading = false
      })
      .addCase(uploadProfile.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.uploadResumeData = action.payload
      })
      .addCase(uploadProfile.rejected, state => {
        state.isLoading = false
      })
      .addCase(getAllRoles.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.isLoading = false
        state.getAllRolesData = action.payload
      })
      .addCase(getAllRoles.rejected, state => {
        state.isLoading = false
      })
      .addCase(getAllCities.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.isLoading = false
        state.getAllCitiesData = action.payload
      })
      .addCase(getAllCities.rejected, state => {
        state.isLoading = false
      })
  }
})

export const { setDisableValue } = dashboardSlice.actions
export default dashboardSlice.reducer
