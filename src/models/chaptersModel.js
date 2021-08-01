import pkg from 'mongoose';
const { model, Schema } = pkg;

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

const chapters = model('chapters', ChapterSchema)

export { chapters }