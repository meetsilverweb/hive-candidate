//@ts-nocheck
//eslint-disable
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-mui'
import React from 'react'
import { setDisableValue, updateEmployee } from 'src/slice/dashboardSlice'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'

type SocialProfile = {
  name: string
  link: string
}

const DialogSocialProfile = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const { disableValue } = useSelector(state => state.dashboardReducer)
  const dispatch = useAppDispatch()
  const handleSubmit = (values: SocialProfile) => {
    const payload = {
      id: getEmployeeData?.id,
      socialProfile: values.socialProfile
    }
    dispatch(updateEmployee(payload))
    handleClose()
  }

  const schema = Yup.object().shape({
    socialProfile: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Enter a valid name'),
        link: Yup.string().required('enter a valid link')
      })
    )
  })

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          socialProfile:
            !getEmployeeData?.socialProfile || getEmployeeData?.socialProfile?.length === 0
              ? [{ name: '', link: '' }]
              : getEmployeeData?.socialProfile
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={schema}
      >
        {({ values }) => (
          <Form>
            <DialogTitle id='form-dialog-title'>Edit Social Profile</DialogTitle>
            <DialogContent>
              <FieldArray name='socialProfile'>
                {({ remove, push }) => (
                  <Box>
                    {values.socialProfile &&
                      values.socialProfile.map((data: object, index: number) => (
                        <Grid container spacing={2} key={index} mb={5}>
                          <Grid item md={6} sm={12} xs={12}>
                            <Field
                              component={TextField}
                              name={`socialProfile[${index}].name`}
                              size='small'
                              autoFocus
                              fullWidth
                              type='text'
                              label='Name'
                            />
                          </Grid>
                          <Grid item md={5} sm={12} xs={12}>
                            <Field
                              component={TextField}
                              name={`socialProfile[${index}].link`}
                              size='small'
                              fullWidth
                              type='text'
                              label='Link'
                            />
                          </Grid>
                          <Grid item md={1} sm={12} xs={12}>
                            <IconButton
                              disabled={values.socialProfile.length < 2 ? true : false}
                              color='error'
                              onClick={() => remove(index)}
                            >
                              <Icon icon='carbon:delete' />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}

                    <Button variant='contained' type='button' onClick={() => push({ name: '', link: '' })}>
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

export default DialogSocialProfile
