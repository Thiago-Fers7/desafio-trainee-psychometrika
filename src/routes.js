import { Router } from 'express'
import { userController } from './controllers/userController'

const routes = Router()

routes.post('/login', userController.authentication)

export { routes }