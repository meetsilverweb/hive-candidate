//@ts-nocheck
//eslint-disable
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'
import React from 'react'
import { updateEmployee } from 'src/slice/dashboardSlice'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { Icon } from '@iconify/react'

type ItSkills = {
  skill: string
  version: string
  lastUsed: Date
  experience: string
}

const DialogItSkills = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const theme = useTheme()
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()
  const handleSubmit = (values: ItSkills) => {
    const payload = {
      id: getEmployeeData?.id,
      itSkills: values.itSkills
    }

    dispatch(updateEmployee(payload))
    handleClose()
  }

  const schema = Yup.object().shape({
    itSkills: Yup.array().of(
      Yup.object().shape({
        skill: Yup.string().required('enter a skill'),
        experience: Yup.string().required('enter your experience')
      })
    )
  })
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          itSkills:
            !getEmployeeData?.itSkills || getEmployeeData?.itSkills?.length === 0
              ? [{ skill: '', version: '', lastUsed: '', experience: '' }]
              : getEmployeeData?.itSkills
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={schema}
      >
        {({ values }) => (
          <Form>
            <DialogTitle id='form-dialog-title'>Edit IT Skills</DialogTitle>
            <DialogContent>
              <FieldArray name='itSkills'>
                {({ remove, push }) => (
                  <Box>
                    {values.itSkills &&
                      values.itSkills.map((data: object, index: number) => (
                        <Grid
                          container
                          columnSpacing={belowMd ? 0 : 4}
                          px={belowMd ? 4 : 0}
                          rowSpacing={2}
                          key={index}
                          mb={10}
                        >
                          <Grid item container spacing={3} md={11} sm={12} xs={12}>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`itSkills[${index}].skill`}
                                size='small'
                                autoFocus
                                fullWidth
                                type='text'
                                label={`Skill ${index + 1}`}
                              />
                            </Grid>

                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`itSkills[${index}].version`}
                                size='small'
                                fullWidth
                                type='text'
                                label='Version'
                              />
                            </Grid>

                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`itSkills[${index}].lastUsed`}
                                size='small'
                                fullWidth
                                type='date'
                                label='Last Used'
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>

                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`itSkills[${index}].experience`}
                                size='small'
                                fullWidth
                                type='number'
                                label='Experience'
                              />
                            </Grid>
                          </Grid>
                          <Grid item display='flex' alignItems='center' md={1} sm={12} xs={12}>
                            <IconButton color='error' onClick={() => remove(index)}>
                              <Icon icon='carbon:delete' />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    <Button
                      variant='contained'
                      type='button'
                      onClick={() => push({ skill: '', version: '', lastUsed: '', experience: '' })}
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

export default DialogItSkills
