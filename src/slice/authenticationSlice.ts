import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
// export const candidateLogin = createAsyncThunk('candidate/candidateLogin', async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getAllJobPreference`, {
//       headers
//     })
//     return res?.data?.data
//   } catch (err: any) {
//     toast.error('Something went wrong!', err)
//     return rejectWithValue(err?.response?.data)
//   }
// })
