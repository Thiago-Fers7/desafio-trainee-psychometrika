import { useEffect } from "react"
import { Header } from "../../components/Header"
import { Main } from "../../components/Main"

function StudentDashboard() {

    useEffect(() => {
        document.title = "Desafio Treinee | Estudante"
    }, [])

    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}

export { StudentDashboard }