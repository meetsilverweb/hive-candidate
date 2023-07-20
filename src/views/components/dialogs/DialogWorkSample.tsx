//@ts-nocheck
//eslint-disable
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'
import React from 'react'
import { updateEmployee } from 'src/slice/dashboardSlice'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { Icon } from '@iconify/react'

type WorkSample = {
  name: string
  link: string
  from: Date
  to: Date
  workDescription: string
}

const DialogWorkSample = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const dispatch = useAppDispatch()
  const handleSubmit = (values: WorkSample) => {
    const payload = {
      id: getEmployeeData?.id,
      workSample: values.workSample
    }

    dispatch(updateEmployee(payload))
    handleClose()
  }
  const schema = Yup.object().shape({
    workSample: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Enter a valid name'),
        link: Yup.string().required('enter a valid link'),
        from: Yup.string().required('enter a valid date of work started'),
        to: Yup.string().required('enter a valid date of work ended')
      })
    )
  })
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          workSample:
            !getEmployeeData?.workSample || getEmployeeData?.workSample?.length === 0
              ? [{ name: '', link: '', from: '', to: '', workDescription: '' }]
              : getEmployeeData?.workSample
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={schema}
      >
        {({ values }) => (
          <Form>
            <DialogTitle id='form-dialog-title'>Edit Work Sample</DialogTitle>
            <DialogContent>
              <FieldArray name='workSample'>
                {({ remove, push }) => (
                  <Box>
                    {values.workSample &&
                      values.workSample.map((data: object, index: number) => (
                        <Grid container spacing={4} key={index} mb={10}>
                          <Grid container item md={11} sm={12} xs={12} spacing={3}>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workSample[${index}].name`}
                                size='small'
                                autoFocus
                                fullWidth
                                type='text'
                                label='Name'
                              />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workSample[${index}].link`}
                                size='small'
                                fullWidth
                                type='text'
                                label='Link'
                              />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`workSample[${index}].from`}
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
                              <Field
                                component={TextField}
                                name={`workSample[${index}].to`}
                                size='small'
                                fullWidth
                                type='date'
                                label='To'
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                              <Field
                                multiline
                                minRows={2}
                                maxRows={5}
                                component={TextField}
                                name={`workSample[${index}].workDescription`}
                                size='small'
                                fullWidth
                                label='Work Description'
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                          </Grid>

                          <Grid md={1} sm={12} xs={12} item display='flex' alignItems='center'>
                            <IconButton color='error' onClick={() => remove(index)}>
                              <Icon icon='carbon:delete' />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    <Button
                      variant='contained'
                      type='button'
                      onClick={() => push({ name: '', link: '', from: '', to: '', workDescription: '' })}
                    >
                      ADD
                    </Button>
                  </Box>
                )}
              </FieldArray>
              <DialogActions className='dialog-actions-dense'>
                <Button type='submit' variant='outlined'>
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default DialogWorkSample
