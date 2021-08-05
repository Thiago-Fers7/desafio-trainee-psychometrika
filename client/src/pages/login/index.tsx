import React, { EffectCallback, useContext, useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api'
import { AxiosResponse } from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { Loading } from '../../components/Loading'

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useStyles } from './iconsStyle'

import styles from './styles.module.scss'
import { Warning } from '../../components/Warning';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

interface ServerResponseLoginData {
    authentication?: string,
    pass?: boolean,
    error?: string,
    message?: string
}

function Login() {
    const viewStyles = useStyles()
    const [viewPass, setViewPass] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [isEmail, isSetEmail] = useState<boolean>(true)

    const [password, setPassword] = useState<string>('')
    const [isPassword, isSetPassword] = useState<boolean>(true)

    let timer: ReturnType<typeof setTimeout>

    const {
        handleAuthentication,
        handleStudentVision,
        isWarning,
        messageWarning,
        handleWarning
    } = useContext(UserContext)

    const history = useHistory()

    useEffect((): ReturnType<EffectCallback> => {
        document.title = "Desafio Treinee | Login"

        return () => {
            handleWarning(false, '')
            clearTimeout(timer)
        }
    }, [])

    function toggleViewPass() {
        setViewPass(!viewPass)
    }

    function handleEmail(event: ChangeEvent) {
        const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

        const inputValue = event.target.value

        setEmail(inputValue)

        const isValidValue = regexEmail.test(inputValue)

        if (isValidValue) {
            isSetEmail(false)
        } else {
            isSetEmail(true)
        }
    }

    function handlePassword(event: ChangeEvent) {
        const inputValue = event.target.value

        setPassword(inputValue)

        if (inputValue.length >= 8) {
            isSetPassword(false)
        } else {
            isSetPassword(true)
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        try {
            if (!isEmail && !isPassword) {
                setIsLoading(true)

                await api.post('/login', {
                    email,
                    password
                })
                    .then((res: AxiosResponse) => {
                        const data: ServerResponseLoginData = res.data

                        handleAuthentication(String(data.authentication))

                        if (data.error) {
                            throw data.error
                        }

                        if (data.authentication === 'admin') {
                            handleStudentVision(false)
                            history.push('/dashboard/admin')
                        } else if (data.authentication === 'student') {
                            handleStudentVision(true)
                            history.push('/dashboard/student')
                        }
                    })
                    .catch(err => {
                        handleWarning(true, err)

                        timer = setTimeout(() => {
                            handleWarning(false, '')
                        }, 5000)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            } else {
                throw 'Preencha todos os campos antes de prosseguir'
            }
        } catch (err) {
            if (typeof err === 'string') {
                handleWarning(true, err)
                
                timer = setTimeout(() => {
                    handleWarning(false, '')
                }, 5000)
            }
        }
    }

    const backgroundStyle = {
        background: `url("/images/login-background.svg") no-repeat center`,
        backgroundSize: `cover`
    }

    return (
        <>
            {isWarning && <Warning message={messageWarning} />}
            <div className={styles.container} style={backgroundStyle}>
                <section>
                    <h2 className="sr-only">
                        Psychometrika
                    </h2>
                    <img src="/images/logo.svg" alt="Logo Psychometrika" />
                    <p className={styles.descript}>Desafio Trainee</p>
                    <form onSubmit={handleSubmit} >
                        <fieldset>
                            <legend className="sr-only">
                                Informe os dados de login
                            </legend>
                            <div className={styles.inputFields}>
                                <label>
                                    <span>Email</span>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Seu email institucional"
                                        autoComplete="off"
                                        onChange={handleEmail}
                                        value={email}
                                    />
                                    <span className={styles.inputError}>{(isEmail && email !== '') && "Email inválido!"}</span>
                                </label>
                                <label>
                                    <span>Senha</span>
                                    <input
                                        type={viewPass ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Mínimo de 8 caracteres"
                                        autoComplete="off"
                                        onChange={handlePassword}
                                        value={password}
                                    />
                                    {viewPass ? (
                                        <VisibilityIcon onClick={toggleViewPass} className={viewStyles.root} />
                                    ) : (
                                        <VisibilityOffIcon onClick={toggleViewPass} className={viewStyles.root} />
                                    )}
                                    <span className={styles.inputError}>{(isPassword && password !== '') && "Senha inválida!"}</span>
                                </label>
                            </div>
                            <button
                                type="submit"
                            >
                                Entrar
                            </button>
                        </fieldset>
                    </form>
                </section>
                {/* Loading */}
                {isLoading && (
                    <Loading />
                )}
            </div>
        </>
    )
}

export { Login }