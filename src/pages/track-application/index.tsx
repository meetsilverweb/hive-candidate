//@ts-nocheck
//eslint-disable
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  RadioGroup,
  Typography,
  Radio,
  Slider,
  TextField,
  InputAdornment,
  OutlinedInput,
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
  Container,
  FormLabel,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  tableCellClasses,
  Chip,
  CircularProgress,
  TablePagination
} from '@mui/material'
import { Box, display, height, margin } from '@mui/system'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

// ** MUI Imports
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Main } from 'next/document'
import { deepOrange } from '@mui/material/colors'
import { useAppDispatch } from 'src/hooks/redux-hooks'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import { getAllApplication } from 'src/slice/trackApplicationSlice'

const trackApplication = () => {
  const [page, setPage] = useState<any>(0)
  const [limit, setLimit] = useState<any>(1)
  const [employeeId, setEmployeeId] = useState<any>('')
  const [search, setSearch] = useState<string>('')
  const { getAllApplicationData, isLoading } = useSelector<RootState>(state => state.trackApplicationReducer)
  const [currentUpdate, setCurrentUpdate] = useState({
    calledForInterview: '',
    interviewed: '',
    rejected: '',
    haveNotTalked: '',
    receivedOfferLetter: '',
    locationDistance: '',
    missedCall: ''
  })

  const dispatch = useAppDispatch<AppDispatch>()

  const handleChange = e => {
    setCurrentUpdate({
      ...currentUpdate,
      [e.target.name]: e.target.value
    })
  }
  const handleSearch = (e: any) => {
    setSearch(e?.target.value)
    const payload: any = {
      search: e?.target?.value ? e?.target?.value : '',
      page: page ? page : '',
      limit: limit ? limit : ''
    }
    dispatch(getAllApplication(payload))
  }
  const theme = useTheme()
  const fullWidthProp: boolean = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    // Get the value from local storage if it exists
    //@ts-ignore
    let value = JSON.parse(localStorage.getItem('userData'))
    // console.log(value?.id, 'value')
    setEmployeeId(value)
  }, [])

  useEffect(() => {
    let payload = {
      id: employeeId?.id,
      search: '',
      page: page ? page : '',
      limit: limit ? limit : '',
      candidateStatus: currentUpdate.candidateStatus ? 'Candidate Status' : '',
      locationDistance: currentUpdate.locationDistance ? 'Volunteer' : '',
      missedCall: currentUpdate.missedCall ? 'Volunteer' : ''
    }

    dispatch(getAllApplication(payload))
  }, [currentUpdate, employeeId?.id])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLimit(parseInt(event.target.value))
    setPage(0)
  }
  return (
    <>
      <Box
      // sx={{
      //   backgroundColor: '#FFFFFF'
      // }}
      >
        <Box
          sx={{
            backgroundImage: `url(/images/pages/findJobHeaderImage.jpg)`,
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

        <Container
          maxWidth='xl'
          sx={{ my: 5, display: 'flex', alignItems: 'center', '&.MuiContainer-maxWidthXl': { maxWidth: '1350px' } }}
        >
          <Grid container spacing={5}>
            <Grid item lg={3} md={4} sm={4} xs={12}>
              <Paper variant='outlined' sx={{ borderRadius: '10px' }}>
                <Grid container direction={'row'}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    p={3}
                  >
                    <div>
                      <Typography variant='h6'>Filter</Typography>
                    </div>
                  </Grid>
                  <Grid item md={12}>
                    <Divider />
                  </Grid>
                  <Grid item container md={12} p={3} rowSpacing={5}>
                    <Grid item md={12}>
                      <FormControl>
                        <FormLabel id='location-distance'>Candidate Status</FormLabel>
                        <RadioGroup
                          aria-labelledby='candidateStatus'
                          name='candidateStatus'
                          value={currentUpdate.candidateStatus || ''}
                          onChange={handleChange}
                        >
                          <Stack direction='row' flexWrap='wrap'>
                            <FormControlLabel
                              control={<Radio />}
                              label='Called For Interview'
                              value='calledForInterview'
                            />
                            <FormControlLabel control={<Radio />} label='Interviewed' value='interviewed' />
                            <FormControlLabel control={<Radio />} value='rejected' label='Rejected' />
                            <FormControlLabel control={<Radio />} value='haveNotTalked' label='Have Not Talked' />
                            <FormControlLabel
                              control={<Radio />}
                              value='receivedOfferLetter'
                              label='Received offer letter'
                            />
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {/* <Grid item md={12}>
                      <Divider />
                    </Grid> */}
                    {/* <Grid item md={12}>
                      <FormControl>
                        <FormLabel id='location-distance'>Location Distance:</FormLabel>
                        <RadioGroup
                          aria-labelledby='location-distance'
                          name='locationDistance'
                          value={currentUpdate.locationDistance || ''}
                          onChange={handleChange}
                        >
                          <FormControlLabel value='5KM' control={<Radio />} label='5 KM' />
                          <FormControlLabel value='15KM' control={<Radio />} label='15 KM' />
                          <FormControlLabel value='10KM' control={<Radio />} label='10 KM' />
                          <FormControlLabel value='anywhere' control={<Radio />} label='Anywhere in the city' />
                        </RadioGroup>
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item md={12}>
                      <Divider />
                    </Grid> */}
                    {/* <Grid item md={12}>
                      <FormControl>
                        <FormLabel id='missed-call'>Missed Call:</FormLabel>
                        <RadioGroup
                          aria-labelledby='missed-call'
                          name='missedCall'
                          value={currentUpdate.missedCall}
                          onChange={handleChange}
                        >
                          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                          <FormControlLabel value='no' control={<Radio />} label='No' />
                          <FormControlLabel value='both' control={<Radio />} label='Both' />
                        </RadioGroup>
                      </FormControl>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid lg={9} md={8} sm={8} xs={12}>
              <Paper sx={{ p: 5, m: 4 }}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
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
                  {isLoading ? (
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    getAllApplicationData?.data &&
                    getAllApplicationData?.data?.map((data: any) => (
                      <Paper
                        key={data?.id}
                        sx={{
                          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                          mb: 5,
                          m: 3,
                          borderRadius: '10px'
                        }}
                      >
                        <Grid
                          container
                          item
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          flexDirection={fullWidthProp && 'column-reverse'}
                        >
                          <Grid item lg={8} md={8} sm={12} xs={12}>
                            <Box p={4} maxWidth={500}>
                              <Typography fontWeight={800} fontSize={18} mb={2}>
                                {data?.jobRole}
                              </Typography>
                              <Grid container>
                                {/* <Box display='flex' justifyContent='space-between'> */}
                                <Typography variant='body2'>
                                  Salary Offering : <strong>₹ {data?.maxSalary}</strong> /Month
                                </Typography>
                                <Typography variant='body2'>
                                  Location :{' '}
                                  <strong>
                                    {data?.jobLocationCity}, {data?.jobLocationState}.
                                  </strong>
                                </Typography>
                                {/* </Box> */}
                              </Grid>
                            </Box>

                            <Divider variant='fullWidth' />
                            <Box p={4} maxWidth={500}>
                              <TableContainer>
                                <Table
                                  sx={{
                                    [`& .${tableCellClasses.root}`]: {
                                      borderBottom: 'none'
                                    }
                                  }}
                                  size='small'
                                  aria-label='a dense table'
                                >
                                  <TableBody>
                                    <TableRow>
                                      <TableCell variant='body1'>Total Experience Needed</TableCell>
                                      <TableCell>{data?.experianceRequired}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell variant='body1'>Tentative Date Of Joining</TableCell>
                                      <TableCell>12th May 2023</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell variant='body1'>Skill Preferance</TableCell>
                                      <TableCell>
                                        <Stack direction='row' columnGap={2} rowGap={1} flexWrap='wrap'>
                                          {data?.skillPreferance &&
                                            data?.skillPreferance.map((skill, index) => (
                                              <Chip
                                                key={index}
                                                size='small'
                                                label={skill}
                                                sx={{ backgroundColor: '#DAE9F6', color: '#000' }}
                                              />
                                            ))}
                                        </Stack>
                                      </TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                    <TableCell>Last Tried To Call You</TableCell>
                                    <TableCell>Yesterday</TableCell>
                                  </TableRow> */}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>
                          </Grid>

                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={12}
                            xs={12}
                            p={4}
                            sx={{
                              background:
                                'linear-gradient(0deg, rgba(71, 145, 208, 0.2), rgba(71, 145, 208, 0.2)), #FFFFFF'
                            }}
                          >
                            <Stack spacing={4} maxWidth={250}>
                              <Box>
                                <Box display='flex' alignItems='center' mb={3}>
                                  <Avatar
                                    sx={{
                                      bgcolor: deepOrange[500],
                                      width: 50,
                                      height: 50,
                                      borderRadius: '10px',
                                      marginRight: '8px'
                                    }}
                                    variant='square'
                                  >
                                    {data?.companyName?.charAt(0)}
                                  </Avatar>
                                  <Typography variant='body1' fontWeight='900'>
                                    {data?.companyName}
                                  </Typography>
                                </Box>
                                <Typography variant='body2'>Location</Typography>
                                <Typography variant='body1'>
                                  {data?.jobLocationAddress}, {data?.jobLocationCity}.
                                </Typography>
                              </Box>
                              <Box pb={3}>
                                <Typography variant='body2'>English Speaking Requirement</Typography>
                                <Typography variant='body1'>{data?.englishLevel}</Typography>
                              </Box>
                              <Box>
                                <Button size='small' variant='outlined' sx={{ mb: 3 }}>
                                  <Icon icon={'ph:eye'} />
                                  <span style={{ marginLeft: 5 }}>Active Today</span>
                                </Button>

                                {/* <Button size='small' variant='outlined'>
                                    <Icon icon={'solar:file-outline'} />
                                    <span style={{ marginLeft: 5 }}>Has Your Resume</span>
                                  </Button> */}
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Divider variant='fullWidth' />
                        </Grid>
                        <Grid container item p={4} rowSpacing={fullWidthProp ? 2 : 0} columnSpacing={2}>
                          <Grid item lg={6} md={6} sm={4} xs={12}>
                            <Button size='small' fullWidth={fullWidthProp && true} variant='outlined'>
                              Received offer Letter
                            </Button>
                          </Grid>
                          <Grid item lg={3} md={3} sm={4} xs={12}>
                            <Button size='small' fullWidth={fullWidthProp && true} variant='outlined'>
                              <Icon icon={'la:telegram-plane'} />
                              <span style={{ marginLeft: 5 }}>Message</span>
                            </Button>
                          </Grid>
                          <Grid item lg={3} md={3} sm={4} xs={12}>
                            <Button size='small' fullWidth={fullWidthProp && true} variant='contained'>
                              <Icon icon={'ic:outline-phone'} />
                              <span style={{ marginLeft: 5 }}>1234567890</span>
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))
                  )}
                  <div>
                    {getAllApplicationData?.data?.length !== 0 ? (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TablePagination
                          rowsPerPageOptions={[1, 2]}
                          component='div'
                          count={getAllApplicationData?.total}
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
                  </div>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default trackApplication
