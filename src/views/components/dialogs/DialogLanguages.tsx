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
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Field, FieldArray, Form, Formik } from 'formik'
import { RadioGroup, Select, TextField } from 'formik-mui'
import React from 'react'
import * as Yup from 'yup'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { updateEmployee } from 'src/slice/dashboardSlice'

type LanguagesKnown = {
  languages: string
  proficiency: string
  read: string
  write: string
  speak: string
}

const DialogLanguages = ({ open, handleClose, getEmployeeData }: boolean | any) => {
  const theme = useTheme()
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()
  const handleSubmit = (values: LanguagesKnown) => {
    const payload = {
      id: getEmployeeData?.id,
      languagesKnown: values.languagesKnown
    }

    dispatch(updateEmployee(payload))
    handleClose()
  }

  const schema = Yup.object().shape({
    languagesKnown: Yup.array().of(
      Yup.object().shape({
        languages: Yup.string().required('Enter a language'),
        proficiency: Yup.string().required('enter your proficiency')
      })
    )
  })

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Formik
        initialValues={{
          languagesKnown:
            !getEmployeeData?.languagesKnown || getEmployeeData?.languagesKnown?.length === 0
              ? [{ languages: '', proficiency: getEmployeeData?.english, read: '', write: '', speak: '' }]
              : getEmployeeData?.languagesKnown
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={schema}
      >
        {({ values }) => (
          <Form>
            <DialogTitle id='form-dialog-title'>Edit Language</DialogTitle>
            <DialogContent>
              <FieldArray name='languagesKnown'>
                {({ remove, push }) => (
                  <Box>
                    {values.languagesKnown &&
                      values.languagesKnown.map((data: object, index: number) => (
                        <Grid
                          key={index}
                          container
                          rowSpacing={2}
                          columnSpacing={belowMd ? 0 : 4}
                          px={belowMd ? 4 : 0}
                          mb={10}
                        >
                          <Grid container item md={11} sm={12} xs={12} spacing={3}>
                            <Grid item md={6} sm={12} xs={12}>
                              <Field
                                component={TextField}
                                name={`languagesKnown[${index}].languages`}
                                size='small'
                                autoFocus
                                fullWidth
                                type='text'
                                label='Language'
                              />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                              <FormControl fullWidth>
                                <Field
                                  size='small'
                                  component={Select}
                                  label='Proficiency'
                                  name={`languagesKnown[${index}].proficiency`}
                                >
                                  <MenuItem value={'Beginner'}>Beginner</MenuItem>
                                  <MenuItem value={'Proficient'}>Proficient</MenuItem>
                                  <MenuItem value={'Expert'}>Expert</MenuItem>
                                </Field>
                              </FormControl>
                            </Grid>

                            <Grid item md={4} sm={12} xs={12} display='flex'>
                              <FormControl>
                                <FormLabel id='read'>Read:</FormLabel>
                                <Field
                                  component={RadioGroup}
                                  row
                                  aria-labelledby='read'
                                  name={`languagesKnown[${index}].read`}
                                >
                                  <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                                  <FormControlLabel value='No' control={<Radio />} label='No' />
                                </Field>
                              </FormControl>
                            </Grid>

                            <Grid item md={4} sm={12} xs={12}>
                              <FormControl>
                                <FormLabel id='gender'>Write:</FormLabel>
                                <Field
                                  component={RadioGroup}
                                  row
                                  aria-labelledby='write'
                                  name={`languagesKnown[${index}].write`}
                                >
                                  <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                                  <FormControlLabel value='No' control={<Radio />} label='No' />
                                </Field>
                              </FormControl>
                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                              <FormControl>
                                <FormLabel id='gender'>Speak:</FormLabel>
                                <Field
                                  component={RadioGroup}
                                  row
                                  aria-labelledby='speak'
                                  name={`languagesKnown[${index}].speak`}
                                >
                                  <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                                  <FormControlLabel value='No' control={<Radio />} label='No' />
                                </Field>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Grid item md={1} sm={12} xs={12}>
                            <IconButton color='error' onClick={() => remove(index)}>
                              <Icon icon='carbon:delete' />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    <Button
                      variant='contained'
                      type='button'
                      onClick={() => push({ languages: '', proficiency: '', read: '', write: '', speak: '' })}
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

export default DialogLanguages
