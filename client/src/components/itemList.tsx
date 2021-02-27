import React from 'react'
import {
	Box,
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
import type { CategoryWithAvailabilityT } from 'src/data/category'

interface ItemListProps {
	data: CategoryWithAvailabilityT
	category: CATEGORY
}

export const ItemList: React.FC<ItemListProps> = ({ category, data }) => {
	if (!data) {
		return <Heading mt={150}>no data...</Heading>
	}
	const lessData = data.slice(0, 100)
	return (
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
					{lessData.map((p, i) => {
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
	)
}
