import React from 'react'
import { useQuery } from 'react-query'
import { getCategory } from '../api/category'
import { ItemList } from '../components/itemList'
import { LSpinner } from '../components/lSpinner'

export const Beanies = () => {
	const { data } = useQuery('beanies', () => getCategory('beanies'))

	if (!data?.categoryWithAvailabilities) {
		return <LSpinner />
	}
	return <ItemList category={'beanies'} data={data.categoryWithAvailabilities} />
}
