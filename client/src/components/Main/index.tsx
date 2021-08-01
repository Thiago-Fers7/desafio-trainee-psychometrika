import { api } from '../../services/api'
import { useEffect, useState } from 'react'

import { Dashboard } from "../Dashboard"

import styles from './styles.module.scss'
import { AxiosResponse } from 'axios'

interface ChapterData {
    chaptersContent: [
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

function Main() {
    const [allChapters, setAllChapters] = useState<ChapterData[]>({} as ChapterData[])

    useEffect(() => {
        async function getAllChapters() {
            const res: AxiosResponse = await api.get('/chapters')

            const data = res.data

            console.log(data)

            // if (data) {
            //     setAllChapters(data)
            // } else {
            //     throw 'Chapters not found'
            // }
        }

        try {
            getAllChapters()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <main className={styles.container}>
            <header>
                <h2>Nome da Escola</h2>
            </header>

            <article className={styles.dashboardContainer}>

                <Dashboard title="1º Série" />
                <Dashboard title="2º Série" />
            </article>
        </main>
    )
}

export { Main }