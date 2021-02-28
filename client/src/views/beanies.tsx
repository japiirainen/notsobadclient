import React from 'react'
import { useQuery } from 'react-query'
import { getCategory } from '../api/category'
import { LSpinner } from '../components/lSpinner'
import { ItemList } from '../components/itemList'
import { Flex, Heading, Text } from '@chakra-ui/react'

export const Beanies: React.FC<{}> = () => {
	const { data, isLoading } = useQuery('beanies', () => getCategory('beanies'))
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
	return <ItemList category={'beanies'} data={data.categoryWithAvailabilities} />
}
