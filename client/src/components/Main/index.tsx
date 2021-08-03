import { useEffect, useState } from "react"
import { Dashboard } from "../Dashboard"

import styles from './styles.module.scss'
import { AxiosResponse } from 'axios'
import { api } from '../../services/api'

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
    const [allChapters, setAllChapters] = useState<AllChapterData[]>({} as AllChapterData[])
    const [isChapters, setIsChapters] = useState<boolean>(false)

    useEffect(() => {
        ; (async () => {
            try {
                const res: AxiosResponse = await api.get('/chapters')

                const data: AllChapterData[] = res.data

                if (data) {
                    setAllChapters(data)
                    setIsChapters(true)
                } else {
                    throw new Error('Chapters not found')
                }
            } catch (error) {
                console.log(error)
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
                        {allChapters.map((chapter: AllChapterData, index: number) => <Dashboard key={index} chapter={chapter} serieIndex={index} />)}
                    </article>
                </main>
            )}
        </>
    )
}

export { Main }