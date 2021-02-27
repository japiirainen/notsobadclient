import React from 'react'
import type { CategoryWithAvailabilityT } from 'src/data/category'
import { ItemList } from '../components/itemList'

export interface ViewProps {
	data: CategoryWithAvailabilityT
}

export const Beanies: React.FC<ViewProps> = ({ data }) => {
	return <ItemList category={'beanies'} data={data} />
}
