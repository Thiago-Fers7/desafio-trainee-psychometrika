import { createContext, ReactNode, useState } from "react";
import { AxiosResponse } from 'axios'
import { api } from "../services/api";

interface ChapterData {
    allChaptersInOrder: [
        content: {
            title: string,
            text: string
        },
        classTitle: string,
        _id: string,
        id: string,
        index: number,
        view: boolean,
        createdAt: string,
        updatedAt: string,
    ]
}

interface ChaptersContextData {
    getAllChapters: () => Promise<void>,
    allChapters: ChapterData[],
    isChapters: boolean
}


export const ChaptersContext = createContext({} as ChaptersContextData)

type ChaptersContextProviderProps = { children: ReactNode }

export function ChaptersContextProvider({ children }: ChaptersContextProviderProps) {
    const [allChapters, setAllChapters] = useState<ChapterData[]>({} as ChapterData[])
    const [isChapters, setIsChapters] = useState<boolean>(false)

    async function getAllChapters(): Promise<void> {
        const res: AxiosResponse = await api.get('/chapters')

        const data = res.data

        if (data) {
            setAllChapters(data)
            setIsChapters(true)
        } else {
            throw 'Chapters not found'
        }
    }

    return (
        <ChaptersContext.Provider value={{
            getAllChapters,
            allChapters,
            isChapters
        }}>
            {children}
        </ChaptersContext.Provider>
    )
}