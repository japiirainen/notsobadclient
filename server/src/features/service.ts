/* eslint-disable no-mixed-spaces-and-tabs */
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as S from 'fp-ts/Set'
import * as A from 'fp-ts/Array'
import { CustomError } from 'ts-custom-error'
import { Category, CategoryT, CategoryWithAvailabilityT } from '../data/category'
import { ApplicationError } from '../infrastructure/error'
import { getCategory, CATEGORY, getAvailabilities } from './repo'
import { AvailabilityRaw, AvailabilityRawT } from '../data/availability'
import { Eq } from 'fp-ts/lib/Eq'
import { AvailabilityItemRawT } from '../data/availabilityItem'

class NoProductsError extends CustomError implements ApplicationError {
	status = 400
	code = 'NoProductsError'
	log = true
}

class CategoryDecodeError extends CustomError implements ApplicationError {
	status = 400
	code = 'CategoryDecodeError'
	log = true
}
class NoAvailabilitiesRawError extends CustomError implements ApplicationError {
	status = 400
	code = 'NoAvailabilitiesRawError'
	log = true
}

class AvailabilityRawDecodeError extends CustomError implements ApplicationError {
	status = 400
	code = 'AvailabilityRawDecodeError'
	log = true
}

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
	products: CategoryT
): TE.TaskEither<NoAvailabilitiesRawError | AvailabilityRawDecodeError, AvailabilityRawT> => {
	const noDubs = [...productstToManSet(products)]
	const tasks = noDubs.map(getAvailabilitiesFromMan)
	return pipe(
		A.array.sequence(TE.taskEither)(tasks),
		TE.map(avs => avs.flat())
	)
}

export const getProductsWithAvailability = (category: CATEGORY) =>
	pipe(
		TE.bindTo('ps')(getAllProductsFromCategory(category)),
		TE.bind('as', ({ ps }) => availabilitiesForProducts(ps)),
		TE.bind('categoryWithAvailabilities', ({ as, ps }) => {
			const asMap = availaBilitiesToMap(as)
			const psWithAvailability: CategoryWithAvailabilityT = ps.map(p => {
				const avFowP = asMap.get(p.id)
				return avFowP ? { ...p, availability: avFowP } : { ...p, availability: 'not found' }
			})
			return TE.of(psWithAvailability)
		}),
		TE.map(({ ps, as, categoryWithAvailabilities }) => ({ ps, as, categoryWithAvailabilities }))
	)

const availaBilitiesToMap = (as: AvailabilityRawT): Map<string, string> => {
	const asMap = new Map()
	as.forEach(a => asMap.set(a.id, a.DATAPAYLOAD))
	return asMap
}
