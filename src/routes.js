import { Router } from 'express'
import { userController } from './controllers/userController'
import { chapterController } from './controllers/chaptersController'

const routes = Router()

routes.post('/login', userController.authentication)

routes.get('/chapters', chapterController.allChapters)

export { routes }