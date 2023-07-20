import { Icon } from '@iconify/react'
import { Box, Button, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useState } from 'react'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

interface FileProp {
  name: string
  type: string
  size: number
}

const UploadResume = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])
  const [userID, setUserID] = useState('')
  const router = useRouter()
  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.pdf']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })
  const Img = styled('img')(({ theme }) => ({
    width: 48,
    height: 48,
    marginBottom: theme.spacing(8.5)
  }))
  const img = files.map((file: FileProp) => (
    <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
  ))
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader?.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })
  }
  useEffect(() => {
    // @ts-ignore
    setUserID(JSON.parse(localStorage.getItem('userData'))?.id)
  }, [])
  const handleSubmit = async () => {
    if (files[0]) {
      const file = files[0]
      const base64 = await convertBase64(file)
      let payload = {
        file: base64 ? base64 : null,
        fileName: file.name,
        resumeUploded: true
      }
      const res = axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/resumeUpload/${userID}`, payload, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response?.data?.status === 200) {
            toast.success('resume upload successfully')
            router.push('/stay-connected')
          } else {
            toast.error('resume upload failed please try again')
          }
        })
    } else {
      toast.error('please select resume to upload')
    }
  }

  return (
    <Box className='content-right' sx={{ background: 'linear-gradient(117.99deg, #C4C4C4 14.54%, #FFFFFF 42.75%)' }}>
      <Container sx={{ my: 10 }}>
        <Grid container spacing={2}>
          {/* <Grid xs={8}> */}
          <Box>
            <Stack spacing={2}>
              <Typography fontWeight={800} variant='h5' color={'black'}>
                Welcome to the world
              </Typography>
              <Typography fontWeight={800} variant='h4' color={'black'}>
                Your Profile is <br /> now 50% <br /> complete!
              </Typography>
              <Typography fontWeight={800} color={'black'}>
                We were able to do some neat ML tricks to read your resume and fill out most of your profile for you!
              </Typography>
            </Stack>
          </Box>
          {/* </Grid> */}
          {/* <Grid xs={4}>
            <Typography variant='h3' color={'black'}>
              50%
            </Typography>
          </Grid> */}
        </Grid>
        <Divider sx={{ my: 5 }} />

        <Box>
          <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
            <input {...getInputProps()} />
            {files.length ? (
              img
            ) : (
              <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Icon width={50} icon='icon-park-outline:upload-two' />{' '}
                <Typography variant='h5' sx={{ mb: 2.5 }}>
                  Drop files here or click to upload.
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  (This is just a demo drop zone. Selected files are not actually uploaded.)
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            margin: '130px'
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              handleSubmit()
            }}
          >
            Next
          </Button>
          {/* <Box display={'flex'} ml={5}>
            <Link
              href='/stay-connected'
              onClick={() => {
                let payload = {
                  file: null,
                  fileName: null,
                  resumeUploded: true
                }
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/resumeUpload/${userID}`, payload, {
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                  }
                })
              }}
            >
              Skip this step
            </Link>
          </Box> */}
        </Box>
      </Container>
    </Box>
  )
}

UploadResume.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

UploadResume.guestGuard = true

export default UploadResume
