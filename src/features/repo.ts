import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { FetchError } from '../infrastructure/fetch'
import { teFetch } from '../infrastructure/fetch'
import fetch from 'node-fetch'

export type CATEGORY = 'beanies' | 'facemasks' | 'gloves'

export const getCategory: (
	category: CATEGORY
) => TE.TaskEither<FetchError, O.Option<unknown>> = c =>
	teFetch(baseUrl => fetch(`${baseUrl}/products/${c}`))

export const getAvailabilities: (
	manufacturer: string
) => TE.TaskEither<FetchError, O.Option<unknown>> = m =>
	teFetch(baseUrl => fetch(`${baseUrl}/availability/${m}`))
