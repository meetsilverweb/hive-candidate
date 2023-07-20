import {
  Box,
  BoxProps,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
  MenuItem,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const StayConnected = () => {
  const states = [
    {
      value: 'ahmedabad',
      label: 'Ahmedabad'
    },
    {
      value: 'rajkot',
      label: 'Rajkot'
    },
    {
      value: 'gandhinagar',
      label: 'Gandhinagar'
    },
    {
      value: 'surat',
      label: 'Surat'
    }
  ]

  const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    overflowY: 'scroll',
    border: '1px solid lightGrey',
    borderRadius: 10,
    height: 650,
    padding: '20px 50px',
    margin: 30,

    [theme.breakpoints.down('xl')]: {
      margin: 30,
      padding: '30px 50px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '20px 30px'
    }
  }))

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Container>
      <Box>
        <Grid container alignItems='center' minHeight={'100vh'}>
          {!hidden ? (
            <Grid item md={6}>
              <img src='/images/pages/Frame33.png' alt='stay-connected-image' width='100%' />
            </Grid>
          ) : null}

          <Grid item md={6} sm={12} xs={12}>
            <Card>
              <BoxWrapper className={'hiddenScrollbar'}>
                <Box mb={10}>
                  <Typography textAlign='center' variant='h5' mb={5}>
                    Tell us more about your company
                  </Typography>
                  <Stack spacing={4}>
                    <TextField label='Company Name' placeholder='Enter Company name' type='text' />
                    <TextField label='Email' placeholder='Please enter email address' type='email' />
                    <TextField label='Phone number' placeholder='079 - 1234567' type='tel' />
                    <TextField label='Mobile' placeholder='+91 - 1234567890' type='tel' />
                    <TextField type='date' />
                    <TextField label='Address' placeholder='Enter Address' multiline rows={5} />
                    <TextField label='City' placeholder='Enter City' type='text' />
                    <TextField label='ZIP Code' placeholder='Enter Zip code' type='number' />
                    <TextField label='State' defaultValue='surat' select>
                      {states.map((val, index) => (
                        <MenuItem key={index} value={val.value}>
                          {val.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField label='Country' defaultValue='surat' select>
                      {states.map((val, index) => (
                        <MenuItem key={index} value={val.value}>
                          {val.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Box>
                <Box>
                  <Typography textAlign='center' variant='h5' mb={5}>
                    Company Registration Details
                  </Typography>
                  <Stack spacing={4}>
                    <TextField label='GST Number (If any)' placeholder='Enter GST Number' type='text' />
                    <TextField label='Confirm GST Number' placeholder='Confirm GST Number' type='email' />
                    <TextField
                      label='Any ISO Badges ?'
                      placeholder='Mention ISO Badge (i.e. ISO 9001:2008).'
                      type='tel'
                    />
                    <TextField label='State' defaultValue='surat' select>
                      {states.map((val, index) => (
                        <MenuItem key={index} value={val.value}>
                          {val.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label='Notice Period'
                      placeholder='Enter notice period term your company need from employee'
                      type='tel'
                    />
                  </Stack>
                </Box>
              </BoxWrapper>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

StayConnected.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

StayConnected.guestGuard = true

export default StayConnected
