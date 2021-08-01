import { chapters } from '../../models/chaptersModel'

const chapterController = {
    async allChapters(req, res) {
        try {
            const allChaptersInOrder = await chapters.find().sort({ index: 1 })

            if (allChapters) {
                res.status(200).json(allChaptersInOrder)
            } else {
                throw "error fetching data"
            }
        } catch (err) {
            res.status(404).json({
                error: err
            })
        }

    }
}

export { chapterController }