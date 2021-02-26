import * as I from 'io-ts'
import { Product } from './product'

export const Category = I.array(Product)

export type CategoryT = I.TypeOf<typeof Category>
