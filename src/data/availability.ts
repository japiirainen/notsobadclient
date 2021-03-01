import * as I from 'io-ts'
import { AvailabilityItemRaw } from './availabilityItem'

export const AvailabilityRaw = I.array(AvailabilityItemRaw)

export type AvailabilityRawT = I.TypeOf<typeof AvailabilityRaw>
