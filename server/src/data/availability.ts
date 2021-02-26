import * as I from 'io-ts'
import { AvailabilityItem, AvailabilityItemRaw } from './availabilityItem'

export const AvailabilityRaw = I.array(AvailabilityItemRaw)
export const Availability = I.array(AvailabilityItem)

export type AvailabilityT = I.TypeOf<typeof AvailabilityRaw>
export type AvailabilityRawT = I.TypeOf<typeof AvailabilityRaw>
