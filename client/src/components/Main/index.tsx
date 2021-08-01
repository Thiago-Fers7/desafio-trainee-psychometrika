import { useContext, useEffect, useState } from 'react'

import { Dashboard } from "../Dashboard"
import { ChaptersContext } from '../../contexts/ChaptersContext'

import styles from './styles.module.scss'

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

function Main() {
    const { getAllChapters, allChapters, isChapters } = useContext(ChaptersContext)

    useEffect(() => {
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
                {isChapters && allChapters.map((chapter: AllChapterData, index: number) => <Dashboard key={index} chapter={chapter} index={index} />)}
            </article>
        </main>
    )
}

export { Main }