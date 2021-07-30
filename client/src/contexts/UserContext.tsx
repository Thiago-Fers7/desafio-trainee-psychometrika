import { createContext, ReactNode, useState } from "react";

interface UserContextData {
    handlwAuthentication: (userData: string) => void,
    authenticationData: string
}

export const UserContext = createContext({} as UserContextData)

type UserContextProviderProps = { children: ReactNode }

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [authenticationData, setAuthenticationData] = useState<string>('')

    function handlwAuthentication(userData: string) {
        setAuthenticationData(userData)
    }

    return (
        <UserContext.Provider value={{
            handlwAuthentication,
            authenticationData
        }}>
            {children}
        </UserContext.Provider>
    )
}