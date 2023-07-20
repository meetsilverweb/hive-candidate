//@ts-nocheck
//eslint-disable
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  TextField
} from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { getAllCities, getAllRoles, updateEmployee } from 'src/slice/dashboardSlice'

type JobPreference = {
  // preferredLocation: string
  jobType: string
  preferredShift: string
  expectedMinSalary: string
  expectedMaxSalary: string
}

const DialogJobPreference = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const [locationValue, setLocationValue] = React.useState<string | null>([])
  const [value, setValue] = React.useState<string | null>([])
  const [currentRole, setCurrentRole] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [preferenceData, setPreferenceData] = useState<JobPreference>({
    // preferredLocation: getEmployeeData?.preferredLocation || '',
    jobType: getEmployeeData?.jobType || '',
    preferredShift: getEmployeeData?.preferredShift || '',
    expectedMinSalary: getEmployeeData?.expectedMinSalary || '',
    expectedMaxSalary: getEmployeeData?.expectedMaxSalary || ''
  })

  const { getAllRolesData, getAllCitiesData } = useSelector(state => state.dashboardReducer)
  const dispatch = useAppDispatch()

  const handleSubmit = (values: JobPreference) => {
    const payload = {
      id: getEmployeeData?.id,
      preferredLocation: locationValue,
      role: value,
      ...preferenceData
    }
    dispatch(updateEmployee(payload))
    handleClose()
  }

  const handleChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    setPreferenceData(values => ({ ...values, [name]: value }))
  }

  useEffect(() => {
    dispatch(getAllRoles())
    dispatch(getAllCities())
  }, [])

  useEffect(() => {
    setLocationValue(getEmployeeData?.preferredLocation)
    setValue(getEmployeeData?.role)
  }, [])

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Edit Job Preference</DialogTitle>
      <form noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item md={6} sm={12} xs={12}>
              {/* <TextField
                defaultValue={preferenceData.preferredLocation}
                onChange={handleChange}
                name='preferredLocation'
                size='small'
                fullWidth
                type='text'
                label='Preferred Location'
              /> */}
              <Autocomplete
                size='small'
                value={locationValue}
                onChange={(event: any, newValue: any) => {
                  setLocationValue(newValue)
                }}
                inputValue={currentCity}
                onInputChange={(event, newInputValue) => {
                  setCurrentCity(newInputValue)
                }}
                id='controllable-cities'
                options={getAllCitiesData?.map((Item: any) => Item?.name)}
                // isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => <TextField {...params} label='Preffered City' />}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel id='job-type'>Job Type</InputLabel>
                <Select
                  labelId='job-type'
                  defaultValue={preferenceData.jobType}
                  onChange={handleChange}
                  size='small'
                  name='jobType'
                  label='Job Type'
                >
                  <MenuItem value={'Part-Time'}>Part-Time</MenuItem>
                  <MenuItem value={'Full-Time'}>Full-Time</MenuItem>
                  <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Autocomplete
                size='small'
                value={value}
                onChange={(event: any, newValue: any) => {
                  setValue(newValue)
                }}
                inputValue={currentRole}
                onInputChange={(event, newInputValue) => {
                  setCurrentRole(newInputValue)
                }}
                id='controllable-roles'
                options={getAllRolesData?.map((Item: any) => Item?.roleName)}
                // isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => <TextField {...params} label='Role' />}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel id='preferred-shift'>Preferred Shift</InputLabel>
                <Select
                  defaultValue={preferenceData.preferredShift}
                  onChange={handleChange}
                  size='small'
                  name='preferredShift'
                  labelId='preferred-shift'
                  label='Preferred Shift'
                >
                  <MenuItem value={'Day-Shift'}>Day-Shift</MenuItem>
                  <MenuItem value={'Night-Shift'}>Night-Shift</MenuItem>
                  <MenuItem value={'Any'}>Any</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item md={6} sm={12} xs={12} columnSpacing={2}>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  defaultValue={preferenceData.expectedMinSalary}
                  onChange={handleChange}
                  fullWidth
                  name='expectedMinSalary'
                  size='small'
                  type='number'
                  label='Exp.Min-Salary'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>&#8377;</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  defaultValue={preferenceData.expectedMaxSalary}
                  onChange={handleChange}
                  fullWidth
                  name='expectedMaxSalary'
                  size='small'
                  type='number'
                  label='Exp.Max-Salary'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>&#8377;</InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogJobPreference
