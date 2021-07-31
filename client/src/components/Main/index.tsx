import { Dashboard } from "../Dashboard"

import styles from './styles.module.scss'

function Main() {
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