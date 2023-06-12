import { createContext, useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
}

const AuthContext = createContext(defaultAuthContext)
export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({children}) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [payload, setPayload] = useState(null)
  const {pathname} = useLocation()
}