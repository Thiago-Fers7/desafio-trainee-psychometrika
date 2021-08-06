import React, { EffectCallback, useRef, useState } from 'react'
import { useEffect, useReducer, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'

import { Loading } from '../Loading'
import { Widget } from '../Widget'

import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd'

import styles from './styles.module.scss'
import { GlobalContext } from '../../contexts/GlobalContext'


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

interface ChapterDataForDb {
    id: string,
    att: {
        view: boolean,
        index: {
            permanentIndex: number,
            currentIndex: number
        }
    }
}

interface AllChapterData {
    allChaptersInOrder: ChapterData[]
}

interface ChildrenDataMod {
    chapter: AllChapterData,
    serieIndex: number
}

function Dashboard({ chapter, serieIndex }: ChildrenDataMod) {
    function reducer(state: ChapterData[], action: { type: string, value: any, index: number }) {
        function reorder(): void {
            for (let i = 0; i < state.length; i++) {
                state[i].index.currentIndex = i
            }
        }

        switch (action.type) {
            case 'view':
                state[action.index].view = action.value
                reorder()

                return [
                    ...state
                ]
            case 'update':
                state = action.value

                reorder()

                return [
                    ...state
                ]
            case 'reorder':
                state = state.sort(function (a: ChapterData, b: ChapterData) {
                    return a.index.permanentIndex < b.index.permanentIndex ? -1 : a.index.permanentIndex > b.index.permanentIndex ? 1 : 0;
                })

                reorder()

                return [
                    ...state
                ]
            case 'studentContent':
                return [
                    ...action.value
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
    const [countIndexView, setCountIndexView] = useState<(string | number)[]>([] as (string | number)[])

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { isAdminStudentVision, isAdmin } = useContext(UserContext)
    const { handleWarning } = useContext(GlobalContext)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect((): ReturnType<EffectCallback> => {
        if (!isAdmin || isAdminStudentVision) {
            const studentContent = dashboardReducer.filter((e: ChapterData) => e.view)

            setDashboardReducer({ type: 'studentContent', value: studentContent, index: 0 })
        }
    }, [])

    // Mudar Foco para Input
    useEffect(() => {
        if (!isDisabledInput)
            inputRef.current?.focus()
    }, [isDisabledInput])

    useEffect(() => {
        dashboardReducer.forEach((e: ChapterData) => {
            if (e.index.currentIndex !== e.index.permanentIndex) {
                setIsReorderList(true)
                return
            }
        })

        let arrayCount = []
        let count2: number | string = 1 || ''

        for (let i = 0; i < dashboardReducer.length; i++) {
            if (dashboardReducer[i].view) {
                arrayCount.push(count2)
                count2++
            } else {
                arrayCount.push('')
            }
        }
        setCountIndexView(arrayCount)
    }, [dashboardReducer])

    useEffect(() => {
        const toDbChapter: ChapterDataForDb[] = dashboardReducer.map((data: ChapterData) => {
            return {
                id: data._id,
                att: {
                    view: data.view,
                    index: {
                        permanentIndex: data.index.permanentIndex,
                        currentIndex: data.index.currentIndex
                    }
                }
            }
        });

        (async () => {
            setIsLoading(true)
            await api.put('/chapters', { toDbChapter, serieIndex })
                .then()
                .catch(err => {
                    handleWarning(true, "Sending failed" + err)
                }).finally(() => {
                    setIsLoading(false)
                })
        })()

    }, [dashboardReducer, serieIndex])

    function handleEditTitle() {
        if (aFront.length === 0) {
            handleWarning(true, "Informe ao menos um caractere")

            inputRef.current?.focus()
            return
        }

        if (!isDisabledInput) {
            handleWarning(true, "Novo título Salvo!")
        }

        setIsDisabledInput(!isDisabledInput)
    }

    function handleHide(idx: number): void {
        setDashboardReducer({ type: 'view', value: !dashboardReducer[idx].view, index: idx })
    }

    function handleOnDragEnd(action: DropResult) {
        if (!action.destination)
            return

        const items: ChapterData[] = Array.from(dashboardReducer)

        const [reorderedItem] = items.splice(action.source.index, 1)
        items.splice(action.destination.index, 0, reorderedItem)

        setDashboardReducer({ type: 'update', value: items, index: serieIndex })
    }

    function handleResetOrder() {
        setDashboardReducer({ type: 'reorder', value: null, index: 0 })
        setIsReorderList(false)
    }

    function handleDashboardTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value

        if (value.length < 27) {
            setAFront(value)
        }
    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault()
    }

    return (
        <section className={styles.series}>
            {isLoading && <Loading />}
            <div className={styles.titleSeries}>
                <h3>{`${serieIndex + 1}ª Série`}</h3>

                <button type="button" disabled={!isReorderList} onClick={handleResetOrder}>
                    {!isAdminStudentVision && (
                        <>
                            {isReorderList ? (
                                <img src="/images/reorder-enable.svg" alt="Reordenar" />
                            ) : (
                                <img src="/images/reorder-disabled.svg" alt="Reordenar" />
                            )}
                        </>
                    )}

                    <div className={styles.widget} >
                        <Widget title="Restaurar Padrões" />
                    </div>
                </button>
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

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="dragDashboard">
                        {(provided: DroppableProvided) => (
                            <div className={styles.dropContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                {dashboardReducer.map((chapter: ChapterData, index: number) => {
                                    return (
                                        <Draggable isDragDisabled={isAdminStudentVision} key={chapter.id} draggableId={chapter.id} index={index}>
                                            {(provided: DraggableProvided) => (
                                                <div
                                                    className={`${styles.chapterContainer} ${!chapter.view ? styles.scratched : ''}`}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <span {...provided.dragHandleProps}>
                                                        {!isAdminStudentVision && <img src="/images/move-icon.svg" alt="Mover" />}
                                                    </span>

                                                    <span className={styles.index}>
                                                        <span>{countIndexView[index]}</span>
                                                    </span>

                                                    <span className={styles.titleChapter} title={chapter.content.title}>{chapter.content.title}</span>
                                                    
                                                    <div className={styles.icons}>
                                                        {!isAdminStudentVision && (
                                                            <div onClick={() => handleHide(index)}>
                                                                {!chapter.view ? (
                                                                    <img src="/images/view-disabled.svg" alt="Desabilitado Para Visualizar" />
                                                                ) : (
                                                                    <img src="/images/view-enable.svg" alt="Habilitado Para Visualizar" />
                                                                )}

                                                                <div className={styles.widget} >
                                                                    <Widget title="Ocultar capítulo" />
                                                                </div>
                                                            </div>
                                                        )}

                                                        <Link to={`/chapters/${!isAdminStudentVision ? 'admin' : 'student'}/${chapter.id}`}>
                                                            <img src="/images/open-chapter.svg" alt="Abrir" />
                                                            <div className={styles.widget} >
                                                                <Widget title="Visualizar capítulo" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </section>
    )
}

export { Dashboard }