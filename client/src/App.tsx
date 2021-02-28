import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { Route, Switch } from 'react-router-dom'
import { getCategory } from './api/category'
import { Nav } from './components/Nav'
import { Beanies } from './views/beanies'
import { FaceMasks } from './views/facemasks'
import { Gloves } from './views/gloves'
import { Home } from './views/home'

const App: React.FC<{}> = () => {
	const { data, isLoading, refetch } = useQuery('beanies', () => getCategory('beanies'))
	if (isLoading) {
		return (
			<Flex justify={'center'}>
				<Nav />
				<Spinner mt={100} size={'lg'} />
			</Flex>
		)
	}
	return (
		<Flex m={0} p={0} justify={'center'}>
			<Nav />
			<Flex className="App" flexDirection={'column'} alignItems={'center'} maxW={1500} w={1500}>
				<Switch>
					<Route exact={true} path={'/'}>
						<Home />
					</Route>
					<Route path={'/beanies'}>
						<Beanies />
					</Route>
					<Route path={'/facemasks'}>
						<FaceMasks />
					</Route>
					<Route path={'/gloves'}>
						<Gloves />
					</Route>
				</Switch>
			</Flex>
		</Flex>
	)
}

export default App
