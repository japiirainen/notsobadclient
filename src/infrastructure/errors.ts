import { CustomError } from 'ts-custom-error'
import { ApplicationError } from './error'

export class NoProductsError extends CustomError implements ApplicationError {
	status = 400
	code = 'NoProductsError'
	log = true
}

export class CategoryDecodeError extends CustomError implements ApplicationError {
	status = 400
	code = 'CategoryDecodeError'
	log = true
}
export class NoAvailabilitiesRawError extends CustomError implements ApplicationError {
	status = 400
	code = 'NoAvailabilitiesRawError'
	log = true
}

export class AvailabilityRawDecodeError extends CustomError implements ApplicationError {
	status = 400
	code = 'AvailabilityRawDecodeError'
	log = true
}
export class CategoryParamDecodeError extends CustomError implements ApplicationError {
	status = 400
	code = 'CategoryParamDecodeError'
	log = true
}
