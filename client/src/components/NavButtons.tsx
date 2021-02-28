import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'

export const NavButton: React.FC<{
	label: string
	onClick?: any
	mx?: number
	my?: number
	type?: 'submit'
	loading?: boolean
}> = ({ label, onClick, mx, my, type, loading }) => {
	return (
		<Button
			mx={mx}
			my={my}
			style={{ borderRadius: 0 }}
			bg={'gray.100'}
			_hover={{
				background: 'black',
				color: 'white',
			}}
			color={'black'}
			onClick={onClick}
			fontFamily={'main'}
			type={type}
			isLoading={loading}
		>
			{label}
		</Button>
	)
}

export const Navbuttons = () => {
	const router = useHistory()
	return (
		<Box mt={3}>
			<NavButton mx={1} my={0} label={'Beanies'} onClick={() => router.push('/beanies')} />
			<NavButton mx={1} my={0} label={'Face masks'} onClick={() => router.push('/facemasks')} />
			<NavButton mx={1} my={0} label={'Gloves'} onClick={() => router.push('/gloves')} />
		</Box>
	)
}
