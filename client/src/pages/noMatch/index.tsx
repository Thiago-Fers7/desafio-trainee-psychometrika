import { useLocation } from "react-router-dom"

function NoMatch() {
    const location = useLocation<Location>()

    return (
        <h3>Pagina não encontrada {location.pathname}</h3>
    )
}

export { NoMatch }