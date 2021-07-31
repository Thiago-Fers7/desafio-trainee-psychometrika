import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import styles from './styles.module.scss'

interface ChildrenDataMod {
    title: string
}

function Dashboard({ title }: ChildrenDataMod) {
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

    const { isAdmin } = useContext(UserContext)


    function handleDashboardTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value

        setDashboardTitle(value)
    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault()
    }

    return (
        <section className={styles.series}>
            <div className={styles.titleSeries}>
                <h3>{title}</h3>

                <span>
                    {isAdmin && (
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
                        style={{
                            width: `${1.2 * dashboardTitle.length}rem`
                        }}
                        type="text"
                        value={dashboardTitle}
                        disabled={isDisabledInput}
                        onChange={handleDashboardTitle}
                    />

                    <button type="submit">
                        <img src="/images/edit-icon.svg" alt="Editar Título" />
                    </button>
                </form>

                {fakeArrayChapters.map((chapter: string, index: number) => {
                    return (
                        <div className={styles.chapterContainer} key={index}>
                            <span>
                                {isAdmin && <img src="/images/move-icon.svg" alt="Mover" />}
                            </span>

                            <span className={styles.index}>
                                <span>{index + 1}</span>
                            </span>

                            <span className={styles.titleChapter}>{chapter}</span>

                            <div className={styles.icons}>
                                <span>
                                    {isAdmin && (
                                        <>
                                            {isVisibleChapter ? (
                                                <img src="/images/view-disabled.svg" alt="Desabilitado Para Visualizar" />
                                            ) : (
                                                <img src="/images/view-enable.svg" alt="Habilitado Para Visualizar" />
                                            )}
                                        </>
                                    )}
                                </span>
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