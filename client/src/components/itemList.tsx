import React, { useEffect, useState } from 'react'
import {
	Flex,
	Heading,
	Table,
	TableCaption,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import type { CATEGORY } from 'src/api/category'
import InfiniteScroll from 'react-infinite-scroll-component'
import type { CategoryWithAvailabilityT } from 'src/data/category'
import { LSpinner } from './lSpinner'

interface ItemListProps {
	data: CategoryWithAvailabilityT
	category: CATEGORY
}

export const ItemList: React.FC<ItemListProps> = ({ category, data }) => {
	const [count, setCount] = useState({
		prev: 0,
		next: 20,
	})
	const [hasMore, setHasMore] = useState(true)
	const [current, setCurrent] = useState(data.slice(count.prev, count.next))
	const getMoreData = () => {
		if (current.length === data.length) {
			setHasMore(false)
			return
		}
		setTimeout(() => {
			setCurrent(current.concat(data.slice(count.prev + 10, count.next + 10)))
		}, 500)
		setCount(prevState => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
	}

	if (!data) {
		return (
			<Flex mt={150} alignItems={'center'} justify={'center'}>
				<Heading>no data...</Heading>
			</Flex>
		)
	}
	return (
		<InfiniteScroll
			dataLength={current.length}
			next={getMoreData}
			hasMore={hasMore}
			loader={<LSpinner />}
		>
			<Flex mt={150} flexDir={'column'} justify={'center'}>
				<Heading textAlign={'center'}>{category}</Heading>
				<Table variant="simple">
					<TableCaption>{category}</TableCaption>
					<Thead>
						<Tr>
							<Th>name</Th>
							<Th>id</Th>
							<Th>color</Th>
							<Th>manufacturer</Th>
							<Th>price</Th>
							<Th>type</Th>
							<Th>availability</Th>
						</Tr>
					</Thead>
					<Tbody>
						{current &&
							current.map((p, i) => {
								return (
									<Tr key={i}>
										<Td>{p.name}</Td>
										<Td>{p.id}</Td>
										<Td>
											{p.color.map(color => (
												<p>{color}</p>
											))}
										</Td>
										<Td>{p.manufacturer}</Td>
										<Td>{p.price}</Td>
										<Td>{p.type}</Td>
										<Td>{p.availability}</Td>
									</Tr>
								)
							})}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>To convert</Th>
							<Th>into</Th>
							<Th isNumeric>multiply by</Th>
							<Th>To convert</Th>
							<Th>into</Th>
							<Th isNumeric>multiply by</Th>
							<Th isNumeric>multiply by</Th>
						</Tr>
					</Tfoot>
				</Table>
			</Flex>
		</InfiniteScroll>
	)
}
