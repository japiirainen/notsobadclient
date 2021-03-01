import { CustomError } from 'ts-custom-error'
import { ApplicationError } from './error'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { config } from './config'
import { Response } from 'node-fetch'
import fetch from 'node-fetch'

export class MaxRetriesError extends CustomError implements ApplicationError {
	status = 500
	code = 'MaxRetriesError'
	log = true
}

export const teFetch = <T>(
	f: (baseUrl: string) => Promise<T>
): TE.TaskEither<MaxRetriesError, O.Option<T>> =>
	TE.tryCatch(
		async () => {
			const baseUrl = config.apiBase as string
			const json = await f(baseUrl)
			return O.fromNullable(json)
		},
		() => new MaxRetriesError()
	)

export const retryFetch = async (url: string, maxRetries: number): Promise<Response> => {
	if (maxRetries === 0) {
		throw new MaxRetriesError()
	}
	try {
		const res = await fetch(url)
		const json = await res.json()
		const data = json.response ? json.response : json
		if (!data || data.length === 0) {
			return retryFetch(url, maxRetries - 1)
		}
		return data
	} catch (e) {
		return retryFetch(url, maxRetries - 1)
	}
}
