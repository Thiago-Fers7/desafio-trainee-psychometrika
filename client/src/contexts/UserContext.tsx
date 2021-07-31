import { createContext, ReactNode, useState } from "react";

interface UserContextData {
    handlwAuthentication: (userData: string) => void,
    authenticationData: string,
    isAdmin: boolean
}

export const UserContext = createContext({} as UserContextData)

type UserContextProviderProps = { children: ReactNode }

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [authenticationData, setAuthenticationData] = useState<string>('')
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    function handlwAuthentication(userData: string) {
        if (userData === 'admin') {
            setIsAdmin(true)
        }
        setAuthenticationData(userData)
    }

    return (
        <UserContext.Provider value={{
            handlwAuthentication,
            authenticationData,
            isAdmin
        }}>
            {children}
        </UserContext.Provider>
    )
}