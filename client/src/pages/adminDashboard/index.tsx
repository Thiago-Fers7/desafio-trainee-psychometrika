import { Header } from '../../components/Header'

import styles from './styles.module.scss'

function AdminDashboard() {
    return (
        <div className={styles.container}>
            <Header />
        </div>
    )
}

export { AdminDashboard }