import * as I from 'io-ts'

export const ProductWithAvailability = I.interface({
	color: I.array(I.string),
	id: I.string,
	name: I.string,
	manufacturer: I.string,
	price: I.number,
	type: I.string,
	availability: I.string,
})

export type ProductWithAvailabilityT = I.TypeOf<typeof ProductWithAvailability>
