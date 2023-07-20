//@ts-nocheck
//eslint-disable
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
  Radio,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import { CheckboxWithLabel, RadioGroup, TextField } from 'formik-mui'
import React, { useState } from 'react'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { updateEmployee } from 'src/slice/dashboardSlice'

type WorkExperience = {
  currentCompany: string
  companyName: string
  description: string
  from: Date
  to: Date
  monthlySalary: number
  noticePeriod: number
  workName: string
}
const Test = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const theme = useTheme()
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  const handleSubmit = (values: WorkExperience) => {
    let currentCompanyStatus = values.workExperience.filter(val => (val?.currentCompany ? val?.companyName : 'None'))
    const payload = {
      ...getEmployeeData,
      currentCompany: currentCompanyStatus[0]?.currentCompany ? currentCompanyStatus[0]?.companyName : '',
      workExperience: values.workExperience
    }
    dispatch(updateEmployee(payload))
    handleClose()
  }

  //   const disableFunc = values => {
  //     values.map((val, i) => val.isPresent)
  //   }

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          workExperience: [
            {
              to: '',
              isPresent: false
            }
          ]
        }}
        onSubmit={values => handleSubmit(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <DialogTitle id='form-dialog-title'>Edit Work Experience</DialogTitle>
            <DialogContent>
              <FieldArray name='workExperience'>
                {({ remove, push }) => (
                  <Box>
                    {values.workExperience &&
                      values.workExperience.map((data, index) => (
                        <Grid
                          key={index}
                          container
                          rowSpacing={2}
                          columnSpacing={belowMd ? 0 : 2}
                          px={belowMd ? 4 : 0}
                          mb={8}
                          sx={{ border: '1px solid #dfdddd', background: '#f3f3f3', borderRadius: 2, py: 4 }}
                        >
                          <Grid container item md={10} spacing={3} sm={12} xs={12}>
                            <Grid item md={6} sm={12} xs={12}>
                              <Box>
                                {values.workExperience[index].isPresent ? (
                                  <Field
                                    component={TextField}
                                    name={`workExperience[${index}].to`}
                                    value={'Present'}
                                    size='small'
                                    fullWidth
                                    type='text'
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
                                  Label={{ label: 'Current Company' }}
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
                          </Grid>
                          <Grid item display='flex' alignItems='start' md={2} sm={12} xs={12}>
                            <Button variant='contained' color='error' type='button' onClick={() => remove(index)}>
                              -
                            </Button>
                          </Grid>
                        </Grid>
                      ))}

                    <Button
                      variant='contained'
                      type='button'
                      onClick={() =>
                        push({
                          to: '',
                          isPresent: false
                        })
                      }
                    >
                      +
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

export default Test
