import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import type { CATEGORY } from '../api/category'
import type { CategoryWithAvailabilityT } from '../data/category'
import {
	Flex,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useBreakpointValue,
	useBreakpoint,
} from '@chakra-ui/react'
import '../app.css'

interface ItemListProps {
	data: CategoryWithAvailabilityT
	category: CATEGORY
}

export const ItemList: React.FC<ItemListProps> = ({ category, data }) => {
	const mt = useBreakpointValue({ base: 150, md: 100 })
	const tableWidth = useBreakpointValue({ base: '100%', md: 800 })
	const tableHeight = useBreakpointValue({ base: 600, md: 600 })
	const bp = useBreakpoint()
	const [pagination, setPagination] = useState<{
		data: CategoryWithAvailabilityT
		offset: number
		numberPerPage: number
		pageCount: number
		currentData: undefined | CategoryWithAvailabilityT
	}>({
		data,
		offset: 0,
		numberPerPage: 10,
		pageCount: 0,
		currentData: undefined,
	})
	useEffect(() => {
		setPagination(prevState => ({
			...prevState,
			pageCount: prevState.data.length / prevState.numberPerPage,
			currentData: prevState.data.slice(
				pagination.offset,
				pagination.offset + pagination.numberPerPage
			),
		}))
	}, [pagination.numberPerPage, pagination.offset])

	const handlePageClick = (event: any) =>
		setPagination({ ...pagination, offset: event.selected * pagination.numberPerPage })

	if (!data) {
		return (
			<Flex mt={mt} alignItems={'center'} justify={'center'}>
				<Heading fontFamily={'main'}>no data...</Heading>
			</Flex>
		)
	}
	return (
		<Flex mt={mt} flexDir={'column'} justify={'center'}>
			<Heading fontFamily={'main'} textAlign={'center'}>
				{category.toUpperCase()}
			</Heading>
			<Table
				h={tableHeight}
				w={tableWidth}
				fontFamily={'main'}
				mt={15}
				size={'sm'}
				variant="simple"
			>
				<Thead>
					<Tr>
						<TableHead />
					</Tr>
				</Thead>
				<Tbody>
					{pagination.currentData &&
						pagination.currentData.map((p, i) => {
							if (bp !== 'sm') {
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
							}
							return (
								<Tr key={i}>
									<Td>{p.name}</Td>
									<Td>{p.type}</Td>
									<Td>{p.availability}</Td>
								</Tr>
							)
						})}
				</Tbody>
			</Table>
			<ReactPaginate
				previousLabel={'previous'}
				nextLabel={'next'}
				breakLabel={'...'}
				pageCount={pagination.pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={'pagination'}
				activeClassName={'active'}
			/>
		</Flex>
	)
}

const TableHead = () => {
	const bp = useBreakpoint()
	if (bp !== 'sm') {
		return (
			<>
				<th>name</th>
				<th>id</th>
				<th>color</th>
				<th>manufacturer</th>
				<th>price</th>
				<th>type</th>
				<th>availability</th>
			</>
		)
	}
	return (
		<>
			<th>name</th>
			<th>type</th>
			<th>availability</th>
		</>
	)
}
