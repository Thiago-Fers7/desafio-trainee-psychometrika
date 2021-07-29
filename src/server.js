import express from 'express'
import { routes } from './routes'
import { createStudent } from './models/createUsersCollection/createStudent'
import { createAdmin } from './models/createUsersCollection/createAdmin'
import cors from 'cors'

const port = 3333

createStudent()
createAdmin()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`)
})