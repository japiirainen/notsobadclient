import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
	path: path.join(__dirname, '..', '..', '.env'),
})

export const config = {
	application: {
		port: process.env.PORT,
		name: process.env.NAME,
	},
	apiBase: process.env.API_BASE,
}
