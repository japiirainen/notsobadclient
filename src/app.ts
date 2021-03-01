import cors from 'cors'
import express, { Express } from 'express'
import morgan from 'morgan'
import { router } from './features/router'
import path from 'path'
import { cache } from './infrastructure/cache'

export const createApp = async (): Promise<Express> => {
	const app = express()
	const apiRoutes = express.Router()
	apiRoutes.get('/category/:category', router.productCategory)

	app.use(morgan('dev'))
		.use(
			cors({
				credentials: true,
				origin: 'https://not-so-bad.herokuapp.com',
			})
		)
		.use(express.json())
		.use('/api', apiRoutes)
		.get('/test', (req, res) => res.json({ cache }))
		// ? serve react app
		// ? let the react app to handle any unknown routes
		// ? serve up the index.html if express does'nt recognize the route
		.use(express.static('clientbuild'))
		.get('*', (_, res) => {
			res.sendFile(path.resolve('clientbuild', 'index.html'))
		})

	return app
}
