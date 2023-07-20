import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import dashboardSlice from 'src/slice/dashboardSlice'
import jobPreferenceSlice from 'src/slice/jobPreferenceSlice'
import postalCodeSlice from 'src/slice/postalCodeSlice'
import trackApplicationSlice from 'src/slice/trackApplicationSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      dashboardReducer: dashboardSlice,
      jobPreferenceReducer: jobPreferenceSlice,
      trackApplicationReducer: trackApplicationSlice,
      postalCodeReducer: postalCodeSlice
    },
    devTools: true
  })

export const store = makeStore()
export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export const wrapper = createWrapper<RootStore>(makeStore)
