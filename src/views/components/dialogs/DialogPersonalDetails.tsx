//@ts-nocheck
//eslint-disable
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField
} from '@mui/material'

import moment from 'moment'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { updateEmployee } from 'src/slice/dashboardSlice'
import { getAllPostalCodes } from 'src/slice/postalCodeSlice'

interface English {
  name: string
  proficiency: string
  read: string
  write: string
  speak: string
}
interface PersonalDetails {
  firstName: string
  lastName: string
  gender: string
  martialStatus: string
  english: Array<English>
  workPermitForOther: string
  speciallyAbled: string
  category: string
  permanantAddress: string
  pinCode: number
  dateOfBirth: Date
  workPermitForOtherExceptUsa: string
}
const DialogPersonalDetails = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const { getAllPostalCodeData } = useSelector(state => state.postalCodeReducer)

  const [personalData, setPersonalData] = useState<PersonalDetails>({
    firstName: getEmployeeData?.firstName || '',
    lastName: getEmployeeData?.lastName || '',
    gender: getEmployeeData?.gender || '',
    martialStatus: getEmployeeData?.martialStatus || '',
    english: getEmployeeData?.english || [],
    workPermitForOther: getEmployeeData?.workPermitForOther || '',
    speciallyAbled: getEmployeeData?.speciallyAbled || '',
    category: getEmployeeData?.category || '',
    permanantAddress: getEmployeeData?.permanantAddress || '',
    dateOfBirth: getEmployeeData?.dateOfBirth || new Date(),
    workPermitForOtherExceptUsa: getEmployeeData?.workPermitForOtherExceptUsa || '',
    pinCode: getEmployeeData?.pinCode
  })

  let postalCodeData = getAllPostalCodeData?.[0]

  const dispatch = useAppDispatch()

  const handleChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    setPersonalData(values => ({ ...values, [name]: value }))
  }

  const handleLanguageChange = (index, event) => {
    const updatedEnglish = [...personalData.english]
    updatedEnglish[index] = {
      ...updatedEnglish[index],
      [event.target.name]: event.target.value
    }
    setPersonalData({ ...personalData, english: updatedEnglish })
  }
  let DOB = new Date(personalData.dateOfBirth).toISOString().slice(0, 10)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const payload = {
      id: getEmployeeData?.id,
      employeeState: postalCodeData?.State,
      employeeCountry: postalCodeData?.Country,
      employeeCity: postalCodeData?.District,
      ...personalData
    }
    dispatch(updateEmployee(payload))
    handleClose()
  }

  // const schema = Yup.object().shape({
  //   firstName: Yup.string().required('firstname is required'),
  //   lastName: Yup.string().required('lastname is required'),
  //   gender: Yup.string().required('gender is required'),
  //   dateOfBirth: Yup.string().required('DOB is required')
  // })

  useEffect(() => {
    let payload: { pinCode: number } = { pinCode: personalData.pinCode || Number(getEmployeeData?.pinCode) }
    dispatch(getAllPostalCodes(payload))
  }, [personalData.pinCode, getEmployeeData?.pinCode])

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Edit Personal Details</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12} xs={12}>
              <Stack spacing={4}>
                <TextField
                  defaultValue={personalData.firstName}
                  onChange={handleChange}
                  name='firstName'
                  size='small'
                  autoFocus
                  fullWidth
                  type='text'
                  label='First Name'
                />

                <TextField
                  defaultValue={DOB}
                  onChange={handleChange}
                  name='dateOfBirth'
                  size='small'
                  fullWidth
                  type='date'
                  label='Date of Birth'
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <FormControl>
                  <FormLabel id='gender'>Gender:</FormLabel>
                  <RadioGroup
                    defaultValue={personalData.gender}
                    onChange={handleChange}
                    row
                    aria-labelledby='gender'
                    name='gender'
                  >
                    <FormControlLabel value='Female' control={<Radio />} label='Female' />
                    <FormControlLabel value='Male' control={<Radio />} label='Male' />
                    <FormControlLabel value='Other' control={<Radio />} label='Other' />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel id='marital-status'>Marital Status:</FormLabel>
                  <RadioGroup
                    defaultValue={personalData.martialStatus}
                    onChange={handleChange}
                    row
                    aria-labelledby='marital-status'
                    name='martialStatus'
                  >
                    <FormControlLabel value='Married' control={<Radio />} label='Married' />
                    <FormControlLabel value='Unmarried' control={<Radio />} label='Unmarried' />
                  </RadioGroup>
                </FormControl>

                <TextField
                  disabled
                  value={personalData?.english[0]?.name}
                  name='name'
                  size='small'
                  fullWidth
                  type='text'
                  label='Required Language'
                />

                {personalData.english.map((eng, index) => (
                  <Stack key={index} spacing={2}>
                    <FormControl fullWidth size='small'>
                      <InputLabel id='proficiency-select'>Proficiency</InputLabel>
                      <Select
                        labelId='proficiency-select'
                        value={eng.proficiency}
                        onChange={event => handleLanguageChange(index, event)}
                        name='proficiency'
                        label='Proficiency'
                      >
                        <MenuItem value={'Beginner'}>Beginner</MenuItem>
                        <MenuItem value={'Proficient'}>Proficient</MenuItem>
                        <MenuItem value={'Expert'}>Expert</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel id='english-read'>Read:</FormLabel>
                      <RadioGroup
                        value={eng.read}
                        onChange={event => handleLanguageChange(index, event)}
                        row
                        aria-labelledby='english-read'
                        name='read'
                      >
                        <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                        <FormControlLabel value='No' control={<Radio />} label='No' />
                      </RadioGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel id='english-write'>Write:</FormLabel>
                      <RadioGroup
                        value={eng.write}
                        onChange={event => handleLanguageChange(index, event)}
                        row
                        aria-labelledby='english-write'
                        name='write'
                      >
                        <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                        <FormControlLabel value='No' control={<Radio />} label='No' />
                      </RadioGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel id='english-speak'>Speak:</FormLabel>
                      <RadioGroup
                        value={eng.speak}
                        onChange={event => handleLanguageChange(index, event)}
                        row
                        aria-labelledby='english-speak'
                        name='speak'
                      >
                        <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                        <FormControlLabel value='No' control={<Radio />} label='No' />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Stack spacing={4}>
                <TextField
                  defaultValue={personalData.lastName}
                  onChange={handleChange}
                  name='lastName'
                  size='small'
                  autoFocus
                  fullWidth
                  type='text'
                  label='Last Name'
                />

                <FormControl fullWidth size='small'>
                  <InputLabel id='category-select'>Category</InputLabel>
                  <Select
                    labelId='category-select'
                    defaultValue={personalData.category}
                    onChange={handleChange}
                    name='category'
                    label='Category'
                  >
                    <MenuItem value={'General'}>General</MenuItem>
                    <MenuItem value={'OBC'}>OBC</MenuItem>
                    <MenuItem value={'ST/SC'}>ST/SC</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  defaultValue={personalData.permanantAddress}
                  onChange={handleChange}
                  name='permanantAddress'
                  size='small'
                  fullWidth
                  type='text'
                  label='Permanent Address'
                />

                <FormControl>
                  <FormLabel id='specially-abled'>Specially Abled:</FormLabel>
                  <RadioGroup
                    defaultValue={personalData.speciallyAbled}
                    onChange={handleChange}
                    row
                    aria-labelledby='specially-abled'
                    name='speciallyAbled'
                  >
                    <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                    <FormControlLabel value='No' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel id='work-permit-for-other-countries-except-usa'>
                    Work Permit for Other Countries Except USA:
                  </FormLabel>
                  <RadioGroup
                    defaultValue={personalData.workPermitForOtherExceptUsa}
                    onChange={handleChange}
                    row
                    aria-labelledby='work-permit-for-other-countries-except-usa'
                    name='workPermitForOtherExceptUsa'
                  >
                    <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                    <FormControlLabel value='No' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel id='work-permit-for-other-countries'>Work Permit for Other Countries:</FormLabel>
                  <RadioGroup
                    defaultValue={personalData.workPermitForOther}
                    onChange={handleChange}
                    row
                    aria-labelledby='work-permit-for-other-countries'
                    name='workPermitForOther'
                  >
                    <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                    <FormControlLabel value='No' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>

                <TextField
                  defaultValue={personalData?.pinCode && personalData?.pinCode}
                  onChange={handleChange}
                  name='pinCode'
                  size='small'
                  fullWidth
                  type='number'
                  label='Pin Code'
                />

                <TextField
                  disabled
                  value={postalCodeData?.District || ''}
                  name='employeeCity'
                  size='small'
                  fullWidth
                  type='text'
                  label='City'
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <TextField
                  disabled
                  value={postalCodeData?.State || ''}
                  name='employeeState'
                  size='small'
                  fullWidth
                  type='text'
                  label='State'
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <TextField
                  disabled
                  value={postalCodeData?.Country || ''}
                  name='employeeCountry'
                  size='small'
                  fullWidth
                  type='text'
                  label='Country'
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Stack>
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

export default DialogPersonalDetails
