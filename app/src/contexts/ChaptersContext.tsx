import { createContext, ReactNode, useState } from "react";

interface ChapterData {
    content: {
        title: string,
        text: string
    },
    _id: string,
    id: string,
    index: {
        currentIndex: number,
        permanentIndex: number
    },
    view: boolean,
    createdAt: string,
    updatedAt: string,
    __v?: number
}

interface AllChapterData {
    allChaptersInOrder: ChapterData[]
}

// interface ChapterDataForDb {
//     id: string,
//     att: {
//         view: boolean,
//         index: {
//             permanentIndex: number,
//             currentIndex: number | null
//         }
//     }
// }

interface ChaptersContextData {
    handleGlobalChapters: (newValue: AllChapterData[]) => void,
    allChapters: AllChapterData[]
}

export const ChaptersContext = createContext({} as ChaptersContextData)

type ChaptersContextProviderProps = { children: ReactNode }

export function ChaptersContextProvider({ children }: ChaptersContextProviderProps) {
    const [allChapters, setAllChapters] = useState<AllChapterData[]>({} as AllChapterData[])

    function handleGlobalChapters(newValue: AllChapterData[]) {
        setAllChapters(newValue)
    }

    return (
        <ChaptersContext.Provider value={{
            handleGlobalChapters,
            allChapters
        }}>
            {children}
        </ChaptersContext.Provider>
    )
}