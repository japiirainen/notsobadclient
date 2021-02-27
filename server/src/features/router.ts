import { Request, Response } from 'express'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { processError } from '../infrastructure/error'
import {
	getAvailabilitiesFromMan,
	getAllProductsFromCategory,
	getProductsWithAvailability,
} from './service'

export const router = {
	test(_: Request, res: Response): void {
		getAllProductsFromCategory('beanies')().then(r =>
			pipe(
				r,
				E.fold(processError(res), products => res.status(200).json({ products }))
			)
		)
	},
	test2(_: Request, res: Response): void {
		getAvailabilitiesFromMan('umpante')().then(r =>
			pipe(
				r,
				E.fold(processError(res), av => res.status(200).json({ av }))
			)
		)
	},
	test3(_: Request, res: Response): void {
		getProductsWithAvailability('beanies')().then(r =>
			pipe(
				r,
				E.fold(processError(res), ({ categoryWithAvailabilities }) =>
					res.status(200).json({ categoryWithAvailabilities })
				)
			)
		)
	},
	productCategory(req: Request, res: Response): void {
		getProductsWithAvailability(req.params.category)().then(r =>
			pipe(
				r,
				E.fold(processError(res), ({ categoryWithAvailabilities }) =>
					res.status(200).json({ categoryWithAvailabilities })
				)
			)
		)
	},
}
