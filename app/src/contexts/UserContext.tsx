import { createContext, ReactNode, useState } from "react";

interface UserContextData {
    handleAuthentication: (userData: string) => void,
    authenticationData: string,
    isAdmin: boolean,
    handleStudentVision: (isVisionAdm: boolean) => void,
    isAdminStudentVision: boolean,
    currentTeam: number,
    handleTeam: (team: number) => void
}

export const UserContext = createContext({} as UserContextData)

type UserContextProviderProps = { children: ReactNode }

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [authenticationData, setAuthenticationData] = useState<string>('')
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isAdminStudentVision, setIsAdminStudentVision] = useState<boolean>(false)
    const [currentTeam, setCurrentTeam] = useState<number>(0)

    function handleTeam(team: number) {
        setCurrentTeam(team)
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
            currentTeam,
            handleTeam
        }}>
            {children}
        </UserContext.Provider>
    )
}