import * as I from 'io-ts'

export const AvailabilityItemRaw = I.interface({
	id: I.string,
	DATAPAYLOAD: I.string,
})
export const AvailabilityItem = I.interface({
	id: I.string,
	availability: I.string,
})

export type AvailabilityItem = I.TypeOf<typeof AvailabilityItem>
export type AvailabilityItemRawT = I.TypeOf<typeof AvailabilityItemRaw>
