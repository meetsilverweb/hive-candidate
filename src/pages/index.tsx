import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import Spinner from 'src/@core/components/spinner'

const Home = () => {
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    //@ts-ignore
    let userData = JSON.parse(localStorage.getItem('userData'))
    // if (auth.user && router.route === '/') {
    if (router.route === '/dashboard') {
      router.push('/dashboard')
    } else if (router.route === '/') {
      if (userData?.resumeUploded) {
        if (userData?.stayConnectedDetailsFilled) {
          router.push('/dashboard')
        } else {
          router.push('/stay-connected')
        }
      } else {
        router.push('/upload-resume')
      }
    }
  }, [router])
  return <Spinner sx={{ height: '100%' }} />
}

export default Home
