import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { AvailabilityRawT } from '../data/availability'
import { CategoryT } from '../data/category'
import { CATEGORY } from '../features/repo'
import { availabilitiesForProducts, getAllProductsFromCategory } from '../features/service'
import { CustomError } from 'ts-custom-error'
import { ApplicationError } from './error'
import { logger } from './logger'

/* eslint-disable prefer-const */
export let cache = {
	categories: {
		beanies: {},
		facemasks: {},
		gloves: {},
	},
	availabilities: {},
}

const categoryCacheHandler = (category: CATEGORY): Promise<CategoryT | void> =>
	getAllProductsFromCategory(category)().then(r =>
		pipe(
			r,
			E.fold(
				() => {
					logger.error('max retries exceeded for categories')
					return
				},
				res => Promise.resolve(res)
			)
		)
	)

const availabilitiesForProductsCacheHandler = (
	beanies: CategoryT,
	facemasks: CategoryT,
	gloves: CategoryT
): Promise<AvailabilityRawT | void> =>
	availabilitiesForProducts(beanies, facemasks, gloves)().then(r =>
		pipe(
			r,
			E.fold(
				() => {
					logger.error('max retries exceeded for availabilities')
					return
				},
				res => Promise.resolve(res)
			)
		)
	)

export const handleCache = async (): Promise<void> => {
	const [beanies, facemasks, gloves] = await Promise.all([
		categoryCacheHandler('beanies'),
		categoryCacheHandler('facemasks'),
		categoryCacheHandler('gloves'),
	])
	if (!beanies || !facemasks || !gloves) {
		return
	}
	cache.categories = { beanies, facemasks, gloves }
	const availabilities = await availabilitiesForProductsCacheHandler(beanies, gloves, facemasks)
	if (!availabilities) {
		return
	}
	cache.availabilities = availabilities
}

export class CacheLookupError extends CustomError implements ApplicationError {
	status = 500
	code = 'CacheLookupError'
	log = true
}

export type CacheKey = 'beanies' | 'facemasks' | 'gloves' | 'availabilities'

export const cacheLookup = (i: CacheKey): TE.TaskEither<CacheLookupError, any> => {
	if (i === 'beanies' || i === 'facemasks' || i === 'gloves') {
		if (Object.entries(cache.categories[i]).length !== 0) {
			return TE.of(cache.categories[i])
		}
		return TE.left(new CacheLookupError())
	}
	if (Object.entries(cache.availabilities).length !== 0) {
		return TE.of(cache.availabilities)
	}
	return TE.left(new CacheLookupError())
}
