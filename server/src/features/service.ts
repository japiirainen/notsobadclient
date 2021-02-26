import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { CustomError } from 'ts-custom-error'
import { Category, CategoryT } from '../data/category'
import { ApplicationError } from '../infrastructure/error'
import { getCategory, CATEGORY, getAvailabilities } from './repo'
import { AvailabilityRaw, AvailabilityRawT } from '../data/availability'

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

export const getAllAvailabilities: (
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
