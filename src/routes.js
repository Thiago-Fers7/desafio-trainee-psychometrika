import { Router } from 'express'
import { userController } from './controllers/userController'

const routes = Router()

routes.get('/', userController.getUsers)

export { routes }