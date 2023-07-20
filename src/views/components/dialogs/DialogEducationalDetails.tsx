//@ts-nocheck
//eslint-disable
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  ListSubheader,
  MenuItem,
  Radio,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import { RadioGroup, Select, TextField } from 'formik-mui'
import React from 'react'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { updateEmployee } from 'src/slice/dashboardSlice'
import DialogDeleteConfirmation from './DialogDeleteConfirmation'

// type EducationalDetails = {
//   courseName: string
//   universityName: string
//   year: number
//   type: string
// }

const DialogEducationalDetails = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const theme = useTheme()
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()
  const handleSubmit = (values: object) => {
    const payload = {
      id: getEmployeeData?.id,
      higherEducationType: values?.higherEducationType
    }

    dispatch(updateEmployee(payload))
    handleClose()
  }
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          higherEducationType: getEmployeeData?.higherEducationType
        }}
        onSubmit={values => handleSubmit(values)}
      >
        <Form>
          <DialogTitle id='form-dialog-title'>Edit Educational Details</DialogTitle>
          <DialogContent>
            <FormControl fullWidth size='small'>
              <Field size='small' component={Select} name={`higherEducationType`} label='Highest Education'>
                <MenuItem value={'Graduate (I.T)'}>Graduate (I.T)</MenuItem>
                <MenuItem value={'Post Graduate (I.T)'}>Post Graduate (I.T)</MenuItem>
                <MenuItem value={'Doctorate'}>Doctorate</MenuItem>
                <MenuItem value={'Diploma'}>Diploma</MenuItem>
                <MenuItem value={'Any Graduate'}>Any Graduate</MenuItem>
                <MenuItem value={'Any Post Graduate'}>Any Post Graduate</MenuItem>
              </Field>
            </FormControl>
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button type='submit' variant='outlined'>
              Submit
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  )
}

export default DialogEducationalDetails
