import styles from './styles.module.scss'

type Props = { message: string }

function Warning({ message }: Props) {
    return (
        <div className={styles.container}>
            <p>{message}</p>
        </div>
    )
}

export { Warning }