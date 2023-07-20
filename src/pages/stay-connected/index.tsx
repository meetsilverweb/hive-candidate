// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'

import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {
  Card,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Stack
} from '@mui/material'
import CustomButton from 'src/@core/components/custom-button'
import { Field, FieldArray, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  width: '100%',
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500,
    width: 400
  }
}))

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid black'
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const CardWrapper = styled(Card)(({ theme }) => ({
  width: 600,
  fontSize: '0.875rem',
  textDecoration: 'none',
  boxShadow: '8.32785px 8.32785px 24.9835px rgba(2, 2, 70, 0.15)',
  padding: '2.5rem'
  //   overflowY: 'scroll'
  // [theme.breakpoints.down('md')]: {
  //   padding: '2rem'
  // }
  // color: theme.palette.primary.main
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const StayConnected = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [userID, setUserID] = useState('')

  // ** Vars
  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'
  useEffect(() => {
    // @ts-ignore
    setUserID(JSON.parse(localStorage.getItem('userData'))?.id)
  }, [])
  const handleSubmit = (values: any) => {
    let payload = {
      id: userID,
      firstName: values.firstName,
      lastName: values.lastName,
      employeeEmail: values.employeeEmail,
      employeePhone: values.employeePhone,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      permanantAddress: values.permanantAddress,
      employeeCity: values.employeeCity,
      employeeState: values.employeeState,
      pinCode: values.pinCode,
      role: values.currentRole,
      yearsOfRelevantExperience: values.yearsOfRelevantExperience,
      currentSalary: values.currentSalary,
      expectedSalary: values.expectedSalary,
      noticePeriod: values.noticePeriod,
      itSkills: values.itSkill,
      educationalDetails: values.educationalDetails,
      workExperience: values.workExperience,
      stayConnectedDetailsFilled: true
    }

    const res = axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/employeeUpdate/${payload?.id}`, payload, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response?.data?.status === 200) {
          router.push('/dashboard')
        } else {
          toast.error('Somthing went wrong please try again')
        }
      })
  }

  return (
    <Box className='content-right' sx={{ background: 'linear-gradient(117.99deg, #C4C4C4 14.54%, #FFFFFF 42.75%)' }}>
      <Grid container alignItems={'center'}>
        {!hidden ? (
          <Grid md={6}>
            <Box
              sx={{
                width: '100%',
                flex: 1,
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '20px',
                justifyContent: 'center',
                textAlign: 'end'
              }}
            >
              <RegisterIllustration alt='register-illustration' src={`/images/pages/stay-connected-image.png`} />
            </Box>
          </Grid>
        ) : null}
        <Grid md={6}>
          <RightWrapper>
            <Box
              sx={{
                // p: [6, 12],

                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ my: 6, width: 600 }}>
                  <Typography
                    sx={{ mb: 1.5, fontWeight: 800, fontSize: '1.625rem', lineHeight: 1, textAlign: 'center' }}
                  >
                    Signup to get started
                  </Typography>
                </Box>
                <CardWrapper>
                  <Formik
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      employeeEmail: '',
                      employeePhone: '',
                      gender: '',
                      dateOfBirth: '',
                      permanantAddress: '',
                      employeeCity: '',
                      employeeState: '',
                      pinCode: '',
                      currentRole: '',
                      yearsOfRelevantExperience: '',
                      currentSalary: 0,
                      expectedSalary: 0,
                      noticePeriod: '',
                      itSkill: [],
                      educationalDetails: [],
                      workExperience: [
                        {
                          workName: '',
                          companyName: '',
                          from: '',
                          to: '',
                          noticePeriod: 0,
                          monthlySalary: 0,
                          description: ''
                        }
                      ]
                    }}
                    onSubmit={values => handleSubmit(values)}
                  >
                    {({ values, errors, touched, handleChange, handleBlur }: any) => (
                      <Form>
                        <Box className='hiddenScrollbar' height={500} sx={{ overflowY: 'scroll' }}>
                          <Stack spacing={10}>
                            <Box>
                              <Typography mb={2} variant='h5'>
                                For us to stay connected
                              </Typography>
                              <Stack spacing={4}>
                                <Field
                                  component={TextField}
                                  name='firstName'
                                  autoFocus
                                  fullWidth
                                  label='First Name'
                                  placeholder='Enter your name'
                                />
                                <Field
                                  component={TextField}
                                  name='lastName'
                                  autoFocus
                                  fullWidth
                                  label='Last Name'
                                  placeholder='Enter your name'
                                />
                                <Field
                                  component={TextField}
                                  name='employeeEmail'
                                  fullWidth
                                  label='Email'
                                  placeholder='user@email.com'
                                />
                                <Field
                                  component={TextField}
                                  name='employeePhone'
                                  fullWidth
                                  label='Phone number'
                                  placeholder='079 - 1234567'
                                />

                                <FormControl>
                                  <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                    name='gender'
                                    value={values?.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <FormControlLabel value='female' control={<Radio />} label='Female' />
                                    <FormControlLabel value='male' control={<Radio />} label='Male' />
                                    <FormControlLabel value='transGender' control={<Radio />} label='Trans-Gender' />
                                  </RadioGroup>
                                </FormControl>

                                <Field
                                  component={TextField}
                                  name='dateOfBirth'
                                  type='date'
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                />
                                <Field
                                  component={TextField}
                                  name='permanantAddress'
                                  multiline
                                  rows={5}
                                  fullWidth
                                  label='Address'
                                />

                                <FormControl fullWidth>
                                  <InputLabel id='select-city-label'>City</InputLabel>
                                  <Select
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='employeeCity'
                                    labelId='selecy-city-label'
                                    id='select-city'
                                    label='City'
                                  >
                                    <MenuItem value={'Ahmedabad'}>Ahmedabad</MenuItem>
                                    <MenuItem value={'Vadodra'}>Vadodra</MenuItem>
                                    <MenuItem value={'Rajkot'}>Rajkot</MenuItem>
                                  </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                  <InputLabel id='select-state-label'>State</InputLabel>
                                  <Select
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='employeeState'
                                    labelId='selecy-state-label'
                                    id='select-state'
                                    label='State'
                                  >
                                    <MenuItem value='new Delhi'>New Delhi</MenuItem>
                                    <MenuItem value='maharashtra'>Maharashtra</MenuItem>
                                    <MenuItem value='gujarat'>Gujarat</MenuItem>
                                  </Select>
                                </FormControl>

                                <Field component={TextField} name='pinCode' label='Zip Code' />
                              </Stack>
                            </Box>
                            <Box>
                              <Typography mb={2} variant='h5'>
                                Tell us a little about your professional life
                              </Typography>
                              <Stack spacing={4}>
                                <Field
                                  component={TextField}
                                  name='currentRole'
                                  autoFocus
                                  fullWidth
                                  label='Current Role / Designation'
                                  placeholder='Enter Role / Designation'
                                />
                                <Field
                                  component={TextField}
                                  name='yearsOfRelevantExperience'
                                  fullWidth
                                  type='number'
                                  label='Years of relevant experience'
                                  placeholder='Enter years of experience'
                                />
                                <Field
                                  component={TextField}
                                  name='currentSalary'
                                  fullWidth
                                  type='number'
                                  label='Current Salary'
                                  placeholder='Enter Salary'
                                />

                                <Field
                                  component={TextField}
                                  name='expectedSalary'
                                  fullWidth
                                  type='number'
                                  label='Expected Salary'
                                  placeholder='Expected Salary'
                                />
                                <Field
                                  component={TextField}
                                  name='noticePeriod'
                                  fullWidth
                                  type='number'
                                  label='Notice Period'
                                  placeholder='Enter notice period term'
                                />
                              </Stack>
                            </Box>
                            <Box>
                              <Typography mb={2} variant='h5'>
                                Tell us a little about your skill set
                              </Typography>

                              <FieldArray name='itSkill'>
                                {({ push, remove }) => (
                                  <div>
                                    {values?.itSkill &&
                                      values?.itSkill?.map((data: Object, index: number) => (
                                        <Stack
                                          sx={{
                                            marginBottom: '1rem'
                                          }}
                                          spacing={4}
                                        >
                                          <Field
                                            component={TextField}
                                            name={`itSkill.[${index}].skill`}
                                            autoFocus
                                            fullWidth
                                            label='Skill'
                                            placeholder='Enter skill'
                                          />
                                          <Field
                                            component={TextField}
                                            name={`itSkill.[${index}].version`}
                                            fullWidth
                                            label='Version'
                                            placeholder='Enter version (If applicable)'
                                          />
                                          <Field
                                            component={TextField}
                                            name={`itSkill.[${index}].lastUsed`}
                                            fullWidth
                                            label='Last Used'
                                            placeholder='When you used this software?'
                                          />
                                          <Field
                                            component={TextField}
                                            name={`itSkill.[${index}].experience`}
                                            fullWidth
                                            type='number'
                                            label='Experience'
                                            placeholder='Experience of this software'
                                          />

                                          <Typography component='legend'>Rate your skill</Typography>
                                          <Rating
                                            // component={TextField}
                                            name={`itSkill.[${index}].rateYourSkill`}
                                            size='large'
                                            defaultValue={2.5}
                                            precision={0.5}
                                          />
                                          <Button
                                            type='button'
                                            color='error'
                                            variant='contained'
                                            onClick={() => remove(index)} // remove a friend from the list
                                          >
                                            Delete
                                          </Button>
                                        </Stack>
                                      ))}
                                    <Button
                                      sx={{
                                        my: 4
                                      }}
                                      variant='contained'
                                      type='button'
                                      onClick={() =>
                                        push({
                                          skill: '',
                                          version: '',
                                          lastUsed: '',
                                          experience: '',
                                          rateYourSkill: ''
                                        })
                                      }
                                    >
                                      {/* show this when user has removed all friends from the list */}
                                      Add another skill +{' '}
                                    </Button>
                                  </div>
                                )}
                              </FieldArray>
                            </Box>

                            <Box>
                              <Typography mb={2} variant='h5'>
                                Tell us a little about your work experience
                              </Typography>

                              <FieldArray
                                name='workExperience'
                                render={arrayHelpers => (
                                  <div>
                                    {values.workExperience?.map((data: Object, index: number) => (
                                      <Stack
                                        sx={{
                                          marginBottom: '1rem'
                                        }}
                                        spacing={4}
                                      >
                                        <Field
                                          component={TextField}
                                          name={`workExperience.[${index}].workName`}
                                          autoFocus
                                          fullWidth
                                          label='Role'
                                          placeholder='Enter skill'
                                        />
                                        <Field
                                          component={TextField}
                                          name={`workExperience.[${index}].companyName`}
                                          fullWidth
                                          label='Company Name'
                                          placeholder='Enter version (If applicable)'
                                        />
                                        <Field
                                          type='date'
                                          InputLabelProps={{
                                            shrink: true
                                          }}
                                          component={TextField}
                                          name={`workExperience.[${index}].from`}
                                          fullWidth
                                          label='from'
                                        />
                                        <Field
                                          component={TextField}
                                          InputLabelProps={{
                                            shrink: true
                                          }}
                                          name={`workExperience.[${index}].to`}
                                          fullWidth
                                          type='date'
                                          label='to'
                                        />
                                        <Field
                                          component={TextField}
                                          InputLabelProps={{
                                            shrink: true
                                          }}
                                          name={`workExperience.[${index}].noticePeriod`}
                                          fullWidth
                                          label='Notice Period'
                                        />
                                        <Field
                                          component={TextField}
                                          InputLabelProps={{
                                            shrink: true
                                          }}
                                          name={`workExperience.[${index}].monthlySalary`}
                                          fullWidth
                                          label='Monthly Salary'
                                        />
                                        <Field
                                          component={TextField}
                                          InputLabelProps={{
                                            shrink: true
                                          }}
                                          name={`workExperience.[${index}].description`}
                                          fullWidth
                                          label='Description'
                                        />
                                        <Button
                                          type='button'
                                          color='error'
                                          variant='contained'
                                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                        >
                                          Delete
                                        </Button>
                                      </Stack>
                                    ))}
                                    <Button
                                      sx={{
                                        my: 4
                                      }}
                                      variant='contained'
                                      type='button'
                                      onClick={() =>
                                        arrayHelpers.push({
                                          workName: '',
                                          companyName: '',
                                          from: '',
                                          to: '',
                                          noticePeriod: 0,
                                          monthlySalary: 0,
                                          description: ''
                                        })
                                      }
                                    >
                                      {/* show this when user has removed all friends from the list */}
                                      Add another expireance +{' '}
                                    </Button>
                                  </div>
                                )}
                              />
                            </Box>
                            <Box>
                              <Typography mb={2} variant='h5'>
                                Tell us a little about your Education Details
                              </Typography>

                              <FieldArray
                                name='educationalDetails'
                                render={arrayHelpers => (
                                  <div>
                                    {values.educationalDetails?.map((data: Object, index: number) => (
                                      <Stack
                                        spacing={4}
                                        sx={{
                                          marginBottom: '1rem'
                                        }}
                                      >
                                        <Field
                                          component={TextField}
                                          name={`educationalDetails.[${index}].qualification`}
                                          autoFocus
                                          fullWidth
                                          label='Qualification *'
                                          placeholder='Enter Qualification'
                                        />
                                        <Field
                                          component={TextField}
                                          name={`educationalDetails.[${index}].specialization`}
                                          fullWidth
                                          label='Specialization *'
                                          placeholder='Enter specialization field'
                                        />
                                        <Field
                                          component={TextField}
                                          name={`educationalDetails.[${index}].institute`}
                                          fullWidth
                                          label='Institute *'
                                          placeholder='Enter institute'
                                        />
                                        <Field
                                          component={TextField}
                                          name={`educationalDetails.[${index}].passingYear`}
                                          fullWidth
                                          type='number'
                                          label='Passing year *'
                                          placeholder='Enter year'
                                        />
                                        <Field
                                          component={TextField}
                                          name={`educationalDetails.[${index}].grade`}
                                          fullWidth
                                          type='number'
                                          label='Grade *'
                                          placeholder='grade'
                                        />
                                        <Button
                                          type='button'
                                          color='error'
                                          variant='contained'
                                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                        >
                                          Delete
                                        </Button>
                                      </Stack>
                                    ))}
                                    <Button
                                      sx={{
                                        my: 4
                                      }}
                                      type='button'
                                      variant='contained'
                                      onClick={() =>
                                        arrayHelpers.push({
                                          qualification: '',
                                          specialization: '',
                                          institute: '',
                                          passingYear: '',
                                          grade: ''
                                        })
                                      }
                                    >
                                      {/* show this when user has removed all friends from the list */}
                                      Add another details +{' '}
                                    </Button>
                                  </div>
                                )}
                              />
                              <CustomButton fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                                <span style={{ marginRight: '0.5rem' }}>Submit</span>{' '}
                                <Icon icon={'mingcute:user-add-fill'} />
                              </CustomButton>
                            </Box>
                          </Stack>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </CardWrapper>
              </Box>
            </Box>
          </RightWrapper>
        </Grid>
      </Grid>
    </Box>
  )
}

StayConnected.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

StayConnected.guestGuard = true

export default StayConnected
