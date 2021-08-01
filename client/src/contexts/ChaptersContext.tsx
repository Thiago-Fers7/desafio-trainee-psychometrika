import { createContext, ReactNode, useState } from "react";
import { AxiosResponse } from 'axios'
import { api } from "../services/api";

interface ChapterData {
    content: {
        title: string,
        text: string
    },
    _id: string,
    id: string,
    index: number,
    view: boolean,
    createdAt: string,
    updatedAt: string,
    __v?: number
}

interface AllChapterData {
    allChaptersInOrder: ChapterData[]
}

interface ChaptersContextData {
    getAllChapters: () => Promise<void>,
    allChapters: AllChapterData[],
    isChapters: boolean
}


export const ChaptersContext = createContext({} as ChaptersContextData)

type ChaptersContextProviderProps = { children: ReactNode }

export function ChaptersContextProvider({ children }: ChaptersContextProviderProps) {
    const [allChapters, setAllChapters] = useState<AllChapterData[]>({} as AllChapterData[])
    const [isChapters, setIsChapters] = useState<boolean>(false)

    async function getAllChapters(): Promise<void> {
        const res: AxiosResponse = await api.get('/chapters')

        const data: AllChapterData[] = res.data

        if (data) {
            console.log(data)
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