import React from 'react'
import { useQuery } from 'react-query'
import { getCategory } from '../api/category'
import { LSpinner } from '../components/lSpinner'
import { ItemList } from '../components/itemList'
import { Flex, Heading, Text } from '@chakra-ui/react'

export const Gloves: React.FC<{}> = () => {
	const { data, isLoading } = useQuery('facemasks', () => getCategory('gloves'))
	if (isLoading) {
		return <LSpinner />
	}
	if (!data.categoryWithAvailabilities) {
		return (
			<Flex mt={150}>
				<Heading>No data just yet.</Heading>
				<Text>please try again later</Text>
			</Flex>
		)
	}
	return <ItemList category={'gloves'} data={data.categoryWithAvailabilities} />
}
