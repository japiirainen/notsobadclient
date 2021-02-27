import * as I from 'io-ts'
import { Product, ProductWithAvailability } from './product'

export const Category = I.array(Product)
export const CategoryWithAvailability = I.array(ProductWithAvailability)

export type CategoryWithAvailabilityT = I.TypeOf<typeof CategoryWithAvailability>
export type CategoryT = I.TypeOf<typeof Category>
