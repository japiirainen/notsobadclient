import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { getCategory } from '../api/category'
import { ItemList } from '../components/itemList'
import { LSpinner } from '../components/lSpinner'

export const FaceMasks: React.FC<{}> = () => {
	const { data, isLoading, refetch } = useQuery('facemasks', () => getCategory('facemasks'))
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
	return <ItemList category={'facemasks'} data={data.categoryWithAvailabilities} />
}
