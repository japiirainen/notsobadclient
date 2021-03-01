import * as I from 'io-ts'

export const AvailabilityItemRaw = I.interface({
	id: I.string,
	DATAPAYLOAD: I.string,
})
export type AvailabilityItemRawT = I.TypeOf<typeof AvailabilityItemRaw>
