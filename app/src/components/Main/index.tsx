import { useEffect, useState } from "react"
import { Dashboard } from "../Dashboard"

import styles from './styles.module.scss'
import { AxiosResponse } from 'axios'
import { api } from '../../services/api'
import { useContext } from "react"
import { ChaptersContext } from "../../contexts/ChaptersContext"
import { UserContext } from "../../contexts/UserContext"

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

function Main() {
    const [isChapters, setIsChapters] = useState<boolean>(false)

    const { handleGlobalChapters, allChapters } = useContext(ChaptersContext)
    const { currentTeam, isAdmin } = useContext(UserContext)

    useEffect(() => {
        ; (async () => {
            try {
                const res: AxiosResponse = await api.get('/chapters')

                const data: AllChapterData[] = res.data

                if (data) {
                    handleGlobalChapters(data)
                    setIsChapters(true)
                } else {
                    throw new Error('Chapters not found')
                }
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <>
            {isChapters && (
                <main className={styles.container}>
                    <header>
                        <h2>Nome da Escola</h2>
                    </header>
                    <article className={styles.dashboardContainer}>
                        {allChapters.map((chapter: AllChapterData, index: number) => {
                            return (
                                <div key={index}>
                                    {(currentTeam - 1) === index ? (
                                        <Dashboard chapter={chapter} serieIndex={index} />
                                    ) : isAdmin && (
                                        <Dashboard chapter={chapter} serieIndex={index} />
                                    )}
                                </div>
                            )
                        })}
                    </article>
                </main>
            )}
        </>
    )
}

export { Main }