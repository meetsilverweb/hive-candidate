//@ts-nocheck
//eslint-disable
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import { CheckboxWithLabel, RadioGroup, TextField } from 'formik-mui'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { updateEmployee } from 'src/slice/dashboardSlice'

type WorkExperience = {
  workName: string
  companyName: string
  from: Date
  to: string
  isPresent: boolean
  monthlySalary: number
  noticePeriod: number
  description: string
}
interface Payload {
  id: string
  currentCompany: string
  workExperience: WorkExperience
}
const DialogWorkExperience = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const theme = useTheme()
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))

  const dispatch = useAppDispatch()

  const schema = Yup.object().shape({
    workExperience: Yup.array().of(
      Yup.object().shape({
        workName: Yup.string().required('enter a valid designation'),
        companyName: Yup.string().required('enter valid company name'),
        from: Yup.string().required('enter valid start work date')
      })
    )
  })

  const handleSubmit = (values: WorkExperience) => {
    let isPresentStatus = values.workExperience.filter(val => val?.isPresent)

    let updArray = values.workExperience.map(val => ({
      ...val,
      to: val.isPresent ? 'Present' : val.to
    }))

    const payload: Payload = {
      id: getEmployeeData?.id,
      currentCompany: isPresentStatus[0]?.isPresent ? isPresentStatus[0]?.companyName : '',
      workExperience: updArray,
      currentSalary: isPresentStatus[0]?.monthlySalary || '',
      role: isPresentStatus[0]?.workName || ''
    }

    dispatch(updateEmployee(payload))
    handleClose()
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          workExperience:
            !getEmployeeData?.workExperience || getEmployeeData?.workExperience?.length === 0
              ? [
                  {
                    workName: '',
                    companyName: '',
                    from: '',
                    to: '',
                    isPresent: false,
                    noticePeriod: '',
                    monthlySalary: '',
                    description: ''
                  }
                ]
              : getEmployeeData?.workExperience
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={schema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <DialogTitle id='form-dialog-title'>Edit Work Experience</DialogTitle>
            <DialogContent>
              <FieldArray name='workExperience'>
                {({ remove, push }) => (
                  <Box>
                    {values.workExperience &&
                      values.workExperience.map((data: object, index: number) => (
                        <Grid
                          key={index}
                          container
                          rowSpacing={2}
                          columnSpacing={belowMd ? 0 : 2}
                          px={belowMd ? 4 : 0}
                          mb={10}
                        >
                          <Grid container item md={11} spacing={3} sm={12} xs={12}>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workExperience[${index}].workName`}
                                size='small'
                                autoFocus
                                fullWidth
                                type='text'
                                label='Designation'
                              />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workExperience[${index}].companyName`}
                                size='small'
                                fullWidth
                                type='text'
                                label='Company Name'
                              />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workExperience[${index}].from`}
                                size='small'
                                fullWidth
                                type='date'
                                label='From'
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <Box>
                                {values.workExperience[index].isPresent ? (
                                  <Field
                                    component={TextField}
                                    name={`workExperience[${index}].to`}
                                    size='small'
                                    fullWidth
                                    type='text'
                                    value='Present'
                                  />
                                ) : (
                                  <Field
                                    component={TextField}
                                    name={`workExperience[${index}].to`}
                                    size='small'
                                    fullWidth
                                    type='date'
                                    label='To'
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                  />
                                )}

                                <Field
                                  component={CheckboxWithLabel}
                                  type='checkbox'
                                  name={`workExperience[${index}].isPresent`}
                                  Label={{ label: 'Present' }}
                                  checked={values.workExperience[index].isPresent}
                                  onChange={() => {
                                    const updatedWorkExperience = values.workExperience.map((experience, i) => ({
                                      ...experience,
                                      isPresent: i === index && !values.workExperience[index].isPresent
                                    }))
                                    setFieldValue('workExperience', updatedWorkExperience)
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workExperience[${index}].noticePeriod`}
                                size='small'
                                fullWidth
                                type='number'
                                label='Notice Period'
                              />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workExperience[${index}].monthlySalary`}
                                size='small'
                                fullWidth
                                type='number'
                                label='Monthly Salary'
                                InputProps={{
                                  startAdornment: <InputAdornment position='start'>&#8377;</InputAdornment>
                                }}
                              />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workExperience[${index}].description`}
                                size='small'
                                fullWidth
                                type='number'
                                label='Description'
                                multiline
                                rows={3}
                              />
                            </Grid>
                          </Grid>
                          <Grid item display='flex' alignItems='start' md={1} sm={12} xs={12}>
                            <IconButton color='error' onClick={() => remove(index)}>
                              <Icon icon='carbon:delete' />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}

                    <Button
                      variant='contained'
                      type='button'
                      onClick={() =>
                        push({
                          workName: '',
                          companyName: '',
                          from: '',
                          to: '',
                          isPresent: false,
                          noticePeriod: '',
                          monthlySalary: '',
                          description: ''
                        })
                      }
                    >
                      ADD
                    </Button>
                  </Box>
                )}
              </FieldArray>
            </DialogContent>

            <DialogActions className='dialog-actions-dense'>
              <Button type='submit' variant='outlined'>
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default DialogWorkExperience
