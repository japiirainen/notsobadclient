import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import * as R from 'ramda'
import { pipe } from 'fp-ts/function'
import { AvailabilityRawT } from '../data/availability'
import { CategoryT } from '../data/category'
import { CATEGORY } from '../features/repo'
import { availabilitiesForProducts, getAllProductsFromCategory } from '../features/service'
import { CustomError } from 'ts-custom-error'
import { ApplicationError } from './error'
import { logger } from './logger'
interface CacheI {
	categories: {
		beanies: CategoryT
		facemasks: CategoryT
		gloves: CategoryT
	}
	availabilities: AvailabilityRawT
}
/* eslint-disable prefer-const */
export let cache: CacheI = {
	categories: {
		beanies: [],
		facemasks: [],
		gloves: [],
	},
	availabilities: [],
}

const categoryCacheHandler = (category: CATEGORY): Promise<CategoryT> =>
	getAllProductsFromCategory(category)().then(r =>
		pipe(
			r,
			E.fold(
				() => categoryCacheHandler(category),
				res => Promise.resolve(res)
			)
		)
	)

const availabilitiesForProductsCacheHandler = (
	beanies: CategoryT,
	facemasks: CategoryT,
	gloves: CategoryT
): Promise<AvailabilityRawT> =>
	availabilitiesForProducts(beanies, facemasks, gloves)().then(r =>
		pipe(
			r,
			E.fold(
				() => availabilitiesForProductsCacheHandler(beanies, facemasks, gloves),
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
	cache.categories = { beanies, facemasks, gloves }
	const availabilities = await availabilitiesForProductsCacheHandler(beanies, gloves, facemasks)
	// ? Merges the previous cache with new availabilities. Takes the newer one in case of duplicate data.
	const uniqueArr = R.uniqBy(R.prop('id'), [...availabilities, ...cache.availabilities])
	cache.availabilities = uniqueArr
	logger.info(`time: ${new Date()} -> done with cache update...`)
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
