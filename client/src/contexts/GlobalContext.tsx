import { useEffect } from "react";
import { createContext, ReactNode, useRef, useState } from "react";

interface GlobalContextData {
    handleWarning: (warning: boolean, message: string) => void,
    isWarning: boolean,
    messageWarning: string
}

export const GlobalContext = createContext({} as GlobalContextData)

type GlobalContextProviderProps = { children: ReactNode }

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    const [isWarning, setIsWarning] = useState<boolean>(false)
    const [messageWarning, setMessageWarning] = useState<string>('')

    function handleWarning(warning: boolean, message: string) {
        setIsWarning(warning)
        setMessageWarning(message)

        if (!isWarning) {
            setTimeout(() => {
                setIsWarning(false)
            }, 4000)
        }
    }

    return (
        <GlobalContext.Provider value={{
            handleWarning,
            isWarning,
            messageWarning
        }}>
            {children}
        </GlobalContext.Provider>
    )
}