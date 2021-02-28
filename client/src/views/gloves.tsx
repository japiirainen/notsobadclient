import React from 'react'
import { useQuery } from 'react-query'
import { getCategory } from '../api/category'
import { ItemList } from '../components/itemList'
import { LSpinner } from 'src/components/lSpinner'

export const Gloves = () => {
	const { data } = useQuery('gloves', () => getCategory('gloves'))

	if (!data?.categoryWithAvailabilities) {
		return <LSpinner />
	}
	return <ItemList category={'gloves'} data={data.categoryWithAvailabilities} />
}
