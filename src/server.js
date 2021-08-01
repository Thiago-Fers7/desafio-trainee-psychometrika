import express from 'express'
import { routes } from './routes'
import { createAdmin, createStudent } from './models/createCollections'
import { mongoose } from './models/database'

import cors from 'cors'

const port = 3333

mongoose

createStudent()
createAdmin()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`)
})