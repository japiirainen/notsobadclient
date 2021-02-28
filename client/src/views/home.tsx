import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

export const Home: React.FC<{}> = () => {
	return (
		<Flex mt={150}>
			<Heading fontFamily={'main'}>Welcome to notsobadclient</Heading>
		</Flex>
	)
}
