import * as I from 'io-ts'

export const Product = I.interface({
	color: I.array(I.string),
	id: I.string,
	name: I.string,
	manufacturer: I.string,
	price: I.number,
	type: I.string,
})

export type ProductT = I.TypeOf<typeof Product>
