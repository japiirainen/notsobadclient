import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import type { ViewProps } from './beanies'

export const Home: React.FC<ViewProps> = ({ data }) => {
	if (!data) {
		return (
			<Flex mt={150}>
				<Heading>no data unfortunately...</Heading>
			</Flex>
		)
	}
	return (
		<Flex mt={150}>
			<Heading fontFamily={'main'}>Welcome to notsobadclient</Heading>
		</Flex>
	)
}
