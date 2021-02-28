import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { getCategory } from '../api/category'
import { ItemList } from '../components/itemList'

export const FaceMasks = () => {
	const { data } = useQuery('facemasks', () => getCategory('facemasks'))

	if (!data?.categoryWithAvailabilities) {
		return (
			<Flex mt={150}>
				<Heading>No data just yet.</Heading>
				<Text>please try again later</Text>
			</Flex>
		)
	}
	return <ItemList category={'facemasks'} data={data.categoryWithAvailabilities} />
}
