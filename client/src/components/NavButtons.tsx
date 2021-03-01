import { Box, Link } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import '../app.css'

export const Navbuttons = () => {
	return (
		<Box mt={5}>
			<NavLink to={'/beanies'} activeClassName={'activenavbutton'}>
				<Link mx={1} my={0}>
					Beanies
				</Link>
			</NavLink>
			<NavLink to={'/facemasks'} activeClassName={'activenavbutton'}>
				<Link mx={4} my={0}>
					Face masks
				</Link>
			</NavLink>
			<NavLink to={'/gloves'} activeClassName={'activenavbutton'}>
				<Link mx={1} mr={3}>
					Gloves
				</Link>
			</NavLink>
		</Box>
	)
}
