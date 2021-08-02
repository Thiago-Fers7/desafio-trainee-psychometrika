import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

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

interface ChildrenDataMod {
    chapter: AllChapterData,
    index: number
}

function Dashboard({ chapter, index }: ChildrenDataMod) {
    function reducer(state: ChapterData[], action: { type: string, value: any, index: number }) {
        switch (action.type) {
            case 'view':
                state[action.index].view = action.value
                state[action.index].index = !action.value ? NaN : action.index

                let count: number = 0
                state.forEach((obj: ChapterData, index: number) => {
                    if (!isNaN(state[index].index)) {
                        state[index].index = count
                        count++
                    }
                })

                console.log(state)

                return [
                    ...state
                ]
            default:
                return [
                    ...state
                ]
        }
    }

    const [dashboardReducer, setDashboardReducer] = useReducer(reducer, chapter.allChaptersInOrder)

    const [aFront, setAFront] = useState<string>('Frente A')

    const [isReorderList, setIsReorderList] = useState<boolean>(false)
    const [isDisabledInput, setIsDisabledInput] = useState<boolean>(true)

    const { isAdminStudentVision } = useContext(UserContext)

    const inputRef = useRef<HTMLInputElement>(null)

    function handleDashboardTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value

        if (value.length < 27) {
            setAFront(value)
        }
    }

    // Mudar Foco para Input
    useEffect(() => {
        if (!isDisabledInput)
            inputRef.current?.focus()
    }, [isDisabledInput])

    function handleEditTitle(event: React.FormEvent) {
        if (aFront.length === 0) {
            alert("Informe ao menos um caractere")
            inputRef.current?.focus()
            return
        }

        if (!isDisabledInput) {
            alert("Novo título salvo!")
        }

        setIsDisabledInput(!isDisabledInput)
    }

    function handleHide(index: number): void {
        setDashboardReducer({ type: 'view', value: !dashboardReducer[index].view, index })


    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault()
    }

    return (
        <section className={styles.series}>
            <div className={styles.titleSeries}>
                <h3>{`${index + 1}ª Série`}</h3>

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
                        size={aFront.length > 6 ? aFront.length - 5 : 2}
                        className={!isDisabledInput ? styles.edit : ''}
                        value={aFront}
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

                {dashboardReducer.map((chapter: ChapterData, index: number) => {
                    return (
                        <div className={`${styles.chapterContainer} ${!chapter.view ? styles.scratched : ''}`} key={index}>
                            <span>
                                {!isAdminStudentVision && <img src="/images/move-icon.svg" alt="Mover" />}
                            </span>

                            <span className={styles.index}>
                                <span>{!isNaN(chapter.index) ? chapter.index + 1 : ''}</span>
                            </span>

                            <span className={styles.titleChapter}>{chapter.content.title}</span>

                            <div className={styles.icons}>
                                {!isAdminStudentVision && (
                                    <span onClick={() => handleHide(index)}>
                                        {!chapter.view ? (
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