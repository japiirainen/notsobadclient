import { config } from './infrastructure/config'
import { createApp } from './app'
import { logger } from './infrastructure/logger'
import { handleCache } from './infrastructure/cache'

createApp().then(app =>
	app.listen(config.application.port, () => {
		handleCache()
		setInterval(() => {
			logger.info(`time: ${new Date()} -> running cache update...`)
			handleCache()
			logger.info(`time: ${new Date()} -> done with cache update...`)
			// ? 5 minutes
		}, 300000)
		logger.info(`${config.application.name} is listening on ${config.application.port}`)
	})
)
