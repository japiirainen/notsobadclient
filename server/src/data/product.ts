import * as I from 'io-ts'

export const Product = I.interface({
	color: I.array(I.string),
	id: I.string,
	name: I.string,
	manufacturer: I.string,
	price: I.number,
	type: I.string,
})
export const ProductWithAvailability = I.interface({
	color: I.array(I.string),
	id: I.string,
	name: I.string,
	manufacturer: I.string,
	price: I.number,
	type: I.string,
	availability: I.string,
})

export type ProductT = I.TypeOf<typeof Product>
export type ProductWithAvailabilityT = I.TypeOf<typeof ProductWithAvailability>
