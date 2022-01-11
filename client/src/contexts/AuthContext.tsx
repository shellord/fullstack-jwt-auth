import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

type RegisterProps = {
  username: string
  password: string
  email: string
}

type UserProps = {
  id: string
  username: string
  email: string
}
type AuthContextType = {
  accessToken: string | undefined
  register: ({ username, email, password }: RegisterProps) => any
  isLoggedin: boolean
  user?: UserProps
  logout: () => any
  loading: boolean
}

const defaultAuthContextData = {
  accessToken: undefined,
  isLoggedin: false,
  user: undefined,
  register: () => {},
  logout: () => {},
  loading: true,
}
const AuthContext = React.createContext<AuthContextType>(defaultAuthContextData)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
  const [accessToken, setAccesstoken] = useState<string>()
  const [isLoggedin, setisLoggedin] = useState<boolean>(false)
  const [user, setUser] = useState<UserProps>()
  const [loading, setLoading] = useState(true)

  const client = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
  })
  useEffect(() => {
    async function getAccessToken() {
      try {
        const response = await client.post('/auth/refreshToken')
        if (response.status === 200) {
          setAccesstoken(response.data.accessToken)
          setisLoggedin(true)
          setLoading(false)
        }
      } catch (e) {
        setLoading(false)
      }
    }
    getAccessToken()
  }, [])

  const register = async ({ username, email, password }: RegisterProps) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/signup',
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      if (response.status === 200) {
        if (response.data.accessToken) {
          setAccesstoken(response.data.accessToken)
          setisLoggedin(true)
        }
        return true
      }
    } catch (e) {
      const err = e as AxiosError
      throw err.response?.data.error
    }
  }

  const logout = async () => {
    try {
      const response = await client.post(
        '/auth/logout',
        {},
        { withCredentials: true }
      )
      if (response.status === 200) {
        setAccesstoken(undefined)
        setisLoggedin(false)
      }
    } catch (e) {
      throw e
    }
  }
  const value = {
    accessToken,
    isLoggedin,
    user,
    register,
    logout,
    loading,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
