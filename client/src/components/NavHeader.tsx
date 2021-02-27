import { Heading, Icon, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'

export const NavHeader: React.FC = () => {
	const navheaderColor = useColorModeValue('black', 'neonPurple.100')
	return (
		<Link to={'/'}>
			<a>
				<Heading
					mt={3}
					mx={3}
					fontSize={{ base: '1.8rem', md: '2rem' }}
					fontFamily={'navHeader'}
					color={navheaderColor}
				>
					Products
				</Heading>
			</a>
		</Link>
	)
}
