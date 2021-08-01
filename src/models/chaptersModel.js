import pkg from 'mongoose';
const { model, Schema } = pkg;

import { seriesAmount } from '../models/createCollections'

const ChapterSchema = new Schema({
    id: String,
    index: Number,
    view: Boolean,
    content: {
        title: String,
        text: String
    }
}, {
    timestamps: true
})

const series = []

for (let i = 0; i < seriesAmount; i++) {
    series.push(model(`serie_${i + 1}`, ChapterSchema))
}

export { series }