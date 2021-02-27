import * as I from 'io-ts'
import { ProductWithAvailability } from './product'

export const Category = I.array(ProductWithAvailability)

export type CategoryWithAvailabilityT = I.TypeOf<typeof Category>
