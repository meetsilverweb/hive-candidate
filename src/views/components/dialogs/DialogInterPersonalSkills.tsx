//@ts-nocheck
//eslint-disable
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Theme,
  useTheme
} from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import React from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { updateEmployee } from 'src/slice/dashboardSlice'

const DialogInterPersonalSkills = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    interpersonalSkills: Yup.array()
      .of(Yup.string().required('Enter interpersonal skill'))
      .required('At least one interpersonal skill is required')
  })

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          interpersonalSkills:
            !getEmployeeData?.interpersonalSkills || getEmployeeData?.interpersonalSkills.length === 0
              ? ['']
              : getEmployeeData?.interpersonalSkills
        }}
        onSubmit={values => {
          let payload = {
            id: getEmployeeData?.id,
            interpersonalSkills: values.interpersonalSkills
          }
          dispatch(updateEmployee(payload))
          handleClose()
        }}
        validationSchema={schema}
      >
        {({ values }) => (
          <Form>
            <DialogTitle id='form-dialog-title'>Edit Interpersonal Skills</DialogTitle>
            <DialogContent>
              <FieldArray name='interpersonalSkills'>
                {({ remove, push }) => (
                  <Box>
                    {values.interpersonalSkills &&
                      values.interpersonalSkills.map((data: object, index: number) => (
                        <Grid container spacing={2} key={index} mb={5}>
                          <Grid item sm={11} xs={12}>
                            <Field
                              component={TextField}
                              name={`interpersonalSkills.${index}`}
                              size='small'
                              autoFocus
                              fullWidth
                              type='text'
                              label={`Skill ${index + 1}`}
                            />
                          </Grid>

                          <Grid item sm={1} xs={12}>
                            <IconButton color='error' onClick={() => remove(index)}>
                              <Icon icon='carbon:delete' />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    <Button variant='contained' type='button' onClick={() => push('')}>
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

export default DialogInterPersonalSkills
