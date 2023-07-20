import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { createJobInterface } from 'src/views/form-wizard/StepperCustomHorizontal'

export interface FindJobs {
  singlePost: []
  getAllJobsData: Array<object>
  getJobPreferenceDataById: object
  isLoading: boolean
  jobPostData: object
  createJobApplyData: object
}

type Payload = {
  search: string
  limit: string
  page: string
  workingDays: string
  typeOfJob: string
  experienceLevel: string
  location: string
  minSalary: string
  maxSalary: string
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: FindJobs = {
  singlePost: [],
  getAllJobsData: [],
  getJobPreferenceDataById: {},
  isLoading: false,
  jobPostData: {},
  createJobApplyData: {}
}

export const getAllJobs = createAsyncThunk('getAllJobs', async (payload: Payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getAllJobPreference?search=${payload?.search}&limit=${payload.limit}&page=${payload?.page}&workingDays=${payload?.workingDays}&typeOfJob=${payload?.typeOfJob}&experienceLevel=${payload?.experienceLevel}&minSalary=${payload?.minSalary}&maxSalary=${payload?.maxSalary}&location=${payload?.location}`,
      {
        headers
      }
    )
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something Went Wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const getJobPostByID = createAsyncThunk('/getJobPostByID', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getJobPreferenceById/${payload.id}`, {
      headers
    })
    console.log(res?.data)
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something Went Wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const getJobPreferenceById = createAsyncThunk(
  'employee/getJobPreferenceById',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getJobPreferenceById/${payload?.id}`, {
        headers
      })
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something Went Wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const updateJobPost = createAsyncThunk(
  'employee/getAllJobPreferance',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/jobPreferenceUpdate/${payload?.id}`, payload, {
        headers
      })
      toast.success('Updated Successfully')
      return res?.data?.data
    } catch (err: any) {
      toast.error('Something Went Wrong!')
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const addJobPost = createAsyncThunk('employee/addJobPost', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/createJobPreference`, payload, { headers })
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})

export const createJobApply = createAsyncThunk('employee/createJobApply', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/createJobApply`, payload, { headers })
    toast.success('Applied Successfully')
    return res?.data?.data
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data)
  }
})
// Role slice
export const jobPreferenceSlice = createSlice({
  name: 'jobPreferenceSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllJobs.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.getAllJobsData = action.payload
      })
      .addCase(getAllJobs.rejected, state => {
        state.isLoading = false
      })
      .addCase(addJobPost.pending, state => {
        state.isLoading = true
      })
      .addCase(addJobPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.getJobPreferenceDataById = action.payload?.id
      })
      .addCase(addJobPost.rejected, state => {
        state.isLoading = false
      })
      .addCase(getJobPreferenceById.pending, state => {
        state.isLoading = true
      })
      .addCase(getJobPreferenceById.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobPostData = action.payload
      })
      .addCase(getJobPreferenceById.rejected, state => {
        state.isLoading = false
      })
      .addCase(createJobApply.pending, state => {
        state.isLoading = true
      })
      .addCase(createJobApply.fulfilled, (state, action) => {
        state.isLoading = false
        state.createJobApplyData = action.payload
      })
      .addCase(createJobApply.rejected, state => {
        state.isLoading = false
      })
      .addCase(getJobPostByID.pending, state => {
        state.isLoading = true
      })
      .addCase(getJobPostByID.fulfilled, (state, action) => {
        state.isLoading = false
        state.singlePost = action.payload
      })
      .addCase(getJobPostByID.rejected, state => {
        state.isLoading = false
      })
  }
})

export default jobPreferenceSlice.reducer
