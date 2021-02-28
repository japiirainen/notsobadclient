import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'
import { router } from './features/router'
import { cache } from './infrastructure/cache'

export const createApp = async (): Promise<Express> => {
	const app = express()
	const v1Routes = express.Router()
	v1Routes
		.get('/test', (req, res) => res.json({ cache }))
		.get('/test2', (req, res) => res.json({ avs: cache.availabilities }))
		.get('/category/:category', router.productCategory)
	// ? Auth

	app.use(morgan('dev'))
		.use(
			cors({
				credentials: true,
				origin: 'http://localhost:8081',
			})
		)
		.use(express.json())
		.use('/api', v1Routes)

	return app
}
