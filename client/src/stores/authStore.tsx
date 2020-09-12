import { createContext } from 'react'

const initialLoginState = {
  isLoading: true,
  email: '',
  username: '',
  image: '',
  userToken: '',
}

export const AuthContext = createContext<any>(initialLoginState);