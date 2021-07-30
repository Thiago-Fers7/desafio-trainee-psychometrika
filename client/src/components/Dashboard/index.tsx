import { useState } from 'react'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

type ChildrenData = { children: ReactNode }

function Dashboard() {
    const [isReorder, setIsReorder] = useState<boolean>(false)

    return (
        <section className={styles.series}>
            <div className={styles.titleSeries}>
                <h3>1º Série</h3>
                <span>
                    {isReorder ? (
                        <img src="/images/reorder-enable.svg" alt="Reordenar" />
                    ) : (
                        <img src="/images/reorder-disabled.svg" alt="Reordenar" />
                    )}
                </span>
            </div>

            <div className={styles.dashbord}></div>
        </section>
    )
}

export { Dashboard }