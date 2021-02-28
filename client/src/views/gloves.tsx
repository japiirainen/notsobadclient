import React from 'react'
import { useQuery } from 'react-query'
import { getCategory } from '../api/category'
import { ItemList } from '../components/itemList'
import { Flex, Heading, Text } from '@chakra-ui/react'

export const Gloves = () => {
	const { data } = useQuery('facemasks', () => getCategory('gloves'))

	if (!data?.categoryWithAvailabilities) {
		return (
			<Flex mt={150}>
				<Heading>No gloves just yet.</Heading>
				<Text>please try again later</Text>
			</Flex>
		)
	}
	return <ItemList category={'gloves'} data={data.categoryWithAvailabilities} />
}
