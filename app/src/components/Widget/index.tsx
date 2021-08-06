import styles from './styles.module.scss'

type Props = { title: string }

function Widget({ title }: Props) {
    return (
        <div className={styles.widget}>
            <p>{title}</p>
        </div>
    )
}

export { Widget }
