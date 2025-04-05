import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	useColorModeValue as mode,
	Spinner,
	Alert,
	AlertIcon,
	AlertDescription,
	Wrap,
	AlertTitle,
	Thead,
	Th,
	Tr,
	Table,
	Button,
	Text
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { TbShoppingCartOff } from 'react-icons/tb';
import OrderSummary from '../components/OrderSummary';
import { clearCart } from '../redux/slices/cart';

const CartScreen = () => {
	const { loading, error, cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const getHeadingContent = () => (cartItems.length === 1 ? '(1 Termék)' : `(${cartItems.length} Termék)`);

	const handleClearCart = () => {
		dispatch(clearCart()); 
	};

	return (
		<Wrap spacing='30px' justify='center' minHeight='100vh'>
			{loading ? (
				<Stack direction='row' spacing='4'>
					<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
				</Stack>
			) : error ? (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>We are sorry!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : cartItems.length === 0 ? (
				<Flex
					direction="column"
					align="center"
					justify="center"
					w="full"
					h="60vh"
					bg={mode("gray.50", "gray.800")}
					borderRadius="lg"
					boxShadow="md"
					p="8"
				>
					<Box display='flex' justifyContent='center' alignItems='center' boxSize="150px" mb="6">
						<TbShoppingCartOff fontSize='100' />
					</Box>
					<Heading fontSize="xl" fontWeight="bold" mb="2" >
						A kosarad üres
					</Heading>
					<Text fontSize="md" color={mode("gray.500", "gray.400")} textAlign="center" maxW="sm">
						Nézd meg kínálatunkat, és válogass kedvedre termékeink közül!
					</Text>
					<Button
						as={ReactLink}
						to="/tesztaink"
						mt="6"
						colorScheme="red"
						size="lg"
						px="8"
						fontWeight="bold"
						boxShadow="lg"
						_hover={{ bg: "red.600", transform: "scale(1.00)" }}
						transition="0.2s ease-in-out"
					>
						Termékek böngészése
					</Button>
				</Flex>
			) : (
				<Box px='4' py='8' w={{ base: '95%', md: '70%', lg: '70%' }}>
					<Stack
						direction={{ base: 'column', lg: 'row' }}
						align={{ lg: 'flex-start' }}
						spacing={{ base: '8', md: '16' }}>
						<Stack spacing={{ base: '8', md: '10' }} flex='2'>
							<Heading fontSize='2xl' fontWeight='extrabold'>
								Kosár tartalma {getHeadingContent()}
							</Heading>
							<Table>
								<Thead>
									<Tr>
										<Th textAlign='center' width='300px'>Név</Th>
										<Th>Mennyiség</Th>
										<Th>Összesen</Th>
									</Tr>
								</Thead>
							</Table>

							<Stack spacing='6'>
								{cartItems.map((cartItem) => (
									<CartItem key={cartItem.id} cartItem={cartItem} />
								))}
							</Stack>
							<Button onClick={handleClearCart}  maxW='150px' colorScheme='red'>Kosár ürítése</Button>
						</Stack>
						
						<Flex direction='column' align='center' flex='1'>
							<OrderSummary />

							<HStack mt='6' fontWeight='semibold'>
								<p>vagy</p>
								<Link as={ReactLink} to='/tesztaink' color={mode('red.600', 'cyan.200')}>
									Vásárlás folytatása
								</Link>
							</HStack>
						</Flex>
					</Stack>
				</Box>
			)}
		</Wrap>
	);
};

export default CartScreen;
