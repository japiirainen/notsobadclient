import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { Nav } from './Nav'

export const LSpinner: React.FC<{}> = () => {
	return (
		<Flex justify={'center'}>
			<Nav />
			<Spinner mt={100} size={'lg'} />
		</Flex>
	)
}
