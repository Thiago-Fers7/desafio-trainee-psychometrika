import { createContext, ReactNode } from "react";

// interface ChapterData {
//     content: {
//         title: string,
//         text: string
//     },
//     _id: string,
//     id: string,
//     index: {
//         currentIndex: number | null,
//         permanentIndex: number
//     },
//     view: boolean,
//     createdAt: string,
//     updatedAt: string,
//     __v?: number
// }

// interface AllChapterData {
//     allChaptersInOrder: ChapterData[]
// }

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
}

export const ChaptersContext = createContext({} as ChaptersContextData)

type ChaptersContextProviderProps = { children: ReactNode }

export function ChaptersContextProvider({ children }: ChaptersContextProviderProps) {

    return (
        <ChaptersContext.Provider value={{

        }}>
            {children}
        </ChaptersContext.Provider>
    )
}