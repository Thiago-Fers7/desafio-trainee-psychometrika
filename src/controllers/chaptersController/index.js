import { series } from '../../models/chaptersModel'

const chapterController = {
    async allChapters(req, res) {
        try {
            const allSeries = await Promise.all(series.map(async (colletion) => {
                const allChaptersInOrder = await colletion.find()

                allChaptersInOrder.sort(function (a, b) {
                    return a.index.permanentIndex < b.index.permanentIndex ? -1 : a.index.permanentIndex > b.index.permanentIndex ? 1 : 0;
                })

                return { allChaptersInOrder }
            }))

            res.status(200).json(allSeries)

        } catch (err) {
            res.status(404).json({
                error: err
            })
        }
    },

    async attChapters(req, res) {
        const { data, serieIndex } = req.body

        const myBd = series[serieIndex]


        try {
            const result = await Promise.all(data.map(async (newValue, idx) => {
                const { id, att } = newValue
                const res = await myBd.findByIdAndUpdate(id, att)
                return res
            }))

            if (result)
                res.status(200).json({ res: "OK" })
        } catch (err) {
            res.status(404)
        }

    }
}

export { chapterController }