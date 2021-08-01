import { series } from '../../models/chaptersModel'

const chapterController = {
    async allChapters(req, res) {
        try {
            const allSeries = await Promise.all(series.map(async (colletion, index) => {
                const allChaptersInOrder = await colletion.find().sort({ index: 1 })

                return { allChaptersInOrder }
            }))

            res.status(200).json(allSeries)

        } catch (err) {
            res.status(404).json({
                error: err
            })
        }

    }
}

export { chapterController }