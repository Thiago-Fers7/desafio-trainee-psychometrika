import React from 'react'
import { useState } from 'react'
import styles from './styles.module.scss'

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useStyles } from './iconsStyle'

function Login() {
    const viewStyles = useStyles()

    const [viewPass, setViewPass] = useState<boolean>(false)

    function toggleViewPass() {
        setViewPass(!viewPass)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
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
                                />
                            </label>
                            <label>
                                <span>Senha</span>
                                <input
                                    type={viewPass ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Mínimo de 8 caracteres"
                                />
                                {viewPass ? (
                                    <VisibilityIcon onClick={toggleViewPass} className={viewStyles.root} />
                                ) : (
                                    <VisibilityOffIcon onClick={toggleViewPass} className={viewStyles.root} />
                                )}
                            </label>
                        </div>
                        <button
                            type="button"
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