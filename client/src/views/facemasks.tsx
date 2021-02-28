import React from 'react'
import { useQuery } from 'react-query'
import { LSpinner } from '../components/lSpinner'
import { getCategory } from '../api/category'
import { ItemList } from '../components/itemList'

export const FaceMasks = () => {
	const { data } = useQuery('facemasks', () => getCategory('facemasks'))

	if (!data?.categoryWithAvailabilities) {
		return <LSpinner />
	}
	return <ItemList category={'facemasks'} data={data.categoryWithAvailabilities} />
}
