import React, { useContext, useState } from 'react'

type AuthContextType = {
  accessToken?: string | undefined
  changeAccessToken?: (accessToken: string) => void
}
const defaultAuthContextData = {
  accessToken: undefined,
}
const AuthContext = React.createContext<AuthContextType>(defaultAuthContextData)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
  const [accessToken, setAccesstoken] = useState<string>()
  const changeAccessToken = (accessToken: string) => {
    setAccesstoken(accessToken)
  }
  const value = {
    accessToken,
    changeAccessToken,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
