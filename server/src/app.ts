import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'

export const createApp = async (): Promise<Express> => {
	const app = express()
	const v1Routes = express.Router()
	v1Routes
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
