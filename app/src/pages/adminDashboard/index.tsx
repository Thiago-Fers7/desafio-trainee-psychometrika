import { useEffect } from 'react'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'

import styles from './styles.module.scss'

function AdminDashboard() {

    useEffect(() => {
        document.title = "Desafio Treinee | Admin"
    }, [])

    return (
        <div className={styles.container}>
            <Header />
            <Main />
        </div>
    )
}

export { AdminDashboard }