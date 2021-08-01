import mongoose from "mongoose"

const url = 'mongodb://localhost:27017/desafio-trainee-psycho'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("Database connected!")
})

export { mongoose }