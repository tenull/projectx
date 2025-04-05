import {
	Stack,
	Spinner,
	Alert,
	AlertIcon,
	AlertDescription,
	Th,
	Tbody,
	Tr,
	Thead,
	Button,
	ListItem,
	UnorderedList,
	Table,
	Td,
	AlertTitle,
	Wrap,
	Text,
	Container
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

const YourOrdersScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, orders, userInfo } = useSelector((state) => state.user);
	const location = useLocation();

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserOrders());
		}
	}, [dispatch, userInfo]);

	return userInfo ? (
		<>
			{loading ? (
				<Wrap direction='column' align='center' mt='20px' justify='center' minHeight='100vh'>
					<Stack direction='row' spacing='4'>
						<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
					</Stack>
				</Wrap>
			) : error ? (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>We are sorry!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				orders && (
					<Container py={10} maxW='container.xl'>
						<Text my={5} fontSize='lg' fontWeight='bold' textAlign='center'>
							Rendelési történet
						</Text>
						<Table variant='striped'>
							<Thead>
								<Tr>
	
									<Th>rendelés dátuma</Th>
									<Th>teljes összeg</Th>
									<Th>Termékek</Th>
									<Th>Szállítás</Th>
									
								</Tr>
							</Thead>
							<Tbody>
								{orders.map((order) => (
									<Tr key={order._id}>
	
										<Td>{new Date(order.createdAt).toDateString()}</Td>
										<Td>{order.totalPrice} Ft</Td>
										<Td>
											{order.orderItems.map((item) => (
												<UnorderedList key={item._id}>
													<ListItem>
														{item.qty} x {item.name} ({item.price} Ft/db)
													</ListItem>
												</UnorderedList>
											))}
										</Td>
										<Td>{order.isDelivered ?'Kiszállítva' :'Folyamatban van'}</Td>
										<Td>
											<Button as={Link} to={`/rendelesitortenet/${order._id}`} variant='outline'>Részletek</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Container>
				)
			)}
		</>
	) : (
		<Navigate to='/bejelentkezes' replace={true} state={{ from: location }} />
	);
};

export default YourOrdersScreen;
