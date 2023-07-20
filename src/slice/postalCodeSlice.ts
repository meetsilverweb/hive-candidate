//@ts-nocheck
//eslint-disable
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface InitialStateInterface {
  isLoading: Boolean
  getAllPostalCodeData: Array<any>
}
const headers = {
  'Content-Type': 'application/json'
}
const initialState: InitialStateInterface = {
  isLoading: false,
  getAllPostalCodeData: []
}

export const getAllPostalCodes = createAsyncThunk(
  'employee/getAllPostalCodes',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${payload.pinCode}`, {
        headers
      })

      return res?.data[0]?.PostOffice
    } catch (err: any) {
      return rejectWithValue(err?.res?.data[0]?.PostOffice)
    }
  }
)

export const postalCodeSlice = createSlice({
  name: 'postalCodeSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllPostalCodes.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllPostalCodes.fulfilled, (state, action) => {
      state.isLoading = true
      state.getAllPostalCodeData = action.payload
    })
    builder.addCase(getAllPostalCodes.rejected, state => {
      state.isLoading = false
    })
  }
})

export default postalCodeSlice.reducer
