// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
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
import { Card, Paper, Stack } from '@mui/material'
import CustomButton from 'src/@core/components/custom-button'
import { ErrorMessage, Form, Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
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

const LeftWrapper = styled(Box)<BoxProps>(({ theme }) => ({
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
  fontSize: '0.875rem',
  textDecoration: 'none',
  boxShadow: '8.32785px 8.32785px 24.9835px rgba(2, 2, 70, 0.15)',
  padding: '2.5rem'
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

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false)

  const router = useRouter()
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'
  const validationSchema = yup.object({
    createPassword: yup
      .string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      )
      .required('New password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('createPassword')], 'Passwords must match')
  })
  const handleSubmit = async (values: any) => {
    let payload = {
      employeeEmail: values?.employeeEmail,
      password: values?.confirmPassword
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/create-employee`, payload, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    if (res?.data?.status === 200) {
      router.push({ pathname: '/otp-verification', query: { email: payload?.employeeEmail } })
    } else if (res?.data?.status === 400) {
      toast.error('Email is already exists')
    }
  }

  return (
    <Box className='content-right' sx={{ background: 'linear-gradient(117.99deg, #C4C4C4 14.54%, #FFFFFF 42.75%)' }}>
      <LeftWrapper>
        <Box
          sx={{
            // p: [6, 12],
            px: 10,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 800, fontSize: '1.625rem', lineHeight: 1, textAlign: 'center' }}>
                Signup to get started
              </Typography>
            </Box>
            <CardWrapper>
              <Formik
                initialValues={{
                  employeeEmail: '',
                  createPassword: '',
                  confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  handleSubmit(values)
                }}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <Stack spacing={4}>
                      <FormControl>
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Icon icon={'ic:outline-mail'} />
                              </InputAdornment>
                            )
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.employeeEmail}
                          error={Boolean(errors.employeeEmail && touched.employeeEmail)}
                          // helperText={errors.companyEmail && touched.companyEmail ? errors.companyEmail : null}
                          fullWidth
                          label='Email'
                          // type='email'
                          name='employeeEmail'
                          placeholder='user@email.com'
                        />
                        <ErrorMessage name='employeeEmail' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />{' '}
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor='create-auth-password'
                          error={Boolean(errors.createPassword && touched.createPassword)}
                        >
                          Create Password
                        </InputLabel>
                        <OutlinedInput
                          label='Create Password'
                          id='create-auth-password'
                          name='createPassword'
                          value={values?.createPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(errors.createPassword && touched.createPassword)}
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Please enter password'
                          startAdornment={
                            <InputAdornment position='start'>
                              <Icon icon={'solar:password-minimalistic-input-broken'} />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <ErrorMessage name='createPassword' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />{' '}
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor='confirm-auth-password'
                          error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                        >
                          Confirm Password
                        </InputLabel>
                        <OutlinedInput
                          label='Confirm Password'
                          id='confirm-auth-password'
                          name='confirmPassword'
                          value={values?.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                          type={showConfirmedPassword ? 'text' : 'password'}
                          placeholder='Please confirm password'
                          startAdornment={
                            <InputAdornment position='start'>
                              <Icon icon={'solar:password-minimalistic-input-broken'} />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                              >
                                <Icon icon={showConfirmedPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <ErrorMessage
                          name='confirmPassword'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />{' '}
                      </FormControl>
                      <CustomButton fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
                        <span style={{ marginRight: '0.5rem' }}>Sign Up</span> <Icon icon={'mingcute:user-add-fill'} />
                      </CustomButton>
                    </Stack>
                    <Divider
                      sx={{
                        '& .MuiDivider-wrapper': { px: 6 },
                        my: theme => `${theme.spacing(4)} !important`,
                        color: 'text.disabled',
                        fontSize: '1rem'
                      }}
                      variant='middle'
                    >
                      or
                    </Divider>

                    <Stack spacing={2}>
                      <Item>Continue with Google</Item>
                      <Item>Continue with Facebook</Item>
                      <Item>Continue with Apple</Item>
                      <Item>Continue with Twitter</Item>
                    </Stack>

                    <Box
                      sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}
                    >
                      <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                      <Typography variant='body2'>
                        <LinkStyled href='/login' sx={{ fontSize: '1rem' }}>
                          Sign in instead
                        </LinkStyled>
                      </Typography>
                      <br />
                    </Box>
                    <Box>
                      <Typography textAlign={'center'} variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
                        Privacy Policy | Terms and conditions
                      </Typography>
                    </Box>
                  </Form>
                )}
              </Formik>
            </CardWrapper>
          </Box>
        </Box>
      </LeftWrapper>
      {!hidden ? (
        <Box
          sx={{
            px: 5,
            flex: 1,
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            margin: theme => theme.spacing(8, 0, 8, 8),
            textAlign: 'end'
          }}
        >
          <RegisterIllustration alt='register-illustration' src={`/images/pages/register-image.png`} />
          <Box maxWidth={500}>
            <Typography fontWeight={900} variant='h3'>
              Ready to get started? Sign up now!
            </Typography>
            <Typography fontWeight={900}>
              Discover the world’s best <br /> business services with us.
            </Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
