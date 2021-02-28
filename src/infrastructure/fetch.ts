import { CustomError } from 'ts-custom-error'
import { ApplicationError } from './error'
import { v4 as uuidv4 } from 'uuid'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { config } from './config'
import { Response } from 'node-fetch'

export class FetchError extends CustomError implements ApplicationError {
	status = 500
	code = uuidv4()
	log = true
}

export const teFetch = <T>(
	f: (baseUrl: string) => Promise<Response>
): TE.TaskEither<FetchError, O.Option<T>> =>
	TE.tryCatch(
		async () => {
			const baseUrl = config.apiBase as string
			try {
				const res = await f(baseUrl)
				const json = await res.json()
				return json.response ? O.fromNullable(json.response) : O.fromNullable(json)
			} catch (e) {
				throw new FetchError(e.message)
			}
		},
		() => new FetchError('fetch error')
	)
