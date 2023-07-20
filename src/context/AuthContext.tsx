// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { toast } from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = localStorage.getItem('accessToken')

      if (!storedToken || storedToken === null || storedToken === undefined) {
        if (
          router.pathname === '/create-password' ||
          router.pathname === '/register' ||
          router.pathname === '/forgot-password' ||
          router.pathname === '/otp-verification' ||
          router.pathname === '/upload-resume'
        ) {
        } else {
          setLoading(true)
          router.replace('/login')
        }
      } else {
        setLoading(false)
        if (router.pathname === '/change-password') {
          router.push(router.pathname)
        } else if (router.pathname === '/uppload-resume') {
          router.push(router.pathname)
        } else if (router.pathname === '/stay-connected') {
          router.push(router.pathname)
        } else {
          router.push('/dashboard')
        }
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = ({ email, password }: any) => {
    const payload = {
      employeeEmail: email,
      password: password
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/employeeLogin`, payload, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then(async response => {
        if (response?.data?.status === 200) {
          const returnUrl = router.query.returnUrl
          setLoading(false)
          setUser({ ...response?.data?.data?.employee })
          let token = response?.data?.data?.token ? response?.data?.data?.token : undefined
          let userData = response?.data?.data?.employee ? response?.data?.data?.employee : undefined
          localStorage.setItem('userData', JSON.stringify(userData))
          localStorage.setItem('accessToken', token)
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL as string)
          if (response?.data?.data?.employee?.resumeUploded === true) {
            if (response?.data?.data?.employee?.stayConnectedDetailsFilled === true) {
              router.push('/dashboard')
            } else {
              console.log('stay-connected ', response?.data?.data?.employee)
              router.push('/stay-connected')
            }
          } else {
            router.push('/upload-resume')
          }
          // router.push('/dashboard')
        } else if (response?.data?.status === 402) {
          toast.error('Invalid credentials')
          // router.push({ pathname: '/otp-verification', query: { email: payload?.employeeEmail } })
        } else if (response?.data?.status === 401) {
          toast.error('Invalid credentials')
        } else {
          setLoading(false)
          toast.error('Somthing went wrong')
        }
      })
      .catch(() => {
        localStorage.removeItem('accessToken')
        router.replace('/login')

        setUser(null)
        setLoading(false)
        // if (!router.pathname.includes('login')) {
        //   router.replace('/login')
        // }
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
