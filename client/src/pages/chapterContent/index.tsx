import { useEffect, useState } from "react"
import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { ChaptersContext } from "../../contexts/ChaptersContext"
import { UserContext } from "../../contexts/UserContext"

import styles from './styles.module.scss'

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

function ChapterContent() {
    const { allChapters } = useContext(ChaptersContext)
    const { isAdmin, isAdminStudentVision } = useContext(UserContext)

    const { authorization, chapterId } = useParams<{ chapterId: string, authorization: string }>()

    const [chapters, setChapters] = useState<ChapterData>({} as ChapterData)
    const [isChapters, setIsChapters] = useState<boolean>(false)

    useEffect(() => {
        
        allChapters.forEach((serie: AllChapterData) => {
            const res = serie.allChaptersInOrder.find(chapters => chapters.id === chapterId)
            if (res) {
                setChapters(res)
                setIsChapters(true)
                document.title = `Desafio Treinee | ${res?.content.title}` 
            }
        })
    }, [allChapters])

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.mainContainer}>
                {isChapters && (
                    <>
                        <header>
                            <h2>
                                <Link to={`/dashboard/${authorization}`}>
                                    <img src="/images/previous.svg" alt="Voltar" />
                                </Link>
                                <span>{chapters.content.title}</span></h2>
                        </header>

                        <section>
                            <div dangerouslySetInnerHTML={{__html: chapters.content.text}} />
                        </section>
                    </>
                )}
            </main>
        </div>
    )
}

export { ChapterContent }