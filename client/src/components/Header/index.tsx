import React, { EffectCallback, useContext, useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import styles from './styles.module.scss'
import { GlobalContext } from '../../contexts/GlobalContext'

function Header() {
    const [isMenu, setIsMenu] = useState<boolean>(false)
    const [isAdminCheck, setIsAdminCheck] = useState<boolean>(false)
    const [isStudentCheck, setIsStudentCheck] = useState<boolean>(false)

    const { authenticationData, handleStudentVision } = useContext(UserContext)
    const { handleWarning } = useContext(GlobalContext)

    const history = useHistory()
    const location = useLocation()

    const admin: string = 'admin'
    const student: string = 'student'

    useEffect((): ReturnType<EffectCallback> => {
        const path: number = location.pathname.indexOf('admin')

        if (!authenticationData) {
            verifyCheck('Not authentication')
        }

        if (path !== -1) {
            verifyCheck(admin)
        } else {
            verifyCheck(student)
        }

        return () => {
            handleWarning(false, '')
        }
    }, [location.pathname])

    function handleCheck(event: React.ChangeEvent<HTMLInputElement>): void {
        const valueInput: string = event.target.value
        verifyCheck(valueInput)
    }

    function verifyCheck(auth: string): void {
        switch (auth) {
            case admin:
                setIsAdminCheck(true)
                setIsStudentCheck(false)
                break
            case student:
                setIsAdminCheck(false)
                setIsStudentCheck(true)
                break
            default:
                handleWarning(true, "Faça login para continuar usando normalmente!")
                break
        }
    }

    function menuToggle(): void {
        setIsMenu(!isMenu)
    }

    function handleLogout(): void {
        history.push('/login')
    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault()

        if (isAdminCheck) {
            handleStudentVision(false)

            history.push('/dashboard/admin')
        } else if (isStudentCheck) {
            handleStudentVision(true)

            history.push('/dashboard/student')
        }
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    <img src="/images/logo.svg" alt="Logo Psychometrika" />
                    <p className={styles.descript}>Desafio Trainee</p>
                </div>
                <div className={`${styles.menuContainer} ${isMenu ? styles.activeMenu : ""}`}>
                    <div className={styles.iconMenu} onClick={menuToggle}>
                        <span>A</span>
                        <img src="/images/down.svg" alt="Exibir menu" />
                    </div>
                    {/* Menu MODAL */}
                    <nav className={styles.menu}>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Você está atualmente com</legend>
                                {authenticationData === admin && (
                                    <label>
                                        <input
                                            type="radio"
                                            name="states"
                                            id="admin"
                                            value={admin}
                                            checked={isAdminCheck}
                                            onChange={handleCheck}
                                        />
                                        <span>Acesso do Admin</span>
                                    </label>
                                )}
                                <label>
                                    <input
                                        type="radio"
                                        name="states"
                                        id="student"
                                        value={student}
                                        checked={isStudentCheck}
                                        onChange={handleCheck}
                                    />
                                    <span>Acesso do Aluno</span>
                                </label>
                                {authenticationData === admin && (
                                    <button type="submit">Alterar</button>
                                )}
                            </fieldset>
                        </form>
                        <button
                            type="button"
                            onClick={handleLogout}
                        >
                            Sair
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export { Header }