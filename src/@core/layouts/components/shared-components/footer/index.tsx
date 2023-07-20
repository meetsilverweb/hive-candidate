// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Footer Content Component
import FooterContent from './FooterContent'
import { Button, Divider, Grid, SvgIcon, TextField } from '@mui/material'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

import { borderRadius, fontWeight } from '@mui/system'
import { footerItemTitles, footerItems } from '../../../../../constants/footerItems'
import Link from 'next/link'

interface Props {
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  footerStyles?: NonNullable<LayoutProps['footerProps']>['sx']
  footerContent?: NonNullable<LayoutProps['footerProps']>['content']
}

const Footer = (props: Props) => {
  // ** Props
  const { settings, footerStyles, footerContent: userFooterContent } = props

  // ** Vars
  const { skin, layout, footer, contentWidth } = settings

  if (footer === 'hidden') {
    return null
  }

  return (
    <Grid
      container
      sx={{
        background: `linear-gradient(0deg, rgba(71, 145, 208, 0.2), rgba(71, 145, 208, 0.2)), #FFFFFF`,
        padding: '35px'
      }}
    >
      <Grid item sm={12} xs={12} md={6}>
        <h2
          style={{
            margin: 0
          }}
        >
          Signup to our newsletter
        </h2>
        <h3>Stay updated with the latest news, announcements and articles.</h3>
      </Grid>

      <Divider
        sx={{
          marginBottom: '30px'
        }}
      />
      {/* <Grid container item lg={12} md={12} sm={12} xs={12}>
        {footerItemTitles.map((title, index) => {
          return (
            <Grid key={index} item xs={2} sm={2} md={4} lg={2}>
              <h4>{title}</h4>
            </Grid>
          )
        })}
      </Grid> */}

      <Grid container item lg={12} md={12} sm={12} xs={12}>
        <Grid container item xs={6} sm={4} md={2} lg={2} direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h4>Products</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {footerItems.map(
              (item: any, index: number) =>
                item.type === 'products' && (
                  <div key={index}>
                    <p style={{ margin: '10px 0px' }}>{item?.name}</p>
                  </div>
                )
            )}
          </Grid>
        </Grid>

        <Grid container item xs={6} sm={4} md={2} lg={2} direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h4>Company</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {footerItems.map(
              (item: any, index: number) =>
                item.type === 'company' && (
                  <div key={index}>
                    <p style={{ margin: '10px 0px' }}>{item?.name}</p>
                  </div>
                )
            )}
          </Grid>
        </Grid>
        <Grid container item xs={6} sm={4} md={2} lg={2} direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h4>Resources</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {footerItems.map(
              (item: any, index: number) =>
                item.type === 'Resoures' && (
                  <div key={index}>
                    <p style={{ margin: '10px 0px' }}>{item?.name}</p>
                  </div>
                )
            )}
          </Grid>
        </Grid>
        <Grid container item xs={6} sm={4} md={2} lg={2} direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h4>Social</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {footerItems.map(
              (item: any, index: number) =>
                item.type === 'Social' && (
                  <div key={index}>
                    <p style={{ margin: '10px 0px' }}>{item?.name}</p>
                  </div>
                )
            )}
          </Grid>
        </Grid>
        <Grid container item xs={6} sm={4} md={2} lg={2} direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h4>Legal</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {footerItems.map(
              (item: any, index: number) =>
                item.type === 'Legal' && (
                  <div key={index}>
                    <p style={{ margin: '10px 0px' }}>{item?.name}</p>
                  </div>
                )
            )}
          </Grid>
        </Grid>
        <Grid container item xs={6} sm={4} md={2} lg={2} direction='row'>
          <Grid item xs={12} sm={12} md={12} lg={12} textAlign={'center'}>
            <h4>Get The App</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box
              sx={{
                height: '100%',
                width: '100%'
              }}
            >
              <img src='/images/pages/google-play-badge1.png' alt='stay-connected-image' width='100%' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box
              sx={{
                height: '100%',
                width: '100%'
              }}
            >
              <img
                src='/images/pages/Download_on_the_App_Store_Badge_US-UK_RGB_blk_0929171.png'
                alt='stay-connected-image'
                width='100%'
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
