import * as I from 'io-ts'

export const Category = I.interface({})

export type CategoryT = I.TypeOf<typeof Category>
