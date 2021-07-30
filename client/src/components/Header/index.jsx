import styles from './styles.module.scss'

function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    <img src="/images/logo.svg" alt="Logo Psychometrika" />
                    <p className={styles.descript}>Desafio Trainee</p>
                </div>
                <div className={`${styles.menuContainer} ${styles.activeMenu}`}>
                    <div className={styles.iconMenu}>
                        <span>A</span>
                        <img src="/images/down.svg" alt="" />
                    </div>

                    {/* Menu MODAL */}
                    <nav className={styles.menu}>
                        <form>
                            <fieldset>
                                <legend>Você está atualmente com</legend>

                                <label>
                                    <input
                                        type="radio"
                                        name="states"
                                        id="admin"
                                    />
                                    <span>Acesso do Admin</span>
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="states"
                                        id="student"
                                    />
                                    <span>Acesso do Aluno</span>
                                </label>

                                <button type="submit">Alterar</button>
                            </fieldset>
                        </form>

                        <button type="button">
                            Sair
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export { Header }