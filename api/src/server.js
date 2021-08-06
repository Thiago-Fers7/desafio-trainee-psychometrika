import express from 'express'
import { routes } from './routes'
import { createAdmin, createStudent, createChapters } from './models/createCollections'
import { mongoose } from './models/database'

import cors from 'cors'

const port = 3333

// Conectar ao banco
mongoose

createStudent()
createAdmin()
createChapters()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`)
})