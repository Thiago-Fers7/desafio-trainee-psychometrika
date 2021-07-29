import React from 'react'
import { useState } from 'react'
import styles from './styles.module.scss'

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useStyles } from './iconsStyle'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

function Login() {
    const viewStyles = useStyles()
    const [viewPass, setViewPass] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [isEmail, isSetEmail] = useState<boolean>(true)

    const [password, setPassword] = useState<string>('')
    const [isPassword, isSetPassword] = useState<boolean>(true)

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

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (!(isEmail && isPassword)) {
            console.log(email, password)
        }
    }

    const backgroundStyle = {
        background: `url("/images/login-background.svg") no-repeat center`,
        backgroundSize: `cover`
    }

    return (
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
        </div>
    )
}

export { Login }