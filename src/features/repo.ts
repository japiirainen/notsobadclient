import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { MaxRetriesError } from '../infrastructure/fetch'
import { teFetch, retryFetch } from '../infrastructure/fetch'

export type CATEGORY = 'beanies' | 'facemasks' | 'gloves'

export const getCategory: (
	category: CATEGORY
) => TE.TaskEither<MaxRetriesError, O.Option<unknown>> = c =>
	teFetch(baseUrl => retryFetch(`${baseUrl}/products/${c}`, 20))

export const getAvailabilities: (
	manufacturer: string
) => TE.TaskEither<MaxRetriesError, O.Option<unknown>> = m =>
	teFetch(baseUrl => retryFetch(`${baseUrl}/availability/${m}`, 20))
