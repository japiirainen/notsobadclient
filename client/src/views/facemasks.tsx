import React from 'react'
import type { CategoryWithAvailabilityT } from 'src/data/category'
import { ItemList } from '../components/itemList'

export interface ViewProps {
	data: CategoryWithAvailabilityT
}

export const FaceMasks: React.FC<ViewProps> = ({ data }) => {
	return <ItemList category={'facemasks'} data={data} />
}
