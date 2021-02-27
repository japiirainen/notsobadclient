import { chakra, Flex, Heading, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Switch, Route } from 'react-router-dom'
import { getCategory } from './api/category'
import { Beanies } from './views/beanies'
import { FaceMasks } from './views/facemasks'
import { Gloves } from './views/gloves'
import { Nav } from './components/Nav'

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
	if (!data.categoryWithAvailabilities) {
		return (
			<Flex justify={'center'}>
				<Nav />
				<chakra.pre mt={100}>{JSON.stringify(data, null, 2)}</chakra.pre>
			</Flex>
		)
	}
	return (
		<Flex className="App">
			<Nav />
			<Switch>
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
