import { createContext, useContext } from 'react'

export const AuthContext = createContext(new Object())

export function useAuth() {

    return useContext(AuthContext)
}
