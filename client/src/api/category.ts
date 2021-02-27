const { SNOWPACK_PUBLIC_API_URL } = import.meta.env

import { identity } from 'fp-ts/function'

export type CATEGORY = 'beanies' | 'facemasks' | 'gloves'

export const getCategory = (c: CATEGORY) =>
	fetch(`${SNOWPACK_PUBLIC_API_URL}/category/${c}`)
		.then(res => res.json())
		.catch(identity)
