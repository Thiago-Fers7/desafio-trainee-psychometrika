import { AxiosResponse } from 'axios'
import React, { DragEventHandler, useRef, useState } from 'react'
import { useEffect, useReducer, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { api } from '../../services/api'

import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd'

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

interface ChapterDataForDb {
    id: string,
    att: {
        view: boolean,
        index: {
            permanentIndex: number,
            currentIndex: number | null
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

        function reorder(isView: boolean[]) {
            let count: number = 0

            for (let i = 0; i < state.length; i++) {
                if (isView[i]) {
                    state[i].index.currentIndex = count
                    count++
                }
            }
        }

        switch (action.type) {
            case 'view':
                state[action.index].view = action.value
                state[action.index].index.currentIndex = action.index

                let updateCurrentIndex: boolean[] = []

                state.forEach((e: ChapterData) => {
                    updateCurrentIndex.push(e.view)
                })

                reorder(updateCurrentIndex)

                return [
                    ...state
                ]
            case 'update':
                state = action.value

                const updateIndex: boolean[] = []

                state.forEach((e: ChapterData) => {
                    updateIndex.push(true)
                })

                const newState = reorder(updateIndex)

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

    const [isSending, setIsSending] = useState<boolean>(false)

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

            await api.put('/chapters', { toDbChapter, serieIndex })
                .then((res: AxiosResponse) => {
                    console.log(res.data.res)
                })
                .catch(err => {
                    console.error("Sending failed" + err)
                }).finally(() => {
                    setIsSending(false)
                })
        })()

    }, [dashboardReducer, serieIndex])

    function handleOnDragEnd(action: DropResult) {
        if (!action.destination)
            return

        const items = Array.from(dashboardReducer)
        const [reorderedItem] = items.splice(action.source.index, 1)
        items.splice(action.destination.index, 0, reorderedItem)

        setDashboardReducer({ type: 'update', value: items, index: serieIndex })
    }

    function handleHide(idx: number): void {
        setDashboardReducer({ type: 'view', value: !dashboardReducer[idx].view, index: idx })
    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault()
    }

    return (
        <section className={styles.series}>
            <div className={styles.titleSeries}>
                <h3>{`${serieIndex + 1}ª Série`}</h3>

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

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="dragDashboard">
                        {(provided: DroppableProvided) => (
                            <div className={styles.dropContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                {dashboardReducer.map((chapter: ChapterData, index: number) => {
                                    return (
                                        <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                            {(provided: DraggableProvided) => (
                                                <div
                                                    className={`${styles.chapterContainer} ${!chapter.view ? styles.scratched : ''}`}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <span>
                                                        {!isAdminStudentVision && <img src="/images/move-icon.svg" alt="Mover" />}
                                                    </span>
                                                    <span className={styles.index}>
                                                        <span>{chapter.view ? chapter.index.currentIndex + 1 : ''}</span>
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