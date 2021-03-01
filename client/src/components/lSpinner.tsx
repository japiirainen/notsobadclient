import React from 'react'
import { Flex, Spinner, useBreakpointValue } from '@chakra-ui/react'
import { Nav } from './Nav'

export const LSpinner = () => {
	const mt = useBreakpointValue({ base: 150, md: 100 })
	return (
		<Flex justify={'center'}>
			<Nav />
			<Spinner mt={mt} size={'lg'} />
		</Flex>
	)
}
