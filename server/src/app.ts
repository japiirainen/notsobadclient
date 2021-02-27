import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'
import { router } from './features/router'

export const createApp = async (): Promise<Express> => {
	const app = express()
	const v1Routes = express.Router()
	v1Routes
		.get('/test', router.test)
		.get('/test2', router.test2)
		.get('/test3', router.test3)
		.get('/category/:category', router.productCategory)
	// ? Auth

	app.use(morgan('dev'))
		.use(
			cors({
				credentials: true,
				origin: 'http://localhost:4000',
			})
		)
		.use(express.json())
		.use('/api', v1Routes)

	return app
}
