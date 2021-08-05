import { createContext, ReactNode, useState } from "react";

interface UserContextData {
    handleAuthentication: (userData: string) => void,
    authenticationData: string,
    isAdmin: boolean,
    handleStudentVision: (isVisionAdm: boolean) => void,
    isAdminStudentVision: boolean,
    handleWarning: (warning: boolean, message: string) => void,
    isWarning: boolean,
    messageWarning: string
}

export const UserContext = createContext({} as UserContextData)

type UserContextProviderProps = { children: ReactNode }

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [authenticationData, setAuthenticationData] = useState<string>('')
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isAdminStudentVision, setIsAdminStudentVision] = useState<boolean>(false)

    const [isWarning, setIsWarning] = useState<boolean>(false)
    const [messageWarning, setMessageWarning] = useState<string>('')

    function handleWarning(warning: boolean = false, message: string) {
        setIsWarning(warning)
        setMessageWarning(message)
    }

    function handleAuthentication(userData: string) {
        if (userData === 'admin') {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
        setAuthenticationData(userData)
    }

    function handleStudentVision(isVisionAdm: boolean) {
        setIsAdminStudentVision(isVisionAdm)
    }

    return (
        <UserContext.Provider value={{
            handleAuthentication,
            authenticationData,
            isAdmin,
            handleStudentVision,
            isAdminStudentVision,
            handleWarning,
            isWarning,
            messageWarning
        }}>
            {children}
        </UserContext.Provider>
    )
}