//@ts-nocheck
//eslint-disable
// ** MUI Import
// import Grid from '@mui/material/Grid'

import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
  useMediaQuery,
  useTheme
} from '@mui/material'
import CustomButton from 'src/@core/components/custom-button'
import Icon from 'src/@core/components/icon'
import React, { useEffect, useState } from 'react'
import { deepOrange } from '@mui/material/colors'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { getEmployee, updateEmployee, uploadProfile, uploadResume } from 'src/slice/dashboardSlice'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store/store'
import DialogSocialProfile from 'src/views/components/dialogs/DialogSocialProfile'
import DialogWorkSample from 'src/views/components/dialogs/DialogWorkSample'
import DialogPersonalDetails from 'src/views/components/dialogs/DialogPersonalDetails'
import DialogLanguages from 'src/views/components/dialogs/DialogLanguages'
import DialogEducationalDetails from 'src/views/components/dialogs/DialogEducationalDetails'
import DialogItSkills from 'src/views/components/dialogs/DialogItSkills'
import DialogWorkExperience from 'src/views/components/dialogs/DialogWorkExperience'
import DialogJobPreference from 'src/views/components/dialogs/DialogJobPreference'
import DialogRoleDescription from 'src/views/components/dialogs/DialogRoleDescription'
import DialogDeleteConfirmation from 'src/views/components/dialogs/DialogDeleteConfirmation'
import DialogInterPersonalSkills from 'src/views/components/dialogs/DialogInterPersonalSkills'
import moment from 'moment'

const AvatarWrap = styled('div')(() => ({
  position: 'relative'
}))
// const AvatarEdit = styled('div')(() => ({
//   position: 'absolute',
//   backgroundColor: '#5f5f5f',
//   padding: ' 14px',
//   borderRadius: '50%',
//   top: '-8px',
//   right: '-8px',
//   zIndex: '1'
// }))

// interface DataType {
//   title: string
//   chipText: string
//   progress: number
//   subtitle: string
//   chipColor?: ThemeColor
//   progressColor?: ThemeColor
// }

// const data: DataType[] = [
//   {
//     progress: 85,
//     chipText: '+92k',
//     chipColor: 'success',
//     title: 'Subscribers Gained',
//     subtitle: '1.2k new subscriber'
//   },
//   {
//     progress: 65,
//     chipText: '+38k',
//     chipColor: 'success',
//     progressColor: 'info',
//     title: 'Orders Received',
//     subtitle: '2.4k new orders'
//   }
// ]

const AnalyticsDashboard = () => {
  const { getEmployeeData, updateEmployeeData, uploadResumeData, uploadProfileData } = useSelector(
    state => state.dashboardReducer
  )

  const [employeeId, setEmployeeId] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [dialogName, setDialogName] = useState<string>('')
  const dispatch = useDispatch()
  const date = new Date(getEmployeeData?.dateOfBirth || '')

  var getFilename = function (str) {
    return str?.replace(/^.*[\\\/]/, '')
  }
  var fileName = getFilename(getEmployeeData?.resume)

  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })
  }

  const handleFile = async (e, param) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    const payload = {
      id: getEmployeeData?.id,
      file: base64,
      fileName: file.name
    }
    if (param === 'UPLOAD_RESUME') {
      dispatch(uploadResume(payload))
    } else {
      dispatch(uploadProfile(payload))
    }
  }

  const handleClickOpen = (param2: string) => {
    setOpen(true)
    setDialogName(param2)
  }

  const handleClose = () => {
    setOpen(false)
    setDialogName('')
  }

  const getYearFunc = (year: string) => {
    const totalYear = moment(year, 'YYYYMMDD').fromNow()
    return totalYear
  }

  let props = {
    open: open,
    handleClose: handleClose,
    getEmployeeData: getEmployeeData
  }

  const theme = useTheme()
  const customProp: boolean = useMediaQuery(theme.breakpoints.down('sm'))
  const CustomListItemText = styled(ListItemText)<ListItemTextProps>(({ theme }) => ({
    width: 200
  }))

  const filledFields = getEmployeeData && Object.keys(getEmployeeData).filter(field => field !== '').length
  const profileScore = (filledFields / 63) * 100

  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    //@ts-ignore
    value = JSON.parse(localStorage.getItem('userData')) || ''
    setEmployeeId(value)
  }, [])

  useEffect(() => {
    let payload = {
      id: employeeId?.id
    }
    dispatch(getEmployee(payload))
  }, [updateEmployeeData, uploadResumeData, uploadProfileData, employeeId?.id])

  return (
    <>
      <Box>
        <Container sx={{ marginY: 10 }}>
          <Box marginY={10}>
            <Grid container spacing={3}>
              <Grid item md={3} sm={6} xs={12}>
                <Box
                  sx={{
                    backgroundImage: 'url(/images/pages/ProfileStrength.png)',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <Stack spacing={8} p={3}>
                    <Typography>
                      Profile Strength: <strong>70% Complete</strong>
                    </Typography>
                    <LinearProgress sx={{ height: 5 }} variant='determinate' value={30} />
                    <Typography>Recruiters notice you from 70%</Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Box
                  sx={{
                    backgroundImage: 'url(/images/pages/PendingActions.png)',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <Stack spacing={8} p={3}>
                    <Typography>
                      Profile Strength: <strong>70% Complete</strong>
                    </Typography>
                    <LinearProgress sx={{ height: 5 }} variant='determinate' value={30} />
                    <Typography>Recruiters notice you from 70%</Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Box
                  sx={{
                    backgroundImage: 'url(/images/pages/ManageProfiles.png)',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <Stack spacing={8} p={3}>
                    <Typography>
                      Profile Strength: <strong>70% Complete</strong>
                    </Typography>
                    <LinearProgress sx={{ height: 5 }} variant='determinate' value={30} />
                    <Typography>Recruiters notice you from 70%</Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Box
                  sx={{
                    backgroundImage: 'url(/images/pages/TheftAlert.png)',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <Stack spacing={8} p={3}>
                    <Typography>
                      Profile Strength: <strong>70% Complete</strong>
                    </Typography>
                    <LinearProgress sx={{ height: 5 }} variant='determinate' value={30} />
                    <Typography>Recruiters notice you from 70%</Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container columnSpacing={3}>
              <Grid item md={3} sm={12} xs={12} mb={3}>
                <Card sx={{ p: 5 }}>
                  <Grid container spacing={5}>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={2}
                      xs={12}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <AvatarWrap>
                        <IconButton
                          sx={{
                            position: 'absolute',
                            backgroundColor: '#f3f3f3',
                            padding: '8px',
                            top: '-10px',
                            right: '-10px',
                            zIndex: '1'
                          }}
                          component='label'
                          size='large'
                          color='primary'
                        >
                          <Icon fontSize={24} icon='carbon:edit' />
                          <input hidden type='file' onChange={e => handleFile(e, 'UPLOAD_PROFILE_PICTURE')} />
                        </IconButton>

                        <Avatar
                          sx={{ width: 130, height: 130, objectFit: 'cover' }}
                          src={
                            getEmployeeData?.profilePicture
                              ? getEmployeeData?.profilePicture
                              : '/images/pages/default-profile-img.png'
                          }
                        />
                      </AvatarWrap>
                    </Grid>
                    <Grid item lg={12} md={12} sm={10} xs={12}>
                      <Grid container item spacing={3}>
                        <Grid item lg={12} md={12} sm={6} xs={12}>
                          <Typography align='center' fontWeight={800} fontSize={20}>
                            {getEmployeeData?.firstName} {getEmployeeData?.lastName}
                          </Typography>
                          <Typography>
                            {getEmployeeData?.employeeCity}
                            {getEmployeeData?.employeeState && ','} {getEmployeeData?.employeeState}
                          </Typography>
                        </Grid>

                        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Typography>I have Permanent Residency</Typography>
                        </Grid> */}

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Typography>
                            <strong>{getEmployeeData?.role}</strong> at {getEmployeeData?.currentCompany}
                          </Typography>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Typography>Exp: 0 Years 0 Months</Typography>
                          <Typography>Monthly salary :&#8377; {getEmployeeData?.currentSalary}</Typography>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Typography>
                            <strong>Mobile No:</strong> {getEmployeeData?.employeePhone}
                          </Typography>
                          <Typography>
                            <strong> Mail:</strong> {getEmployeeData?.employeeEmail}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid container item md={9} sm={12} xs={12} spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <Card
                    sx={{
                      p: 3,
                      background: 'linear-gradient(0deg, rgba(71, 145, 208, 0.2), rgba(71, 145, 208, 0.2)), #FFFFFF',
                      border: '1px solid rgba(102, 102, 102, 0.5)',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Typography fontWeight={800} variant='h6' gutterBottom>
                        Profile Summary
                      </Typography>
                      <IconButton size='large' color='primary' onClick={() => handleClickOpen('ROLE_DESCRIPTION')}>
                        <Icon fontSize={25} icon='carbon:edit' />
                      </IconButton>
                    </Box>
                    <Typography variant='body2'>{getEmployeeData?.roleDescription}</Typography>
                  </Card>
                </Grid>
                {getEmployeeData?.profilePicture === '' && (
                  <Grid item md={6} sm={6} xs={12}>
                    <Card sx={{ p: 3, height: '100%' }}>
                      <Grid container alignItems='center'>
                        <Grid item md={3}>
                          <Avatar
                            src={
                              getEmployeeData?.profilePicture
                                ? getEmployeeData?.profilePicture
                                : '/images/pages/default-profile-img.png'
                            }
                            sx={{ width: 60, height: 60 }}
                            alt='upload-profile-picture'
                          />
                        </Grid>
                        <Grid item md={9}>
                          <Box display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography>Upload Your Profile Picture.</Typography>
                            <IconButton color='primary' component={'label'}>
                              <Icon icon={'solar:upload-square-linear'} />
                              <input hidden type='file' onChange={e => handleFile(e, 'UPLOAD_PROFILE_PICTURE')} />
                            </IconButton>
                          </Box>

                          <Typography my={2} variant='body1'>
                            Let Recruiters know you better
                          </Typography>
                          <Typography variant='body2'>
                            Verified details ensure 100% authenticity to recruiters
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )}

                <Grid item md={6} sm={6} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} marginBottom={5}>
                      <Typography fontSize={20} fontWeight={800}>
                        Resume
                      </Typography>
                      <IconButton color='primary' component={'label'}>
                        <Icon icon={'solar:upload-square-linear'} />
                        <input hidden type='file' onChange={e => handleFile(e, 'UPLOAD_RESUME')} />
                      </IconButton>
                    </Box>
                    <Grid container alignItems='center'>
                      <Grid item md={3}>
                        <Avatar
                          variant='square'
                          src={'/images/pages/employee-profile-dashboard/resume.png'}
                          sx={{ width: 60, height: 80 }}
                          alt='verify-mobile-no'
                        />
                      </Grid>
                      <Grid item md={9}>
                        <Typography mb={3} variant='body2' flexWrap='wrap'>
                          {!fileName ? 'Upload Your Resume Here' : fileName}
                        </Typography>

                        <Box>
                          <Button size='small' disabled={!fileName && true}>
                            <Link
                              href={getEmployeeData?.resume ? getEmployeeData?.resume : ''}
                              target='_blank'
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              Download
                            </Link>
                          </Button>
                          <Button
                            disabled={!fileName && true}
                            onClick={() => handleClickOpen('DELETE_CONFIRM')}
                            size='small'
                            color='error'
                          >
                            Delete
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Grid container alignItems='center'>
                      <Grid item sm={10}>
                        <Typography mb={5} fontSize={20}>
                          Tips for You!
                        </Typography>
                        <Box sx={{ ml: 3 }}>
                          <Typography mb={3} variant='body1'>
                            Keep updating your profile Day-by-Day And Keep your profile updated.
                          </Typography>
                          <Typography variant='body2'>
                            It Will keep you on top in searches Done by recruiters
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item sm={2}>
                        <Avatar sx={{ width: 60, height: 60 }} alt='verify-mobile-no'>
                          B
                        </Avatar>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Typography variant='h6' mb={4} fontWeight={800}>
                      Online Presence
                    </Typography>

                    <Box sx={{ ml: 3 }}>
                      <Typography variant='body1' fontWeight={800}>
                        Social Profile
                      </Typography>

                      <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography variant='body2' gutterBottom>
                          Add links to your social profiles (eg. Linkedin , Instagram, Etc.)
                        </Typography>

                        <IconButton size='large' color='primary' onClick={() => handleClickOpen('SOCIAL_PROFILE')}>
                          <Icon fontSize={25} icon='carbon:edit' />
                        </IconButton>
                      </Box>

                      {getEmployeeData?.socialProfile &&
                        getEmployeeData?.socialProfile.map((val: object, index: number) => (
                          <Grid key={index} item container md={12} sm={12} xs={12} mb={3}>
                            <Grid item md={1} sm={1} xs={1} display={'flex'} alignItems={'center'}>
                              <Icon icon='ph:star-four-fill' />
                            </Grid>
                            <Grid item md={11} sm={11} xs={11}>
                              <Box>
                                <Typography>{val?.name}</Typography>

                                <Link target='_blank' href={val?.link} style={{ textDecoration: 'none' }}>
                                  {val?.link}
                                </Link>
                              </Box>
                            </Grid>
                          </Grid>
                        ))}
                    </Box>

                    <Box sx={{ ml: 3, mt: 5 }}>
                      <Typography variant='body1' fontWeight={800}>
                        Work Sample
                      </Typography>
                      <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography variant='body2' gutterBottom>
                          Add links to your projects (eg. Github, Behance, Kaggle etc)
                        </Typography>

                        <IconButton size='large' color='primary' onClick={() => handleClickOpen('WORK_SAMPLE')}>
                          <Icon fontSize={25} icon='carbon:edit' />
                        </IconButton>
                      </Box>

                      {getEmployeeData?.workSample &&
                        getEmployeeData?.workSample.map((val: object, index: number) => (
                          <Grid item container key={index} md={12} sm={12} xs={12} mb={3}>
                            <Grid item md={1} sm={1} xs={1}>
                              <Icon icon='ph:star-four-fill' />
                            </Grid>
                            <Grid item md={11} sm={11} xs={11}>
                              <Box>
                                <Typography fontWeight={800}>{val?.name}</Typography>
                                <Link target='_blank' href={val?.link} style={{ textDecoration: 'none' }}>
                                  {val?.link}
                                </Link>
                                <Typography variant='body2'>
                                  Duration: {val?.from} - {val?.to}
                                </Typography>
                                <Typography variant='body2'>Description: {val?.workDescription}</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        ))}
                    </Box>
                  </Card>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Box>
                      <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
                        <Typography variant='h6' fontWeight={800}>
                          Personal Details
                        </Typography>
                        <IconButton size='large' color='primary' onClick={() => handleClickOpen('PERSONAL_DETAILS')}>
                          <Icon fontSize={25} icon='carbon:edit' />
                        </IconButton>
                      </Box>
                      <Grid container columnSpacing={5}>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box sx={{ ml: 3 }}>
                            <List disablePadding>
                              <ListItem disablePadding>
                                <CustomListItemText primary='First Name:' />
                                <CustomListItemText primary={getEmployeeData?.firstName} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Last Name:' />
                                <CustomListItemText primary={getEmployeeData?.lastName} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Gender:' />
                                <CustomListItemText primary={getEmployeeData?.gender} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Marital Status:' />
                                <CustomListItemText primary={getEmployeeData?.martialStatus} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Work permit for other countries:' />
                                <CustomListItemText primary={getEmployeeData?.workPermitForOther} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Specially abled:' />
                                <CustomListItemText primary={getEmployeeData?.speciallyAbled} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Category:' />
                                <CustomListItemText primary={getEmployeeData?.category} />
                              </ListItem>
                            </List>
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                          <List disablePadding>
                            <ListItem disablePadding>
                              <CustomListItemText primary='Permanent Address:' />
                              <CustomListItemText primary={getEmployeeData?.permanantAddress || '-'} />
                            </ListItem>
                            <ListItem disablePadding>
                              <CustomListItemText primary='Date of Birth:' />
                              <CustomListItemText primary={date.toLocaleDateString()} />
                            </ListItem>
                            <ListItem disablePadding>
                              <CustomListItemText primary='Work permit for other countries Except USA:' />
                              <CustomListItemText primary={getEmployeeData?.workPermitForOtherExceptUsa} />
                            </ListItem>
                            <ListItem disablePadding>
                              <CustomListItemText primary='Pin Code:' />
                              <CustomListItemText primary={getEmployeeData?.pinCode || '-'} />
                            </ListItem>
                            <ListItem disablePadding>
                              <CustomListItemText primary='City:' />
                              <CustomListItemText primary={getEmployeeData?.employeeCity || '-'} />
                            </ListItem>
                            <ListItem disablePadding>
                              <CustomListItemText primary='State:' />
                              <CustomListItemText primary={getEmployeeData?.employeeState || '-'} />
                            </ListItem>
                            <ListItem disablePadding>
                              <CustomListItemText primary='Country:' />
                              <CustomListItemText primary={getEmployeeData?.employeeCountry || '-'} />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box mt={5}>
                      <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
                        <Typography variant='h6' fontWeight={800}>
                          Languages Known
                        </Typography>

                        <IconButton size='large' color='primary' onClick={() => handleClickOpen('LANGUAGES_KNOWN')}>
                          <Icon fontSize={25} icon='carbon:edit' />
                        </IconButton>
                      </Box>
                      <Box>
                        <TableContainer>
                          <Table
                            size='small'
                            sx={{
                              [`& .${tableCellClasses.root}`]: {
                                borderBottom: 'none'
                              }
                            }}
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Languages</TableCell>
                                <TableCell>Proficiency</TableCell>
                                <TableCell>Read</TableCell>
                                <TableCell>Write</TableCell>
                                <TableCell>Speak</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {getEmployeeData?.english &&
                                getEmployeeData?.english.map((data, index) => (
                                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                      {data?.name}
                                    </TableCell>
                                    <TableCell>{data?.proficiency}</TableCell>
                                    <TableCell>{data?.read}</TableCell>
                                    <TableCell>{data?.speak}</TableCell>
                                    <TableCell>{data?.write}</TableCell>
                                  </TableRow>
                                ))}
                              {getEmployeeData?.languagesKnown &&
                                getEmployeeData?.languagesKnown.map((val: object, index: number) => (
                                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                      {val?.languages}
                                    </TableCell>
                                    <TableCell>{val?.proficiency}</TableCell>
                                    <TableCell>{val?.read}</TableCell>
                                    <TableCell>{val?.speak}</TableCell>
                                    <TableCell>{val?.write}</TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
                  </Card>
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Box mb={4} px={2} display='flex' justifyContent='space-between'>
                      <Typography variant='h6' fontWeight={800}>
                        Highest Education
                      </Typography>
                      <IconButton size='large' color='primary' onClick={() => handleClickOpen('EDUCATIONAL_DETAILS')}>
                        <Icon fontSize={25} icon='carbon:edit' />
                      </IconButton>
                    </Box>

                    {/* {getEmployeeData?.educationalDetails &&
                      getEmployeeData?.educationalDetails.map((val: object, index: number) => (
                        <Grid key={index} item container md={12} sm={12} xs={12} mb={3}>
                          <Grid item md={1} sm={1} xs={1} display={'flex'} alignItems={'center'}>
                            <Icon icon='ph:star-four-fill' />
                          </Grid>
                          <Grid item md={11} sm={11} xs={11}>
                            <Box>
                              <Typography>{val?.courseName}</Typography>
                              <Typography variant='body2'>{val?.universityName}</Typography>
                              <Typography variant='body1'>
                                {val?.year} ({val?.type})
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      ))} */}
                    <Box
                      sx={{
                        ml: 3
                      }}
                    >
                      <Grid item md={12} sm={12} xs={12} mb={3}>
                        {getEmployeeData?.higherEducationType && (
                          <Chip label={getEmployeeData?.higherEducationType} color='primary' />
                        )}
                      </Grid>
                    </Box>
                  </Card>
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Box mb={4} px={2} display='flex' justifyContent='space-between'>
                      <Typography variant='h6' fontWeight={800}>
                        IT Skills
                      </Typography>
                      <IconButton size='large' color='primary' onClick={() => handleClickOpen('ITSKILLS')}>
                        <Icon fontSize={25} icon='carbon:edit' />
                      </IconButton>
                    </Box>

                    <Box>
                      <TableContainer>
                        <Table
                          size='small'
                          sx={{
                            [`& .${tableCellClasses.root}`]: {
                              borderBottom: 'none'
                            }
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Skill</TableCell>
                              <TableCell>Version</TableCell>
                              <TableCell>Last Used</TableCell>
                              <TableCell>Experience</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {getEmployeeData?.itSkills &&
                              getEmployeeData?.itSkills.map((val: object, index: number) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component='th' scope='row'>
                                    {val?.skill}
                                  </TableCell>
                                  <TableCell>{val?.version}</TableCell>
                                  <TableCell>{getYearFunc(val?.lastUsed)}</TableCell>
                                  <TableCell>{val?.experience}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Card>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Box px={2} display='flex' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h6' fontWeight={800}>
                          Interpersonal Skills
                        </Typography>
                        <IconButton
                          size='large'
                          color='primary'
                          onClick={() => handleClickOpen('INTERPERSONAL_SKILLS')}
                        >
                          <Icon fontSize={25} icon='carbon:edit' />
                        </IconButton>
                      </Box>

                      <Box sx={{ ml: 3 }}>
                        {getEmployeeData?.interpersonalSkills?.map((skills, index) => (
                          <Chip key={index} color='primary' label={skills} sx={{ m: 1 }} />
                        ))}
                      </Box>
                    </Stack>
                  </Card>
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Box mb={4} px={2} display='flex' justifyContent='space-between'>
                      <Typography variant='h6' fontWeight={800}>
                        Work Experience
                      </Typography>
                      <IconButton size='large' color='primary' onClick={() => handleClickOpen('WORK_EXPERIENCE')}>
                        <Icon fontSize={25} icon='carbon:edit' />
                      </IconButton>
                    </Box>

                    {getEmployeeData?.workExperience &&
                      getEmployeeData?.workExperience.map((val: object, index: number) => (
                        <Grid key={index} item container md={12} sm={12} xs={12} mb={5}>
                          <Grid item md={1} sm={1} xs={1} display={'flex'} alignItems={'center'}>
                            <Icon icon='ph:star-four-fill' />
                          </Grid>
                          <Grid item md={11} sm={11} xs={11}>
                            <Box>
                              <Typography>{val?.workName}</Typography>
                              <Typography variant='body2'>
                                {val?.from} to {val?.to}
                              </Typography>
                              <Typography variant='body1'>
                                Notice Period : {val?.noticePeriod} {val?.noticePeriod && 'Days'}
                              </Typography>
                              <Typography variant='body1'>Monthly salary : &#8377; {val?.monthlySalary}</Typography>
                              <Typography variant='body2'>{val?.description}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      ))}
                  </Card>
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                  <Card sx={{ p: 3, height: '100%' }}>
                    <Box>
                      <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
                        <Typography variant='h6' fontWeight={800}>
                          Job Preferences
                        </Typography>
                        <IconButton size='large' color='primary' onClick={() => handleClickOpen('JOB_PREFERENCES')}>
                          <Icon fontSize={25} icon='carbon:edit' />
                        </IconButton>
                      </Box>
                      <Grid container columnSpacing={5}>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box sx={{ ml: 3 }}>
                            <List disablePadding>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Preferred City:' />
                                <CustomListItemText primary={getEmployeeData?.preferredLocation} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Job Type:' />
                                <CustomListItemText primary={getEmployeeData?.jobType} />
                              </ListItem>
                              <ListItem disablePadding>
                                <CustomListItemText primary='Role:' />
                                <CustomListItemText primary={getEmployeeData?.role} />
                              </ListItem>
                            </List>
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                          <List disablePadding>
                            <ListItem disablePadding>
                              <CustomListItemText primary='Preffered Shift:' />
                              <CustomListItemText primary={getEmployeeData?.preferredShift} />
                            </ListItem>
                            <ListItem disablePadding>
                              <CustomListItemText primary='Expected Salary:' />
                              <CustomListItemText>
                                &#8377; {getEmployeeData?.expectedMinSalary} to &#8377;{' '}
                                {getEmployeeData?.expectedMaxSalary}
                              </CustomListItemText>
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {dialogName === 'INTERPERSONAL_SKILLS' && <DialogInterPersonalSkills {...props} />}
      {dialogName === 'ROLE_DESCRIPTION' && <DialogRoleDescription {...props} />}
      {dialogName === 'SOCIAL_PROFILE' && <DialogSocialProfile {...props} />}
      {dialogName === 'WORK_SAMPLE' && <DialogWorkSample {...props} />}
      {dialogName === 'PERSONAL_DETAILS' && <DialogPersonalDetails {...props} />}
      {dialogName === 'LANGUAGES_KNOWN' && <DialogLanguages {...props} />}
      {dialogName === 'EDUCATIONAL_DETAILS' && <DialogEducationalDetails {...props} />}
      {dialogName === 'ITSKILLS' && <DialogItSkills {...props} />}
      {dialogName === 'WORK_EXPERIENCE' && <DialogWorkExperience {...props} />}
      {/* {dialogName === 'WORK_EXPERIENCE' && <Test {...props} />} */}
      {dialogName === 'JOB_PREFERENCES' && <DialogJobPreference {...props} />}

      {dialogName === 'DELETE_CONFIRM' && <DialogDeleteConfirmation {...props} />}
    </>
  )
}

export default AnalyticsDashboard
