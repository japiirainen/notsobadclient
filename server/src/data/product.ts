import * as I from 'io-ts'

export const Product = I.interface({
	colors: I.array(I.string),
	id: I.string,
	manufacturer: I.string,
	price: I.number,
	type: I.string,
})

export type ProductT = I.TypeOf<typeof Product>
