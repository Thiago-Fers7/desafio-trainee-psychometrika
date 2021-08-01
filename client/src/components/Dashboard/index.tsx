import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

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

interface ChildrenDataMod {
    chapter: ChapterData
}

function Dashboard({ chapter }: ChildrenDataMod) {
    const titleDash: string = 'Frente A'
    const fakeArrayChapters: string[] = [
        'Conjuntos numéricos',
        'Conjuntos',
        'Relações e intrdução às funções',
        'Função constante e função afim'
    ]

    const [dashboardTitle, setDashboardTitle] = useState<string>(titleDash)

    const [isReorderList, setIsReorderList] = useState<boolean>(false)
    const [isDisabledInput, setIsDisabledInput] = useState<boolean>(true)
    const [isVisibleChapter, setIsVisibleChapter] = useState<boolean>(false)

    const { isAdminStudentVision } = useContext(UserContext)

    const inputRef = useRef<HTMLInputElement>(null)

    function handleDashboardTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value

        if (value.length < 27) {
            setDashboardTitle(value)
        }
    }

    // Mudar Foco para Input
    useEffect(() => {
        if (!isDisabledInput)
            inputRef.current?.focus()
    }, [isDisabledInput])

    function handleEditTitle(event: React.FormEvent) {
        if (dashboardTitle.length === 0) {
            alert("Informe ao menos um caractere")
            inputRef.current?.focus()
            return
        }

        if (!isDisabledInput) {
            alert("Novo título salvo!")
        }

        setIsDisabledInput(!isDisabledInput)
    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault()
    }

    return (
        <section className={styles.series}>
            <div className={styles.titleSeries}>
                <h3>{'title'}</h3>

                <span>
                    {!isAdminStudentVision && (
                        <>
                            {isReorderList ? (
                                <img src="/images/reorder-enable.svg" alt="Reordenar" />
                            ) : (
                                <img src="/images/reorder-disabled.svg" alt="Reordenar" />
                            )}
                        </>
                    )}
                </span>
            </div>

            <div className={styles.dashboard}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        ref={inputRef}
                        autoComplete="off"
                        size={dashboardTitle.length > 6 ? dashboardTitle.length - 5 : 2}
                        className={!isDisabledInput ? styles.edit : ''}
                        value={dashboardTitle}
                        disabled={isDisabledInput}
                        onChange={handleDashboardTitle}
                    />

                    <button type="submit" onClick={handleEditTitle}>
                        {!isAdminStudentVision && (
                            <>
                                {isDisabledInput ? (
                                    <img src="/images/edit-icon.svg" alt="Editar Título" />
                                ) : (
                                    <img src="/images/confirm-edit-icon.svg" alt="Editar Título" />
                                )}
                            </>
                        )}
                    </button>
                </form>

                {fakeArrayChapters.map((chapter: string, index: number) => {
                    return (
                        <div className={styles.chapterContainer} key={index}>
                            <span>
                                {!isAdminStudentVision && <img src="/images/move-icon.svg" alt="Mover" />}
                            </span>

                            <span className={styles.index}>
                                <span>{index + 1}</span>
                            </span>

                            <span className={styles.titleChapter}>{chapter}</span>

                            <div className={styles.icons}>
                                {!isAdminStudentVision && (
                                    <span>
                                        {isVisibleChapter ? (
                                            <img src="/images/view-disabled.svg" alt="Desabilitado Para Visualizar" />
                                        ) : (
                                            <img src="/images/view-enable.svg" alt="Habilitado Para Visualizar" />
                                        )}
                                    </span>
                                )}
                                <span><img src="/images/open-chapter.svg" alt="Abrir" /></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export { Dashboard }