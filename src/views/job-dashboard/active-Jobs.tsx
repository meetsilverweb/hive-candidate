import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { CardActions, CardHeader, Chip, IconButton, SvgIcon } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import Link from 'next/link'

// Styled Box component
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))
const JobCards = ({ apiData }: any) => {
  console.log('allJobData', apiData)
  return (
    <>
      <Grid container spacing={4}>
        {apiData?.map((item: any) => {
          return (
            <Grid item xs={12} sm={6} md={3}>
              <Card
                key={item?.id}
                sx={{
                  borderRadius: '15px',
                  borderTop: '6px solid #1057CA',
                  background: '#FFFFFF',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                }}
              >
                <CardHeader
                  title={'DESIGN'}
                  sx={{
                    padding: '12px 0px 0px 14px'
                  }}
                  action={
                    <Box
                      sx={{
                        display: 'flex'
                      }}
                    >
                      <Box
                        sx={{
                          margin: 1
                        }}
                      >
                        <Link href={`/job-dashboard/${item?.id}`}>
                          <SvgIcon xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                            <path
                              fill='#222'
                              d='M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z'
                            />
                          </SvgIcon>
                        </Link>
                      </Box>
                      <Box
                        sx={{
                          margin: 1
                        }}
                      >
                        <SvgIcon xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                          <g fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                            <path d='M0 0h24v24H0z' />
                            <path
                              fill='#222'
                              d='M20 6a1 1 0 0 1 .117 1.993L20 8h-.081L19 19a3 3 0 0 1-2.824 2.995L16 22H8c-1.598 0-2.904-1.249-2.992-2.75l-.005-.167L4.08 8H4a1 1 0 0 1-.117-1.993L4 6h16zm-9.489 5.14a1 1 0 0 0-1.218 1.567L10.585 14l-1.292 1.293l-.083.094a1 1 0 0 0 1.497 1.32L12 15.415l1.293 1.292l.094.083a1 1 0 0 0 1.32-1.497L13.415 14l1.292-1.293l.083-.094a1 1 0 0 0-1.497-1.32L12 12.585l-1.293-1.292l-.094-.083zM14 2a2 2 0 0 1 2 2a1 1 0 0 1-1.993.117L14 4h-4l-.007.117A1 1 0 0 1 8 4a2 2 0 0 1 1.85-1.995L10 2h4z'
                            />
                          </g>
                        </SvgIcon>
                      </Box>
                    </Box>
                  }
                />
                <CardContent
                  sx={{
                    padding: '0px 12px'
                  }}
                >
                  <h3 className='active-job-second-heding'>{item?.companyName}</h3>
                  <h4 className='active-job-third-heding'>{'Candidates'}</h4>
                  <div className='active-job-counter-div'>
                    <div className='vertical-divider-div'>
                      <h4 className='active-job-forth-heding'>Total</h4>
                      <h1 className='active-job-forth-heding'>57</h1>
                    </div>
                    <div className='vertical-divider-div-blue'>
                      {' '}
                      <h4 className='active-job-forth-heding'>NEW</h4>
                      <h1 className='active-job-forth-heding'>5</h1>
                    </div>
                  </div>
                  <div className='active-job-card-other-details'>
                    <ul className='active-job-card-other-details-conteiner'>
                      <li className='active-job-card-other-details-content'>Amazon.In</li>
                      <li className='active-job-card-other-details-content'>Full time</li>
                    </ul>
                  </div>
                  <hr
                    style={{
                      color: '#6666664D'
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <Chip
                        label='Publish'
                        sx={{
                          background: 'none'
                        }}
                        icon={<Icon icon='ion:cloud-upload-outline' fontSize={20} />}
                      />
                    </div>
                    <div>
                      <Chip
                        sx={{
                          background: 'none',
                          fontSize: '0.8125rem'
                        }}
                        label='See Details >'
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(`http://192.168.1.109:5003/master/getAllSkill`)
  const jobPost = response
  return {
    props: {
      jobPost
    }
  }
}
export default JobCards
