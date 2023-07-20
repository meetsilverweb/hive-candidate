//@ts-nocheck
//eslint-disable
// ** React Imports
import { ChangeEvent, Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import MuiStep, { StepProps } from '@mui/material/Step'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { Field, Form, Formik, FormikProps } from 'formik'
import * as yup from 'yup'
import { Checkbox, Chip, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material'
import { Stack, height, margin, padding } from '@mui/system'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { addJobPost, getJobPreferanceById, getJobPreferenceById, updateJobPost } from 'src/slice/jobPreferenceSlice'
import { useRouter } from 'next/router'

export interface createJobInterface {
  //job details
  id?: string | undefined | null | any
  companyName?: string | undefined | null
  jobRole?: string | undefined | null
  department?: string | undefined | null
  categories?: string | undefined | null
  typeOfJob?: string | undefined | null
  location?: string | undefined | null
  minSalary?: string | undefined | null
  maxSalary?: string | undefined | null
  additionalperks?: any
  bond?: string | undefined | null
  bondType?: string | undefined | null
  periodsOfBond?: string | undefined | null
  minEducation?: string | undefined | null
  gender?: string | undefined | null
  ageCriteria?: string | undefined | null
  minAge?: number | undefined | null
  maxAge?: number | undefined | null
  experianceRequired?: string | undefined | null
  experienced?: string | undefined | null
  onlyDepartmentForApply?: string | undefined | null
  multipleDepartmentForApply?: string | undefined | null
  candidatesIndustryExperianced?: any //max 10 industry
  englishLevel?: string | undefined | null
  skillPreferance?: any
  jobDescription?: string | undefined | null
  //interview information
  connectingWithCandidates?: string | undefined | null
  //if connectingWithCandidates === my self
  typeOfInterview?: string | undefined | null
  // if typeOfInterview === in-person
  interviewCity?: string | undefined | null
  interviewState?: string | undefined | null
  interviewCompleteAddress?: string | undefined | null
  companyAddressSameAsinterviewAddress?: boolean
  //if companyAddressSameAsinterviewAddress === false then
  companyCity?: string | undefined | null
  companyState?: string | undefined | null
  companyCompleteAddress?: string | undefined | null
}

const steps = [
  {
    icon: 'tabler:home',
    title: 'Basic Details',
    subtitle: 'We use this information to find the best candidate for the job.'
  },
  {
    icon: 'tabler:user',
    title: 'Candidate Requirements',
    subtitle: 'We’ll use these requirement details to make your job visible to the right candidates.'
  },
  {
    icon: 'tabler:link',
    title: 'Interview Details',
    subtitle: 'Who would be connecting with candidates for this job?'
  }
]

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed + svg': {
    color: theme.palette.primary.main
  }
}))

const StepperCustomHorizontal = () => {
  // ** States
  const additionalPerksArray = [1, 2, 3, 4, 5, 6]
  let lStorage = typeof window !== 'undefined' ? localStorage.getItem('jobPreferanceID') : null

  const [activeStep, setActiveStep] = useState<number>(0)
  const [ID, setID] = useState<any>(lStorage)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const JOBID = useSelector((state: RootState) => state?.jobPreferanceReducer?.JobPreferanceById)
  const jobPostData = useSelector((state: RootState) => state?.jobPreferanceReducer?.jobPostData)
  const getByIdJobPost = async () => {
    if (ID !== '' && ID) {
      let payload = {
        id: ID
      }
      dispatch(getJobPreferenceById(payload))
    }
  }

  const initialValues = {
    //job details
    companyName: jobPostData?.companyName ? jobPostData?.companyName : '',
    jobRole: jobPostData?.jobRole ? jobPostData?.jobRole : '',
    department: jobPostData?.department ? jobPostData?.department : '',
    categories: jobPostData?.categories ? jobPostData?.categories : '',
    typeOfJob: jobPostData?.typeOfJob ? jobPostData?.typeOfJob : '',
    location: jobPostData?.location ? jobPostData?.location : '',
    minSalary: jobPostData?.minSalary ? jobPostData?.minSalary : 0,
    maxSalary: jobPostData?.maxSalary ? jobPostData?.maxSalary : 0,
    additionalperks: jobPostData?.additionalperks ? jobPostData?.additionalperks : [],
    bond: jobPostData?.bond ? jobPostData?.bond : '',
    bondType: jobPostData?.bondType ? jobPostData?.bond : '',
    periodsOfBond: jobPostData?.periodsOfBond ? jobPostData?.periodsOfBond : '',
    //candidate requirements
    minEducation: jobPostData?.minEducation ? jobPostData?.minEducation : '',
    gender: jobPostData?.gender ? jobPostData?.gender : '',
    ageCriteria: jobPostData?.ageCriteria ? jobPostData?.ageCriteria : '',
    minAge: jobPostData?.minAge ? jobPostData?.minAge : '',
    maxAge: jobPostData?.maxAge ? jobPostData?.maxAge : '',
    experianceRequired: jobPostData?.experianceRequired ? jobPostData?.experianceRequired : '',
    experienced: jobPostData?.experienced ? jobPostData?.experienced : '',
    onlyDepartmentForApply: jobPostData?.onlyDepartmentForApply ? jobPostData?.onlyDepartmentForApply : '',
    multipleDepartmentForApply: jobPostData?.multipleDepartmentForApply ? jobPostData?.multipleDepartmentForApply : '',
    // typeDepartmentToSearch: jobPostData?.typeDepartmentToSearch ? jobPostData?.typeDepartmentToSearch,
    // typeIndustryToSearch: '',
    candidatesIndustryExperianced: jobPostData?.candidatesIndustryExperianced
      ? jobPostData?.candidatesIndustryExperianced
      : [], //max 10 industry
    englishLevel: jobPostData?.englishLevel ? jobPostData?.englishLevel : '',
    skillPreferance: jobPostData?.skillPreferance ? jobPostData?.skillPreferance : [],
    jobDescription: jobPostData?.jobDescription ? jobPostData?.jobDescription : '',
    //interview information
    connectingWithCandidates: jobPostData?.connectingWithCandidates ? jobPostData?.connectingWithCandidates : '',
    //if connectingWithCandidates === my self
    // recruitersName: jobPostData?.recruitersName ? jobPostData?.recruitersName : '',
    // hrContactNumber: jobPostData?.hrContactNumber ? jobPostData?.hrContactNumber : '',
    // contactEmail: jobPostData?.contactEmail ? jobPostData?.contactEmail : '',
    //if connectingWithCandidates === other recruiter
    // if typeOfInterview === in-person
    typeOfInterview: jobPostData?.typeOfInterview ? jobPostData?.typeOfInterview : '',
    interviewState: jobPostData?.interviewState ? jobPostData?.interviewState : '',
    interviewCity: jobPostData?.interviewCity ? jobPostData?.interviewCity : '',
    interviewCompleteAddress: jobPostData?.interviewCompleteAddress ? jobPostData?.interviewCompleteAddress : '',
    companyAddressSameAsinterviewAddress: jobPostData?.companyAddressSameAsinterviewAddress
      ? jobPostData?.companyAddressSameAsinterviewAddress
      : false,
    //if companyAddressSameAsinterviewAddress === false then
    companyCity: jobPostData?.companyCity ? jobPostData?.companyCity : '',
    companyState: jobPostData?.companyState ? jobPostData?.companyState : '',
    companyCompleteAddress: jobPostData?.companyCompleteAddress ? jobPostData?.companyCompleteAddress : ''
  }
  const validationSchema = yup.object({
    companyName: yup.string().required('Company is required'),
    jobRole: yup.string().required('jobRole is required'),
    department: yup.string().required('Department is required'),
    typeOfJob: yup.string().required('typeOfJob is required')
  })

  useEffect(() => {
    getByIdJobPost()
  }, [])

  useEffect(() => {
    setID(lStorage)
  }, [])
  const handleDelete = (item: any) => {
    // additionalPerksArray.pop()
  }

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  }
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ]

  const handleFormSubmitClick = (values: createJobInterface, { resetForm }: any) => {
    const payload: createJobInterface = {
      companyName: values?.companyName,
      jobRole: values?.jobRole,
      department: values?.department,
      categories: values?.categories,
      typeOfJob: values?.typeOfJob,
      location: values?.location,
      minSalary: values?.minSalary,
      maxSalary: values?.maxSalary,
      additionalperks: values?.additionalperks,
      bond: values?.bond,
      bondType: values?.bondType,
      periodsOfBond: values?.periodsOfBond,
      minEducation: values?.minEducation,
      gender: values?.gender,
      ageCriteria: values?.ageCriteria,
      minAge: values?.minAge,
      maxAge: values?.maxAge,
      experianceRequired: values?.experianceRequired,
      experienced: values?.experienced,
      onlyDepartmentForApply: values?.onlyDepartmentForApply,
      multipleDepartmentForApply: values?.multipleDepartmentForApply,
      candidatesIndustryExperianced: values?.candidatesIndustryExperianced, //max 10 industry
      englishLevel: values?.englishLevel,
      skillPreferance: values?.skillPreferance,
      jobDescription: values?.jobDescription,
      connectingWithCandidates: values?.connectingWithCandidates,
      typeOfInterview: values?.typeOfInterview,
      interviewCity: values?.interviewCity,
      // interviewState: values?.interviewState,
      interviewCompleteAddress: values?.interviewCompleteAddress,
      companyAddressSameAsinterviewAddress: values?.companyAddressSameAsinterviewAddress,
      companyCity: values?.companyCity,
      // companyState: values?.companyState,
      companyCompleteAddress: values?.companyCompleteAddress
      // saveStatus: 'draft'
    }

    if (JOBID !== '' && JOBID) {
      payload.id = JOBID
      console.log('-------------->EDIT API<---------------------', JOBID)
      dispatch(updateJobPost(payload))
    } else {
      console.log('-------------->ADD API<---------------------', JOBID)
      dispatch(addJobPost(payload))
    }

    if (activeStep === steps.length) {
      router.push('/job-dashboard')
      resetForm()
    }
    setActiveStep(activeStep + 1)
  }

  // Handle Stepper
  const handleBack = (values: any) => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  //multiselect dropdown end
  const getStepContent = (step: number, values: any, touched: any, errors: any, handleChange: any) => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <p
              style={{
                color: 'red'
              }}
            >
              * marked fields are mandatory.
            </p>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name='companyName'
                  label='Company Name *'
                  value={values?.companyName}
                  placeholder='Company Name'
                  onChange={handleChange}
                  type='text'
                  helperText={errors.companyName && touched.companyName ? errors.companyName : ''}
                  error={errors.companyName && touched.companyName ? true : false}
                  sx={{
                    marginBottom: 3
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name='jobRole'
                  label='Job Title / Job Role *'
                  value={values?.jobRole}
                  placeholder='Job Title / Job Role *'
                  onChange={handleChange}
                  type='text'
                  error={errors.jobRole && touched.jobRole ? true : false}
                  helperText={errors.jobRole && touched.jobRole ? errors.jobRole : ''}
                  sx={{
                    marginBottom: 3
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name='department'
                  label='Department / Function *'
                  value={values?.department}
                  placeholder='Department / Function *'
                  onChange={handleChange}
                  type='text'
                  error={errors.department && touched.department ? true : false}
                  helperText={errors.department && touched.department ? errors.department : ''}
                  sx={{
                    marginBottom: 3
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name='categories'
                  label='Category / Role'
                  value={values?.categories}
                  placeholder='Category / Role'
                  onChange={handleChange}
                  type='text'
                  sx={{
                    marginBottom: 3
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name='typeOfJob'
                  label='Type of Job *'
                  value={values?.typeOfJob}
                  placeholder='Type of Job *'
                  onChange={handleChange}
                  type='text'
                  sx={{
                    marginBottom: 3
                  }}
                />
              </Grid>
            </Grid>{' '}
            <Grid container spacing={2} columns={16}>
              <Grid item xs={16}>
                <Divider
                  sx={{
                    margin: 0,
                    border: '1px solid #66666680',
                    marginBottom: 3
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={12}>
                <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Location
                </Typography>
                <Typography variant='caption' component='p'>
                  Let candidates know where they will be working from.
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 700, color: 'text.primary' }}>
                  What is the job location for candidates? *
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <RadioGroup row value={values?.location} name='location' onChange={handleChange}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: ' 2px solid rgba(102, 102, 102, 0.5)',
                        borderRadius: '10px',
                        margin: 5
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          height: '200px',
                          width: '200px'
                        }}
                      >
                        <FormControlLabel value='a' control={<Radio />} label='' />{' '}
                        <img src='images/pages/workFromHome.png' />
                        <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                          Work From Office
                        </Typography>
                        <Typography variant='caption' component='p' sx={{ textAlign: 'center' }}>
                          Candidates would be required to work from a fixed location.{' '}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: ' 2px solid rgba(102, 102, 102, 0.5)',
                        borderRadius: '10px',
                        margin: 5
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          height: '200px',
                          width: '200px'
                        }}
                      >
                        <FormControlLabel value='b' control={<Radio />} label='' />{' '}
                        <img src='images/pages/hybrid.png' />
                        <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                          Work From Home
                        </Typography>
                        <Typography variant='caption' component='p' sx={{ textAlign: 'center' }}>
                          Candidates would be required to work from home (their own premises).{' '}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: 5,
                        border: ' 2px solid rgba(102, 102, 102, 0.5)',
                        borderRadius: '10px'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          height: '200px',
                          width: '200px'
                        }}
                      >
                        <FormControlLabel value='c' control={<Radio />} label='' />{' '}
                        <img src='images/pages/workFromOffice.png' />
                        <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                          Hybrid
                        </Typography>
                        <Typography variant='caption' component='p' sx={{ textAlign: 'center' }}>
                          Candidates would be required to work from office or from home as per company’s requirement.{' '}
                        </Typography>
                      </Box>
                    </Box>
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={16}>
                  <Divider
                    sx={{
                      marginTop: 3,
                      border: '1px solid #66666680',
                      marginBottom: 3
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={12}>
                  <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Salary & Compensation
                  </Typography>
                  <Typography variant='caption' component='p'>
                    Job posting with salary criteria & additional perks will help you to find the right candidates.{' '}
                  </Typography>
                  <Typography variant='body2' sx={{ fontWeight: 700, color: 'text.primary', marginBottom: 3 }}>
                    What is the job location for candidates? *
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    name='minSalary'
                    label='Minimum Salary '
                    value={values?.minSalary}
                    placeholder='Minimum Salary'
                    onChange={handleChange}
                    type='text'
                    sx={{
                      marginBottom: 3
                    }}
                  />
                </Grid>{' '}
                <p
                  style={{
                    margin: 18
                  }}
                >
                  to
                </p>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    name='maxSalary'
                    label='Max Salary '
                    value={values?.maxSalary}
                    placeholder='Max Salary'
                    onChange={handleChange}
                    type='text'
                    sx={{
                      marginBottom: 3
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Typography variant='body2' sx={{ fontWeight: 700, color: 'text.primary', marginBottom: 3 }}>
                  What is the job location for candidates? *
                </Typography>
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Stack direction='row' spacing={1}>
                  {/* need  fildArray  */}
                  {values?.additionalperks?.map((item: any) => {
                    return (
                      <Chip
                        label={`${item}`}
                        sx={{
                          marginBottom: 6
                        }}
                        variant='outlined'
                        onDelete={() => handleDelete(item)}
                      />
                    )
                  })}
                </Stack>
              </Grid>

              <Grid container spacing={2} columns={16}>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Is there any bond to do with candidate? *
                  </Typography>
                  <RadioGroup row aria-label='controlled' value={values?.bond} name='bond' onChange={handleChange}>
                    <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={12} sm={6}>
                  <RadioGroup aria-label='controlled' value={values?.bondType} name='bondType' onChange={handleChange}>
                    <FormControlLabel value='documentBasedBond' control={<Radio />} label='Document Based Bond' />
                    <FormControlLabel value='amountBaseBond' control={<Radio />} label='Amount Based Bond' />
                    <FormControlLabel value='anyOfAbove' control={<Radio />} label='Any one of above ' />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant='caption' component='p'>
                      Please mention period of bond (In months):{' '}
                    </Typography>{' '}
                    <TextField
                      sx={{
                        margin: 2
                      }}
                      name='periodsOfBond'
                      label='Period of Bond'
                      value={values?.periodsOfBond}
                      onChange={handleChange}
                      type='text'
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary', marginTop: 4 }}>
              Minimum Education Required *{' '}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={1} sm={8}>
                <RadioGroup
                  row
                  aria-label='controlled'
                  name='minEducation'
                  value={values?.minEducation}
                  onChange={handleChange}
                >
                  <FormControlLabel value='Secondary' control={<Radio />} label='Secondary' />
                  <FormControlLabel value='Higher-Secondary' control={<Radio />} label='Higher - Secondary' />
                  <FormControlLabel value='Diploma' control={<Radio />} label='Diploma' />
                  <FormControlLabel value='Bachelor’s' control={<Radio />} label='Bachelor’s' />
                  <FormControlLabel value='Master’s' control={<Radio />} label='Master’s' />
                  <FormControlLabel value='Doctorate' control={<Radio />} label='Doctorate' />
                </RadioGroup>
              </Grid>
            </Grid>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Gender *
            </Typography>
            <Grid container spacing={2} columns={16}>
              <RadioGroup row aria-label='controlled' value={values?.gender} name='gender' onChange={handleChange}>
                <FormControlLabel value='Male' control={<Radio />} label='Male' />
                <FormControlLabel value='Female' control={<Radio />} label='Female' />
                <FormControlLabel value='Both' control={<Radio />} label='Both' />
              </RadioGroup>
            </Grid>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Age criteria *{' '}
            </Typography>
            <Grid container spacing={2} columns={16}>
              <RadioGroup row name='ageCriteria' value={values?.ageCriteria} onChange={handleChange}>
                <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid xs={2}>
                <Divider
                  sx={{
                    marginTop: 3,
                    border: '1px solid #66666680',
                    marginBottom: 3
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={2}>
                <TextField name='minAge' label='Min Age' onChange={handleChange} type='text' />
              </Grid>{' '}
              <p
                style={{
                  margin: 19
                }}
              >
                to
              </p>
              <Grid item xs={2}>
                <TextField name='maxAge' label='Max Age' onChange={handleChange} type='text' />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Box
                sx={{
                  color: '#666666',
                  background: 'linear-gradient(0deg, rgba(71, 145, 208, 0.2), rgba(71, 145, 208, 0.2)), #FFFFFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: '10px',
                  borderRadius: '15px',
                  margin: '15px'
                }}
              >
                <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='13' cy='12.875' r='11.875' fill='#1057CA' stroke='black' stroke-width='1.25' />
                    <path d='M13 8.625V8' stroke='white' stroke-width='2.5' stroke-linecap='round' />
                    <path d='M13 18.6245L13.0052 12.3748' stroke='white' stroke-width='2.5' stroke-linecap='round' />
                  </svg>
                </Box>
                <Box>Minimum age should be at least 18 years.</Box>
              </Box>
            </Grid>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Total Experience Required *{' '}
            </Typography>
            <Grid container spacing={2} columns={16}>
              <RadioGroup row name='experianceRequired' value={values?.experianceRequired} onChange={handleChange}>
                <FormControlLabel value='freshersOnly' control={<Radio />} label='Freshers Only' />
                <FormControlLabel value='experiencedOnly' control={<Radio />} label='Experienced Only' />
                <FormControlLabel value='any' control={<Radio />} label='Any' />
              </RadioGroup>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <TextField
                sx={{ margin: 5 }}
                name='candidateExperiance'
                label='Experience'
                onChange={handleChange}
                type='text'
              />
            </Grid>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Candidates from which department can apply? *
            </Typography>
            <Grid container spacing={2} columns={16}>
              <RadioGroup
                row
                name='onlyDepartmentForApply'
                value={values?.onlyDepartmentForApply}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='selectedFieldNameOnly'
                  control={<Radio />}
                  label='(Selected Field name) only'
                />
                <FormControlLabel
                  value='fromMultipleDepartments'
                  control={<Radio />}
                  label='From multiple departments'
                />
              </RadioGroup>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid xs={6}>
                <TextField
                  fullWidth
                  sx={{ margin: 5 }}
                  label='Type Department to search'
                  name='typeDepartmentToSearch'
                  placeholder='Type Department to search'
                  onChange={handleChange}
                  type='text'
                />
              </Grid>
            </Grid>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Candidates from which department can apply? *
            </Typography>
            <Typography variant='caption' component='p'>
              Add industries in which candidates should have prior experience for this job.{' '}
            </Typography>
            <TextField
              fullWidth
              sx={{ margin: 5 }}
              label=' Type Industry to search'
              name=' typeIndustryToSearch'
              placeholder='Type Industry to search'
              onChange={handleChange}
              type='text'
            />
            <Grid container spacing={2} columns={16}>
              <Box
                sx={{
                  color: '#666666',
                  background: 'linear-gradient(0deg, rgba(71, 145, 208, 0.2), rgba(71, 145, 208, 0.2)), #FFFFFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: '10px',
                  borderRadius: '15px',
                  margin: '15px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignSelf: 'start',
                    margin: '0px 7px'
                  }}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path
                      fill='#1057ca'
                      d='M10 16v-1H3v4c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4m10-9h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2m-6 0h-4V5h4v2Z'
                    />
                  </svg>
                </Box>
                <Box>
                  <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Job will be promoted to candidates with selected industries.
                  </Typography>
                  Although candidates with other industry experience can still apply.
                </Box>
              </Box>
            </Grid>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
              English level required *{' '}
            </Typography>

            <Grid container spacing={2} columns={16}>
              <Grid xs={14}>
                <RadioGroup name='englishLevel' value={values?.englishLevel} onChange={handleChange}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row'
                    }}
                  >
                    <Box
                      sx={{
                        margin: 4
                      }}
                    >
                      <FormControlLabel
                        sx={{
                          width: '145px'
                        }}
                        value='noEnglish'
                        control={<Radio />}
                        label='No English'
                      />
                    </Box>
                    <Box
                      sx={{
                        margin: 4
                      }}
                    >
                      <FormControlLabel value='experiencedOnly' control={<Radio />} label='Experienced Only' />
                      <p
                        style={{
                          color: '#666666'
                        }}
                      >
                        Candidate can understand and read English sentences
                      </p>
                    </Box>
                    <Box
                      sx={{
                        margin: 4
                      }}
                    >
                      <FormControlLabel value='basicEnglish' control={<Radio />} label='Basic English' />
                      <p
                        style={{
                          color: '#666666'
                        }}
                      >
                        Candidate can speak in English on some topics
                      </p>
                    </Box>
                    <Box
                      sx={{
                        margin: 4
                      }}
                    >
                      <FormControlLabel value='intermediateEnglish' control={<Radio />} label='Intermediate English' />
                      <p
                        style={{
                          color: '#666666'
                        }}
                      >
                        Candidate can understand and speak English fluently
                      </p>
                    </Box>
                    <Box
                      sx={{
                        margin: 4
                      }}
                    >
                      <FormControlLabel value='advancedEnglish' control={<Radio />} label='Advanced English' />
                      <p
                        style={{
                          color: '#666666'
                        }}
                      >
                        Candidate can understand and speak English fluently
                      </p>
                    </Box>
                  </Box>
                </RadioGroup>
              </Grid>
            </Grid>
            <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Skills Prefrence (optional)
            </Typography>
            <Grid container spacing={2} columns={16}>
              <Grid>
                <Box
                  sx={{
                    margin: 4
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id='demo-multiple-chip-label'>Skills Prefrence (optional)</InputLabel>
                    <Field name='skillPreferance'>
                      {({ field }: any) => (
                        <Select
                          multiple
                          label='Skills Prefrence (optional)'
                          value={field?.value}
                          MenuProps={MenuProps}
                          id='demo-multiple-chip'
                          onChange={field.onChange(field.name)}
                          labelId='demo-multiple-chip-label'
                          renderValue={(selected: any) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                              {(selected as unknown as string[]).map(value => (
                                <Chip key={value} label={value} sx={{ m: 0.75 }} />
                              ))}
                            </Box>
                          )}
                        >
                          {names.map(name => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </Field>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid xs={16}>
                <Divider
                  sx={{
                    marginTop: 3,
                    border: '1px solid #66666680',
                    marginBottom: 3
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} columns={16}>
              <Grid xs={16}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    flexDirection: 'column',
                    marginBottom: 4
                  }}
                >
                  <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Job Description{' '}
                  </Typography>
                  <Typography variant='caption' component='p'>
                    Describe the responsibilities of this job and other specific requirements here.{' '}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={16}>
                <TextField
                  rows={4}
                  sx={{
                    width: '600px'
                  }}
                  multiline
                  value={values?.jobDescription}
                  onChange={handleChange}
                  name='jobDescription'
                  label='Job description / Additional requirement'
                  placeholder='Job description / Additional requirement'
                  id='textarea-outlined-static'
                />
                <Typography variant='caption' component='p'>
                  Please mention if you have any specific requirements here, we will check the candidates for you.{' '}
                </Typography>
              </Grid>
            </Grid>
          </Fragment>
        )
      default:
        return (
          <Fragment key={step}>
            <Grid container spacing={2} columns={16}>
              <Box
                sx={{
                  margin: 2
                }}
              >
                <RadioGroup
                  row
                  aria-label='controlled'
                  value={values?.connectingWithCandidates}
                  name='connectingWithCandidates'
                  onChange={handleChange}
                >
                  <FormControlLabel value='Myself' control={<Radio />} label='Myself' />
                  <FormControlLabel value='Other Recruiters' control={<Radio />} label='OtherRecruiters' />
                </RadioGroup>
              </Box>
            </Grid>
            {/* When my selef selected */}
            <Grid container spacing={2} columns={16}>
              <Grid xs={14}>
                <TextField
                  fullWidth
                  name='recruiter’sName'
                  label='Recruiter’s Name'
                  onChange={handleChange}
                  type='text'
                  sx={{
                    margin: 3
                  }}
                />
                <TextField
                  fullWidth
                  label='HR’s Contact Number'
                  name='hrContactNumber'
                  onChange={handleChange}
                  type='text'
                  sx={{
                    margin: 3
                  }}
                />
                <TextField
                  fullWidth
                  label='Contact E-mail'
                  name='contactEmail'
                  onChange={handleChange}
                  type='text'
                  sx={{
                    margin: 3
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={16}>
              <Divider
                sx={{
                  marginTop: 3,
                  border: '1px solid #66666680',
                  marginBottom: 3
                }}
              />
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'start',
                  flexDirection: 'column'
                }}
              >
                <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary', marginTop: 4 }}>
                  Interview method & Address{' '}
                </Typography>
                <Typography variant='caption' component='p'>
                  Let candidates know how interview will be conducted for this job?
                </Typography>
              </Box>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'start',
                  flexDirection: 'column'
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 700, color: 'text.primary', marginTop: 4 }}>
                  Type of Interview{' '}
                </Typography>
                <RadioGroup
                  row
                  aria-label='controlled'
                  name='typeOfInterview'
                  onChange={handleChange}
                  value={values?.typeOfInterview}
                >
                  <FormControlLabel value='In-person Interview' control={<Radio />} label='In-person Interview' />
                  <FormControlLabel
                    value='Telephonic/Online Interview'
                    control={<Radio />}
                    label='Telephonic / Online Interview'
                  />
                </RadioGroup>
              </Box>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'start',
                  flexDirection: 'column'
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 700, color: 'text.primary', marginTop: 4 }}>
                  Interview address{' '}
                </Typography>
              </Box>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'start'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <TextField
                    fullWidth
                    label='Interview City *'
                    name='interviewCity'
                    onChange={handleChange}
                    type='text'
                    sx={{
                      margin: 3
                    }}
                  />
                  <TextField
                    fullWidth
                    label='interviewState'
                    onChange={handleChange}
                    type='text'
                    sx={{
                      margin: 3
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid xs={8}>
                <TextField
                  fullWidth
                  label='Complete Address'
                  name='interviewCompleteAddress'
                  onChange={handleChange}
                  type='text'
                  sx={{
                    margin: 3
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} columns={16}>
              <Grid xs={14}>
                <FormGroup>
                  <Box
                    sx={{
                      display: 'flex'
                    }}
                  >
                    <FormControlLabel
                      label='Company address is same as interview address'
                      control={<Checkbox defaultChecked name='size-default' />}
                    />
                    <Typography
                      variant='caption'
                      component='p'
                      sx={{
                        margin: 3
                      }}
                    >
                      (If this section is not selected add company address section from variant page designed below){' '}
                    </Typography>
                  </Box>
                </FormGroup>
              </Grid>
            </Grid>
          </Fragment>
        )
    }
  }

  const renderContent = () => {
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }: any) => {
          handleFormSubmitClick(values, resetForm)
        }}
      >
        {(props: FormikProps<any>) => {
          const { values, touched, errors, handleChange } = props
          return (
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant='body1'
                    sx={{ fontWeight: 700, color: 'text.primary', margin: 0, paddingLeft: 0 }}
                  >
                    {steps[activeStep]?.title}
                  </Typography>
                  <Typography
                    variant='caption'
                    component='p'
                    sx={{
                      margin: 0,
                      paddingLeft: 0
                    }}
                  >
                    {steps[activeStep]?.subtitle}
                  </Typography>
                </Grid>
                {getStepContent(activeStep, values, touched, errors, handleChange)}

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    size='large'
                    variant='outlined'
                    color='secondary'
                    disabled={activeStep === 0}
                    onClick={() => handleBack(values)}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button size='large' variant='contained' type='submit'>
                      Submit
                    </Button>
                  ) : (
                    <Button type='submit' size='large' variant='contained'>
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    )
  }

  return (
    <Card>
      <Box
        sx={{
          margin: 15
        }}
      >
        <CardContent>
          <StepperWrapper>
            <Stepper activeStep={activeStep} connector={<Icon icon='tabler:chevron-right' />}>
              {steps.map((step, index) => {
                const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

                return (
                  <Step key={index}>
                    <StepLabel StepIconComponent={StepperCustomDot}>
                      <div className='step-label'>
                        <RenderAvatar
                          variant='rounded'
                          {...(activeStep >= index && { skin: 'light' })}
                          {...(activeStep === index && { skin: 'filled' })}
                          {...(activeStep >= index && { color: 'primary' })}
                          sx={{
                            ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                            ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                          }}
                        >
                          <Icon icon={step.icon} />
                        </RenderAvatar>
                        <div>
                          <Typography className='step-title'>{step?.title}</Typography>
                        </div>
                      </div>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>{renderContent()}</CardContent>
      </Box>
    </Card>
  )
}

export default StepperCustomHorizontal
