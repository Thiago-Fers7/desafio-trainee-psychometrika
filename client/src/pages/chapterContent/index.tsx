import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ChaptersContext } from "../../contexts/ChaptersContext"
import { UserContext } from "../../contexts/UserContext"

function ChapterContent() {
    const { allChapters } = useContext(ChaptersContext)
    const { isAdmin } = useContext(UserContext)

    const { series, index } = useParams<{ series: string, index: string }>()

    return (
        <h1>{isAdmin ? (
            JSON.stringify(allChapters[Number(series)].allChaptersInOrder[Number(index)])
        ) : (
            JSON.stringify(allChapters[Number(series)])
        )}</h1>
    )
}

export { ChapterContent }