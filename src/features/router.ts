import { Request, Response } from 'express'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { processError } from '../infrastructure/error'
import { getProductsWithAvailability } from './service'

export const router = {
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
