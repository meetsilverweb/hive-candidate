// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
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
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CustomButton from 'src/@core/components/custom-button'
import { Card, Paper, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid black'
}))

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  // marginTop: theme.spacing(12),
  // marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  // [theme.breakpoints.up('md')]: {
  //   maxWidth: 450
  // },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  // ** Hooks
  const auth = useAuth()

  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'login-image' : 'login-image'
  const { login, logout } = auth
  const handleErrCallback = (err: any) => {
    console.log(err)
  }

  const handleLogin = (values: any) => {
    let email = values.email
    let password = values.password
    login({ email, password }, err => handleErrCallback(err))
  }

  return (
    <Box
      position={'relative'}
      className='content-right'
      sx={{ background: 'linear-gradient(117.99deg, #C4C4C4 14.54%, #FFFFFF 42.75%)' }}
    >
      {!hidden ? (
        <Box>
          <Box position={'absolute'} top={0} left={180}>
            <LoginIllustration width={130} alt='login-illustration' src={`/images/pages/login-chandelier.png`} />
          </Box>
        </Box>
      ) : null}

      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center'
            // backgroundColor: 'customColors.bodyBg',
            // margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <Box width={400} marginTop={20}>
            <Box>
              <LoginIllustration width={'100%'} alt='login-illustration' src={`/images/pages/${imageSource}.png`} />
            </Box>
            <Box>
              <Typography variant='h4' fontWeight={800}>
                Start Your <br /> Journey With us.
              </Typography>
              <Typography variant='subtitle1' fontWeight={800}>
                Discover the world’s best <br /> business services with us.
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography align='center' variant='h5' fontWeight={800} marginBottom={5}>
            Login to get started
          </Typography>
          <Card
            sx={{
              padding: '3rem',
              boxShadow: '8.32785px 8.32785px 24.9835px rgba(2, 2, 70, 0.15)',
              borderRadius: '1rem'
            }}
            variant='outlined'
          >
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={values => handleLogin(values)}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <TextField
                      autoFocus
                      name='email'
                      type='email'
                      label='Email'
                      value={values?.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // error={Boolean(errors.email)}
                      placeholder='admin@gmail.com'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon={'ic:outline-mail'} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 1.5 }}>
                    <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>

                    <OutlinedInput
                      value={values.password}
                      onBlur={handleBlur}
                      name='password'
                      label='Password'
                      onChange={handleChange}
                      id='auth-login-v2-password'
                      type={showPassword ? 'text' : 'password'}
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
                  </FormControl>

                  <CustomButton
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    endIcon={
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                        <g transform='rotate(180 12 12)'>
                          <g
                            fill='none'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                          >
                            <path d='M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2' />
                            <path d='M20 12H7l3-3m0 6l-3-3' />
                          </g>
                        </g>
                      </svg>
                    }
                    sx={{ mb: 4 }}
                  >
                    Login
                  </CustomButton>
                  <Box>
                    <Box sx={{ padding: '0.5rem 2rem' }}>
                      <Typography
                        gutterBottom
                        sx={{ padding: '0 1rem', textDecoration: 'none', color: 'red' }}
                        align='center'
                        variant='body2'
                      >
                        <LinkStyled href='/forgot-password'>Forgot Password ?</LinkStyled>
                      </Typography>
                      <Divider>or</Divider>
                    </Box>
                    <Stack spacing={2}>
                      <Item>Continue with Google</Item>
                      <Item>Continue with Facebook</Item>
                      <Item>Continue with Apple</Item>
                      <Item>Continue with Twitter</Item>
                    </Stack>
                    <Box sx={{ padding: '0.5rem 2rem' }}>
                      <Typography gutterBottom sx={{ padding: '0 1rem' }} align='center' variant='body2'>
                        Don't have an accout?<LinkStyled href='/register'> Join Now</LinkStyled>
                      </Typography>
                      <Typography gutterBottom sx={{ padding: '0 1rem' }} align='center' variant='body2'>
                        Privacy Policy | Terms and conditions
                      </Typography>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Card>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
