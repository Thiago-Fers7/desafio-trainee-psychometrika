import { useContext, useEffect, useState } from 'react'

import { Dashboard } from "../Dashboard"
import { ChaptersContext } from '../../contexts/ChaptersContext'

import styles from './styles.module.scss'

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
                {isChapters && allChapters.map((chapter: ChapterData, index: number) =>  <Dashboard key={index} chapter={chapter} />)}
            </article>
        </main>
    )
}

export { Main }