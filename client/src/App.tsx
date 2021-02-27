import { chakra, Flex, Heading, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Switch, Route } from 'react-router-dom'
import { getCategory } from './api/category'
import { Beanies } from './views/beanies'
import { FaceMasks } from './views/facemasks'
import { Gloves } from './views/gloves'
import { Nav } from './components/Nav'
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
		<Flex className="App">
			<Nav />
			<Switch>
				<Route exact={true} path={'/'}>
					<Home data={data.categoryWithAvailabilities} />
				</Route>
				<Route path={'/beanies'}>
					<Beanies data={data.categoryWithAvailabilities} />
				</Route>
				<Route path={'/facemasks'}>
					<FaceMasks data={data.categoryWithAvailabilities} />
				</Route>
				<Route path={'/gloves'}>
					<Gloves data={data.categoryWithAvailabilities} />
				</Route>
			</Switch>
		</Flex>
	)
}

export default App
