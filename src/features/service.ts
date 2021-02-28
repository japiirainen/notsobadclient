import * as A from 'fp-ts/Array'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Eq } from 'fp-ts/lib/Eq'
import * as S from 'fp-ts/Set'
import * as TE from 'fp-ts/TaskEither'
import { AvailabilityRaw, AvailabilityRawT } from '../data/availability'
import { Category, categoryParam, CategoryT, CategoryWithAvailabilityT } from '../data/category'
import {
	AvailabilityRawDecodeError,
	CategoryDecodeError,
	CategoryParamDecodeError,
	NoAvailabilitiesRawError,
	NoProductsError,
} from '../data/errors'
import { ProductT } from '../data/product'
import { CacheKey, CacheLookupError, getFromCache } from '../infrastructure/cache'
import { getAvailabilityR } from '../infrastructure/regex'
import { CATEGORY, getAvailabilities, getCategory } from './repo'

export const getAllProductsFromCategory: (
	category: CATEGORY
) => TE.TaskEither<NoProductsError | CategoryDecodeError, CategoryT> = c =>
	pipe(
		getCategory(c),
		TE.chain(maybeUnknown =>
			pipe(
				maybeUnknown,
				TE.fromOption(() => new NoProductsError())
			)
		),
		TE.chain(unknown =>
			pipe(
				unknown,
				Category.decode,
				E.mapLeft(() => new CategoryDecodeError()),
				TE.fromEither
			)
		)
	)

export const getAvailabilitiesFromMan: (
	manufacturer: string
) => TE.TaskEither<NoAvailabilitiesRawError | AvailabilityRawDecodeError, AvailabilityRawT> = m =>
	pipe(
		getAvailabilities(m),
		TE.chain(maybeUnknown =>
			pipe(
				maybeUnknown,
				TE.fromOption(() => new NoAvailabilitiesRawError())
			)
		),
		TE.chain(unknown =>
			pipe(
				unknown,
				AvailabilityRaw.decode,
				E.mapLeft(() => new AvailabilityRawDecodeError()),
				TE.fromEither
			)
		)
	)

const eqManufacturer: Eq<string> = {
	equals: (x, y) => x === y,
}

export const productstToManSet = (ps: CategoryT): Set<string> =>
	pipe(
		ps,
		A.map(({ manufacturer }) => manufacturer),
		S.fromArray(eqManufacturer)
	)

export const availabilitiesForProducts = (
	beanies: CategoryT,
	gloves: CategoryT,
	faceMasks: CategoryT
): TE.TaskEither<NoAvailabilitiesRawError | AvailabilityRawDecodeError, AvailabilityRawT> => {
	const noDubs = [...productstToManSet([...beanies, ...gloves, ...faceMasks])]
	const tasks = noDubs.map(getAvailabilitiesFromMan)
	return pipe(
		A.array.sequence(TE.taskEither)(tasks),
		// ? propably should be using TE.flatten, fix if you have time
		//@ts-ignore
		TE.map(avs => avs.flat())
	)
}

const decodeCatParam = (maybeCategory: unknown) =>
	pipe(
		maybeCategory,
		categoryParam.decode,
		E.mapLeft(() => new CategoryParamDecodeError()),
		TE.fromEither
	)

export const getProductsWithAvailability = (
	category: unknown
): TE.TaskEither<
	CacheLookupError,
	{
		categoryWithAvailabilities: CategoryWithAvailabilityT
	}
> =>
	pipe(
		TE.bindTo('category')(decodeCatParam(category)),
		TE.bind('ps', ({ category }) => getFromCache(category as CacheKey)),
		TE.bind('as', () => getFromCache('availabilities')),
		TE.bind('categoryWithAvailabilities', ({ as, ps }) => {
			const asMap = availaBilitiesToMap(as)
			const psWithAvailability: CategoryWithAvailabilityT = ps.map((p: ProductT) => {
				const avFowP = asMap.get(p.id)
				return avFowP ? { ...p, availability: avFowP } : { ...p, availability: 'not found' }
			})
			return TE.of(psWithAvailability)
		}),
		TE.map(({ categoryWithAvailabilities }) => ({
			categoryWithAvailabilities: categoryWithAvailabilities as CategoryWithAvailabilityT,
		}))
	)

const availaBilitiesToMap = (as: AvailabilityRawT): Map<string, string> => {
	const asMap = new Map()
	// ? availability ids are CAPS so need to make lowerCase
	// ? get the availability value with a simple regex
	as.forEach(a => asMap.set(a.id.toLowerCase(), getAvailabilityR(a.DATAPAYLOAD)))
	return asMap
}
