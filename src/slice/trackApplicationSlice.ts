import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface InitialStateInterface {
  isLoading: Boolean
  getAllApplicationData: Array<any>
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
const initialState: InitialStateInterface = {
  isLoading: false,
  getAllApplicationData: []
}

export const getAllApplication = createAsyncThunk(
  'employee/getAllApplication',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/getAllJobApply/${payload?.id}?search=${payload?.search}&page=${payload?.page}&limit=${payload?.limit}`,
        {
          headers
        }
      )
      // console.log('response', res?.data)
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const trackApplicationSlice = createSlice({
  name: 'trackApplicationSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllApplication.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllApplication.fulfilled, (state, action) => {
      state.isLoading = false
      state.getAllApplicationData = action.payload
    })
    builder.addCase(getAllApplication.rejected, state => {
      state.isLoading = false
    })
  }
})

export default trackApplicationSlice.reducer
