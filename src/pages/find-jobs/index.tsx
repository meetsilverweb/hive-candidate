//@ts-nocheck
//eslint-disable
import { Icon } from '@iconify/react'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TablePagination,
  TextField,
  Typography
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Fade, { FadeProps } from '@mui/material/Fade'
// import { Field, Form, Formik } from 'formik'
// import { CheckboxWithLabel, RadioGroup, Select } from 'formik-mui'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CustomButton from 'src/@core/components/custom-button'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { createJobApply, getAllJobs, getJobPostByID } from 'src/slice/jobPreferenceSlice'
import { getAllApplication } from 'src/slice/trackApplicationSlice'
import { RootState } from 'src/store/store'
import moment from 'moment'
import { Form, Formik } from 'formik'

// const userId = JSON.parse(userData1)
// const employeeId = JSON.parse(userData)?.id || ''
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const FindJobs = () => {
  const [page, setPage] = useState<any>(0)
  const [limit, setLimit] = useState<any>(2)
  const [search, setSearch] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [readId, setReadId] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const { getAllJobsData, isLoading, createJobApplyData, singlePost } = useSelector<RootState>(
    state => state.jobPreferenceReducer
  )
  // console.log(singlePost, 'singlePost')
  // const [readMore, setReadMore] = useState(false)
  // const [clearAll, setClearAll] = useState(false)
  const { getAllApplicationData } = useSelector<RootState>(state => state.trackApplicationReducer)

  const dispatch = useAppDispatch()

  let applicationIds = getAllApplicationData?.data?.map((val: any) => val?.id)

  // let allData = getAllApplicationData && getAllApplicationData
  const handleSearch = (e: any) => {
    setSearch(e?.target?.value)
    const payload: any = {
      search: e?.target?.value ? e?.target?.value : '',
      page: page ? page : '',
      limit: limit ? limit : '',
      typeOfJob: '',
      workingDays: '',
      experienceLevel: '',
      location: '',
      minSalary: '',
      maxSalary: '',
      salaryRange: ''
    }
    dispatch(getAllJobs(payload))
  }
  useEffect(() => {
    const EmpID = JSON.parse(localStorage.getItem('userData')) || ''
    setEmployeeId(EmpID)
  }, [])

  useEffect(() => {
    //@ts-ignore
    let payload = {
      id: employeeId?.id
    }
    // console.log(payload, 'payloadpayload')
    dispatch(getAllApplication(payload))
  }, [createJobApplyData, employeeId?.id])

  useEffect(() => {
    const payload: any = {
      search: '',
      page: page ? page : '',
      limit: limit ? limit : '',
      typeOfJob: '',
      workingDays: '',
      experienceLevel: '',
      location: '',
      minSalary: '',
      maxSalary: '',
      salaryRange: ''
    }
    dispatch(getAllJobs(payload))
  }, [page, limit])

  // useEffect(() => {
  //   let payload = {
  //     search: currentUpdate.search,
  //     // workLocation: currentUpdate.workLocation,
  //     typeOfJob: currentUpdate.fullTime ? 'Full-Time' : '',
  //     Internship: currentUpdate.partTime ? 'Part-Time' : '',
  //     onSite: currentUpdate.onSite ? 'On-site' : '',
  //     Hybrid: currentUpdate.Hybrid ? 'Hybrid' : '',
  //     Remote: currentUpdate.Remote ? 'Remote' : '',
  //     entryLevel: currentUpdate.entryLevel ? 'Entry-Level' : '',
  //     Intermediate: currentUpdate.Intermediate ? 'Intermediate' : '',
  //     Expert: currentUpdate.Expert ? 'Expert' : '',
  //     minSalary:
  //       currentUpdate.salaryRange === 'under5000'
  //         ? '0'
  //         : currentUpdate.salaryRange === '5001-15000'
  //         ? '5001'
  //         : currentUpdate.salaryRange === '15001-35000'
  //         ? '15001'
  //         : currentUpdate?.minSalary
  //         ? currentUpdate?.minSalary
  //         : '',
  //     maxSalary:
  //       currentUpdate.salaryRange === 'under5000'
  //         ? '5000'
  //         : currentUpdate.salaryRange === '5001-15000'
  //         ? '15000'
  //         : currentUpdate.salaryRange === '15001-35000'
  //         ? '35000'
  //         : currentUpdate?.maxSalary
  //         ? currentUpdate?.maxSalary
  //         : ''
  //   }

  //   dispatch(getAllJobs(payload))
  // }, [])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value))
    setPage(0)
  }

  const handleViewPost = (id: any) => {
    const payload: any = {
      id: id
    }
    dispatch(getJobPostByID(payload))
  }

  const handleSearchFilter = (values: any) => {
    const payload: any = {
      search: search ? search : '',
      page: page ? page : '',
      limit: limit ? limit : '',
      typeOfJob: values?.typeOfJob ? values?.typeOfJob : '',
      workingDays: values?.workingDays ? values?.workingDays : '',
      experienceLevel: values?.experienceLevel ? values?.experienceLevel : '',
      location: values?.location ? values?.location : '',
      minSalary: values?.minSalary ? values.minSalary : '',
      maxSalary: values?.maxSalary ? values?.maxSalary : ''
    }
    if (values.salaryRange === 'under5000') {
      Object.assign(payload, { minSalary: 0 })
      Object.assign(payload, { maxSalary: 5000 })
    } else if (values.salaryRange === '5000-15000') {
      Object.assign(payload, { minSalary: 5000 })
      Object.assign(payload, { maxSalary: 15000 })
    } else if (values.salaryRange === '15000-35000') {
      Object.assign(payload, { minSalary: 15000 })
      Object.assign(payload, { maxSalary: 35000 })
    } else if (values.salaryRange === 'any') {
      Object.assign(payload, { minSalary: '' })
      Object.assign(payload, { maxSalary: '' })
    }
    dispatch(getAllJobs(payload))

    // console.log(payload, 'payload.......')

    // ((payload.minSalary = values?.salaryRange === 'under5000' ? 0 : ''))
    // payload.maxSalary = values?.salaryRange === 'under5000' ? 5000 : ''
    // (
    //   //tguyjhfgjuhgyj
    //   (payload.minSalary = values?.salaryRange === 'under5000' ? 0 : '')
    // )
    // //tguyjhfgjuhgyj
    // payload.maxSalary =
    //   values?.salaryRange === 'under5000'
    //     ? 5000
    //     : ''(
    //         //tguyjhfgjuhgyj
    //         (payload.minSalary = values?.salaryRange === '5000-15000' ? 5000 : '')
    //       )
    // payload.maxSalary = values?.salaryRange === '5000-15000' ? 15000 : ''
  }

  const resetFilter = () => {
    let payload = {
      search: '',
      page: page ? page : '',
      limit: limit ? limit : '',
      typeOfJob: '',
      workingDays: '',
      experienceLevel: '',
      location: '',
      minSalary: '',
      maxSalary: ''
    }
    dispatch(getAllJobs(payload))
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundImage: 'url(/images/pages/findJobHeaderImage.jpg)',
            width: '100%',
            height: '300px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            objectFit: 'fill',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box pl={10}>
            <h1>Search and get the job of your Dream.</h1>
            <p>Looking for jobs? Browse our latest job openings to view & apply to the best jobs today!</p>
          </Box>
        </Box>

        <Container maxWidth='xl' sx={{ my: 5, '&.MuiContainer-maxWidthXl': { maxWidth: '1350px' } }}>
          <Box>
            <Grid container spacing={5}>
              {/* Left Column */}
              <Grid item lg={3} md={4} sm={4} xs={12}>
                <Paper variant='outlined'>
                  <Grid container direction={'row'}>
                    <Grid item container md={12} p={3} rowSpacing={5}>
                      <Formik
                        enableReinitialize
                        initialValues={{
                          typeOfJob: '',
                          workingDays: '',
                          experienceLevel: '',
                          location: '',
                          maxSalary: '',
                          minSalary: '',
                          salaryRange: ''
                        }}
                        onSubmit={(values: any) => {
                          handleSearchFilter(values)
                          // console.log(values, 'vlauesvlaues')
                        }}
                      >
                        {props => {
                          const { values, handleChange, handleSubmit } = props
                          return (
                            <Form onSubmit={handleSubmit}>
                              <Grid item lg={12} md={12} sm={12} xs={12} p={3}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant='h6'>Filter</Typography>
                                  <Button type='reset' onClick={resetFilter} size='small' variant='contained'>
                                    Reset
                                  </Button>
                                </Box>
                              </Grid>
                              <Grid item md={12}>
                                <Divider />
                              </Grid>
                              <Grid item md={12}>
                                <Box sx={{ m: 2, pt: 3 }}>
                                  <FormControl>
                                    <FormLabel>Job Type</FormLabel>
                                    <FormGroup>
                                      <Stack direction='row' flexWrap='wrap'>
                                        <RadioGroup
                                          row
                                          value={values?.typeOfJob}
                                          onChange={handleChange}
                                          aria-labelledby='demo-radio-buttons-group-label'
                                          name='typeOfJob'
                                        >
                                          <FormControlLabel value='Full-Time' control={<Radio />} label='Full-Time' />
                                          <FormControlLabel value='Part-Time' control={<Radio />} label='Part-Time' />
                                        </RadioGroup>
                                      </Stack>
                                    </FormGroup>
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item md={12}>
                                <Box sx={{ m: 2 }}>
                                  <FormControl>
                                    <FormLabel>Experience Level</FormLabel>
                                    <FormGroup>
                                      <Stack direction='row' flexWrap='wrap'>
                                        <RadioGroup
                                          row
                                          value={values?.experienceLevel}
                                          onChange={handleChange}
                                          aria-labelledby='demo-radio-buttons-group-label'
                                          name='experienceLevel'
                                        >
                                          <FormControlLabel value='Fresher' control={<Radio />} label='Fresher' />
                                          <FormControlLabel
                                            value='Intermediate'
                                            control={<Radio />}
                                            label='Intermediate'
                                          />
                                          <FormControlLabel value='Expert' control={<Radio />} label='Expert' />
                                        </RadioGroup>
                                      </Stack>
                                    </FormGroup>
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item md={12}>
                                <Box sx={{ m: 2, pt: 3 }}>
                                  <FormControl>
                                    <FormLabel>Location</FormLabel>
                                    <FormGroup>
                                      <Stack direction='row' flexWrap='wrap'>
                                        <RadioGroup
                                          row
                                          value={values?.location}
                                          onChange={handleChange}
                                          aria-labelledby='demo-radio-buttons-group-label'
                                          name='location'
                                        >
                                          <FormControlLabel
                                            value='Work From Office'
                                            control={<Radio />}
                                            label='Work From Office'
                                          />
                                          <FormControlLabel
                                            value='Work From Home'
                                            control={<Radio />}
                                            label='Work From Home'
                                          />
                                          <FormControlLabel value='Hybrid' control={<Radio />} label='Hybrid' />
                                        </RadioGroup>
                                      </Stack>
                                    </FormGroup>
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item md={12}>
                                <Box sx={{ m: 2, pt: 3 }}>
                                  <FormControl>
                                    <FormLabel>Working Days</FormLabel>
                                    <FormGroup>
                                      <Stack direction='row' flexWrap='wrap'>
                                        <RadioGroup
                                          row
                                          value={values?.workingDays}
                                          onChange={handleChange}
                                          aria-labelledby='demo-radio-buttons-group-label'
                                          name='workingDays'
                                        >
                                          <FormControlLabel
                                            value='Monday - Friday'
                                            control={<Radio />}
                                            label='Monday - Friday'
                                          />
                                          <FormControlLabel
                                            value='Monday - Saturday'
                                            control={<Radio />}
                                            label='Monday - Saturday'
                                          />
                                        </RadioGroup>
                                      </Stack>
                                    </FormGroup>
                                  </FormControl>
                                  <Box sx={{ mt: 3 }}>
                                    <FormLabel id='range-salary'>Range Salary:</FormLabel>
                                    <RadioGroup
                                      aria-labelledby='range-salary'
                                      value={values?.salaryRange}
                                      onChange={handleChange}
                                      name='salaryRange'
                                    >
                                      <FormControlLabel value='under5000' control={<Radio />} label='Under ₹5,000' />
                                      <FormControlLabel
                                        value='5000-15000'
                                        control={<Radio />}
                                        label='₹5,000 - ₹15,000'
                                      />
                                      <FormControlLabel
                                        value='15000-35000'
                                        control={<Radio />}
                                        label='₹15,000 - ₹35,000'
                                      />
                                      <FormControlLabel value='' control={<Radio />} label='Any' />
                                      <FormControlLabel value='custom' control={<Radio />} label='Custom' />
                                    </RadioGroup>
                                    {values.salaryRange === 'custom' && (
                                      <Box display='flex' justifyContent='space-between' alignItems='center'>
                                        <TextField
                                          name='minSalary'
                                          size='small'
                                          fullWidth
                                          type='number'
                                          label='Min Salary'
                                          sx={{ width: '40%' }}
                                          value={values.minSalary}
                                          onChange={handleChange}
                                        />
                                        To
                                        <TextField
                                          name='maxSalary'
                                          size='small'
                                          fullWidth
                                          type='number'
                                          label='Max Salary'
                                          sx={{ width: '40%' }}
                                          value={values.maxSalary}
                                          onChange={handleChange}
                                        />
                                      </Box>
                                    )}
                                  </Box>
                                </Box>
                              </Grid>
                              {/* <Grid item md={12}>
                                <Divider />
                              </Grid>
                              <Grid item md={12}>
                                <FormControl>
                                  <FormLabel id='range-salary'>Range Salary:</FormLabel>
                                  <RadioGroup
                                    aria-labelledby='range-salary'
                                    name='salaryRange'
                                    value={currentUpdate.salaryRange}
                                    onChange={handleChange}
                                  >
                                    <FormControlLabel value='under5000' control={<Radio />} label='Under ₹5,000' />
                                    <FormControlLabel value='5001-15000' control={<Radio />} label='₹5,001 - ₹15,000' />
                                    <FormControlLabel
                                      value='15001-35000'
                                      control={<Radio />}
                                      label='₹15,001 - ₹35,000'
                                    />
                                    <FormControlLabel value='custom' control={<Radio />} label='Custom' />
                                    <FormControlLabel value='' control={<Radio />} label='Any' />
                                  </RadioGroup>
                                  {currentUpdate.salaryRange === 'custom' && (
                                    <Box sx={{ mt: 3 }}>
                                      <Box display='flex' justifyContent='space-between'>
                                        <TextField
                                          name='minSalary'
                                          size='small'
                                          fullWidth
                                          type='number'
                                          label='Min Salary'
                                          sx={{ width: '40%' }}
                                          value={currentUpdate.minSalary}
                                          onChange={handleChange}
                                        />

                                        <TextField
                                          name='maxSalary'
                                          size='small'
                                          fullWidth
                                          type='number'
                                          label='Max Salary'
                                          sx={{ width: '40%' }}
                                          value={currentUpdate.maxSalary}
                                          onChange={handleChange}
                                        />
                                      </Box>
                                    </Box>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item md={12}>
                                <Divider />
                              </Grid>
                              <Grid item md={12}>
                                <FormControl>
                                  <FormLabel>From Home / From Office</FormLabel>
                                  <FormGroup>
                                    <Stack direction='row' flexWrap='wrap'>
                                      <FormControlLabel
                                        value={currentUpdate.onSite}
                                        onChange={handleChange}
                                        control={<Checkbox />}
                                        name='onSite'
                                        label='Work From Office'
                                      />
                                      <FormControlLabel
                                        value={currentUpdate.Remote}
                                        onChange={handleChange}
                                        control={<Checkbox />}
                                        name='Remote'
                                        label='Work From Home'
                                      />
                                      <FormControlLabel
                                        value={currentUpdate.Hybrid}
                                        onChange={handleChange}
                                        control={<Checkbox />}
                                        name='Hybrid'
                                        label='Hybrid'
                                      />
                                    </Stack>
                                  </FormGroup>
                                </FormControl>
                              </Grid>
                              <Grid item md={12}>
                                <Divider />
                              </Grid> */}
                              <Button variant='contained' type='submit'>
                                Apply Filters
                              </Button>
                            </Form>
                          )
                        }}
                      </Formik>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* Right Column */}
              <Grid item lg={9} md={8} sm={8} xs={12}>
                <Paper sx={{ p: 5 }}>
                  <Grid container direction='row' rowSpacing={5}>
                    <Grid item md={12} sm={12} xs={12}>
                      <TextField
                        name='search'
                        value={search}
                        onChange={handleSearch}
                        sx={{ '& 	.MuiInputBase-root': { borderRadius: '15px' } }}
                        fullWidth
                        placeholder='Search Job Title or Keyword'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='clarity:search-line' />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='icon-park-outline:voice' />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    {/* <Grid item md={6} sm={6} xs={6}>
                        <TextField
                          name='workLocation'
                          value={currentUpdate.workLocation}
                          onChange={handleChange}
                          fullWidth
                          sx={{ '& 	.MuiInputBase-root': { borderRadius: '0 15px 15px 0' } }}
                          placeholder='Location'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Icon icon='fa6-solid:location-dot' />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid> */}

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography variant='body1' fontWeight={900}>
                        {getAllJobsData?.length} Job results Found
                      </Typography>
                    </Grid>
                    {getAllJobsData.length === 0 && !isLoading ? (
                      <img
                        src='/images/pages/results-not-found.png'
                        width='100%'
                        height='500px'
                        alt='Results Not Found'
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      ''
                    )}
                    {/* {console.log(getAllJobsData, 'getAllJobsData')} */}
                    {isLoading ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      getAllJobsData &&
                      getAllJobsData?.map((data: any) => (
                        <>
                          <Grid key={data?.id} item lg={12} md={12} sm={12} xs={12}>
                            <Paper variant='outlined' sx={{ p: 6, borderRadius: '15px' }}>
                              <Grid container direction='row' rowSpacing={7}>
                                <Grid container item lg={12} md={12} sm={12} xs={12} rowSpacing={5}>
                                  <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Stack direction='row' spacing={5} alignItems='center'>
                                      <div>
                                        <Avatar sx={{ width: 56, height: 56 }} variant='square'>
                                          {data?.companyName.charAt(0)}
                                        </Avatar>
                                      </div>
                                      <div>
                                        <Typography fontWeight={900}>{data?.jobRole}</Typography>

                                        <Stack direction='row' spacing={2} alignItems='center' flexWrap='wrap'>
                                          <Typography variant='body2' fontWeight={900}>
                                            {data?.companyName}
                                          </Typography>
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                            {data?.typeOfJob && (
                                              <Chip
                                                size='small'
                                                label={data?.typeOfJob}
                                                sx={{ background: '#BAE3FB' }}
                                              />
                                            )}

                                            {data?.location && (
                                              <Chip
                                                size='small'
                                                label={data?.location}
                                                sx={{ background: '#BAE3FB' }}
                                              />
                                            )}
                                          </Box>
                                        </Stack>
                                      </div>
                                    </Stack>
                                  </Grid>
                                  {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Typography fontWeight={900}>Required Skills:</Typography>
                                  <Typography variant='body2'>{data?.skillPreferance?.join(', ')}</Typography>
                                </Grid> */}
                                  <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Box display='flex' alignItems='end' flexDirection='column'>
                                      <Box display='flex' alignItems='center'>
                                        <Icon icon='fa6-solid:location-dot' />
                                        <Typography variant='body1' fontWeight={900} ml={1}>
                                          {data?.companyCity}, {data?.companyState}
                                        </Typography>
                                      </Box>
                                      <Typography variant='body2'>
                                        {moment(data?.jobPostApprove, 'YYYYMMDD').fromNow()}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid container item lg={12} md={12} rowSpacing={4}>
                                  <Grid item lg={10} md={10} sm={10} xs={12}>
                                    <Typography fontWeight={900}>Required Skills:</Typography>

                                    {data?.skillPreferance?.map((skill, index) => (
                                      <Chip
                                        key={index}
                                        size='small'
                                        label={skill}
                                        color='primary'
                                        sx={{ mr: 1, mb: 1 }}
                                      />
                                    ))}
                                  </Grid>
                                  <Grid item lg={10} md={10} sm={10} xs={12}>
                                    <Typography fontWeight={900}>Experience : {data?.experianceRequired}</Typography>
                                  </Grid>

                                  <Grid item lg={10} md={10} sm={10} xs={12}>
                                    <Typography fontWeight={900}>Description:</Typography>
                                    <Typography variant='body2' fontWeight={900}>
                                      {readId === data?.id
                                        ? data?.jobDescription
                                        : data?.jobDescription.substring(0, 300)}

                                      <span
                                        style={{
                                          cursor: 'pointer',
                                          color: '#1057ca',
                                          marginLeft: '0.5rem',
                                          borderBottom: '1px solid #1057ca'
                                        }}
                                        onClick={() => {
                                          setReadId(data?.id)
                                        }}
                                      >
                                        {readId === data?.id ? 'Read Less' : 'Read More'}
                                      </span>
                                    </Typography>

                                    {/* <Typography variant='body2' fontWeight={900}>
                                    clients This role is suited to India based creatives looking to work in-house.
                                  </Typography> */}
                                  </Grid>

                                  <Grid
                                    item
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={12}
                                    display='flex'
                                    justifyContent='end'
                                    alignItems='end'
                                  >
                                    <Button
                                      sx={{ mr: 1 }}
                                      variant='contained'
                                      onClick={() => {
                                        setShow(true)
                                        handleViewPost(data?.id)
                                      }}
                                    >
                                      View
                                    </Button>
                                    <Button
                                      variant='contained'
                                      disabled={applicationIds?.includes(data.id)}
                                      onClick={() => {
                                        let payload: any = {
                                          companyId: data?.company_id,
                                          employeeId: employeeId?.id,
                                          jobPostId: data?.id
                                        }
                                        dispatch(createJobApply(payload))
                                      }}
                                    >
                                      {applicationIds?.includes(data.id) ? 'Applied' : 'Apply'}
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </>
                      ))
                    )}
                    {getAllJobsData.length !== 0 ? (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TablePagination
                          rowsPerPageOptions={[2, 4]}
                          component='div'
                          count={page}
                          page={page}
                          onPageChange={handleChangePage}
                          rowsPerPage={limit}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        {/* <Pagination
                      count={getAllEmployee?.total}
                      page={page}
                      onChange={handlePagination}
                      variant='outlined'
                      shape='rounded'
                    />  */}
                      </Grid>
                    ) : (
                      ''
                    )}

                    {/* <Pagination
                      count={getAllEmployee?.total}
                      page={page}
                      onChange={handlePagination}
                      variant='outlined'
                      shape='rounded'
                    />  */}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Avatar sx={{ width: 70, height: 70 }} variant='square'>
                  {singlePost?.companyName?.charAt(0)}
                </Avatar>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {singlePost?.jobRole}
                </Typography>
                <Typography variant='h7'>{singlePost?.companyName}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant='body2'>{moment(singlePost?.jobPostApprove, 'YYYYMMDD').fromNow()}</Typography>
            </Box>
          </Box>
          <Divider sx={{ mt: 4, mb: 4 }} />
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box
                  sx={{
                    mb: 1,
                    display: 'inline-flex',
                    alignSelf: 'center',
                    background: '#1057ca',
                    borderRadius: '10px',
                    p: 2,
                    alignItems: 'center',
                    '& svg': { mr: 2, color: '#fff', fontSize: '20px' }
                  }}
                >
                  <Icon icon='mdi:company' />
                  <Typography sx={{ color: '#fff' }} variant='h7'>
                    {singlePost?.location}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 1,
                    display: 'inline-flex',
                    alignSelf: 'center',
                    background: '#1057ca',
                    borderRadius: '10px',
                    p: 2,
                    alignItems: 'center',
                    '& svg': { mr: 2, color: '#fff', fontSize: '20px' }
                  }}
                >
                  <Icon icon='tabler:briefcase' />
                  <Typography sx={{ color: '#fff' }} variant='h7'>
                    {singlePost?.typeOfJob}
                  </Typography>
                </Box>
                {/* <Typography>{}</Typography> */}
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Salary</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>
                      Rs.{singlePost?.minSalary} to Rs.{singlePost?.maxSalary}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Age Range</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>
                      {singlePost?.minAge} Years to {singlePost?.maxAge} Years
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Gender</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>{singlePost?.gender || '-'}</Typography>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Education Required</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>{singlePost?.minEducation || '-'}</Typography>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Bond</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>{singlePost?.bond || '-'}</Typography>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Additional Perks</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    {singlePost?.additionalperks &&
                      singlePost?.additionalperks?.map((item: any) => {
                        return <Typography variant='body2'>{item},</Typography>
                      })}
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Experiance Required</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>{singlePost?.experianceRequired || '-'}</Typography>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>englishLevel</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>{singlePost?.englishLevel || '-'}</Typography>
                  </Box>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', mt: 2 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Skill Preferance</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    {singlePost?.skillPreferance &&
                      singlePost?.skillPreferance?.map((item: any) => {
                        return <Typography variant='body2'>{item},</Typography>
                      })}
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Type Of Interview</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>{singlePost?.typeOfInterview || '-'}</Typography>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography>Compensation</Typography>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box>
                    <Typography variant='body2'>{singlePost?.compensation || '-'}</Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2 }}>Address: </Typography>
                <Typography variant='body2'>
                  {' '}
                  {singlePost?.companyCompleteAddress || ''},{singlePost?.companyCity || ''},{' '}
                  {singlePost?.companyState || ''}, {singlePost?.companyState || ''}
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2 }}>Job Decription: </Typography>
                <Typography variant='body2'> {singlePost?.jobDescription}</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FindJobs
