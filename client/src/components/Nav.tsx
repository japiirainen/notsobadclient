import { Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Navbuttons } from './/NavButtons'
import { NavHeader } from './NavHeader'
import React from 'react'

const NavContent = () => {
	const navItems = useBreakpointValue({
		base: (
			<Flex direction={'column'} w={'100%'}>
				<Flex direction={'row'} justifyContent={'space-between'}>
					<NavHeader />
				</Flex>
				<Flex justify={'center'} mb={2}>
					<Navbuttons />
				</Flex>
			</Flex>
		),
		md: (
			<>
				<NavHeader />
				<Navbuttons />
			</>
		),
	})
	return <>{navItems}</>
}

export const Nav: React.FC = ({ children }) => {
	const borderBColor = 'black'
	return (
		<Flex
			as={'nav'}
			w={'100%'}
			h={'auto'}
			minH={'4rem'}
			rounded={'sm'}
			justifyContent={'space-between'}
			wrap={'wrap'}
			zIndex={200}
			position={'absolute'}
			top={0}
			bg={'white'}
			boxSizing={'content-box'}
			style={{ boxShadow: '0 1px 2px 0 #bababa' }}
			borderBottomColor={borderBColor}
		>
			<NavContent />
			{children}
		</Flex>
	)
}
