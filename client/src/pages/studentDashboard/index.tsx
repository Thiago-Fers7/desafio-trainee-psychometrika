import { useEffect } from "react"
import { Header } from "../../components/Header"

function StudentDashboard() {
    
    useEffect(() => {
        document.title = "Desafio Treinee | Estudante"
    }, [])

    return (
        <Header />
    )
}

export { StudentDashboard }