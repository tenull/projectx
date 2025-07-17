import { MinusIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Badge,
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Spinner,
	Stack,
	Text,
	Wrap,
	useToast,
	Tabs,
	Tab,
	TabList,
	TabPanels,
	TabPanel,
	Breadcrumb,
	BreadcrumbItem,
	Container,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Tooltip
} from '@chakra-ui/react';
import { FaEgg } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/productActions';
import { useEffect, useState } from 'react';
import { addCartItem } from '../redux/actions/cartActions';
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineBackpack } from "react-icons/md";
import { TbMapSearch } from "react-icons/tb";
import { Link as ReactLink } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';

const ProductScreen = () => {
	const [amount, setAmount] = useState(1);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, error, product, reviewed } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	const toast = useToast();


	useEffect(() => {
		dispatch(getProduct(id));


		if (reviewed) {
			toast({
				description: 'Product review saved.',
				status: 'success',
				isClosable: 'true',
			});

		}
	}, [dispatch, id, toast, reviewed]);

	const changeAmount = (input) => {
		if (input === 'plus') {
			setAmount(amount + 1);
		}
		if (input === 'minus') {
			setAmount(amount - 1);
		}
	};

	const addItem = () => {
		if (cartItems.some((cartItem) => cartItem.id === id)) {
			cartItems.find((cartItem) => cartItem.id === id);
			dispatch(addCartItem(id, amount));
		} else {
			dispatch(addCartItem(id, amount));
		}
		toast({
			description: 'Tészta hozzá lett adva.',
			status: 'success',
			isClosable: true,
		});
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
			) : (
				product && (
					<Box>
						<Container
							maxW='container.xl'
							mx='auto'
							px={{ base: '4', md: '8', lg: '8' }}
							py={{ base: '6', md: '8', lg: '12' }}>
							<Breadcrumb scrollMarginY={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
								<BreadcrumbItem>
									<ReactLink to='/'>Főoldal</ReactLink>
								</BreadcrumbItem>
								<BreadcrumbItem>
									<ReactLink to={`/tesztaink/${product.packingOf}-${product.type}`}>{product.packingOf} tojásos {product.type}</ReactLink>
								</BreadcrumbItem>

								<BreadcrumbItem>
									<ReactLink to={`/teszta/${product.name}`}>{product.name}</ReactLink>
								</BreadcrumbItem>

							</Breadcrumb>

							<Stack fontFamily='Poppins' direction={{ base: 'column', lg: 'row' }} align='center'>
								<Stack mt={5} pr={{ base: '0', md: 'row' }} flex='1.5' mb={{ base: '12', md: 'none' }}>
									<Heading fontSize='sm' fontWeight='bold'>
										{product.brand}
									</Heading>
									<Heading fontSize='2xl' fontWeight='extrabold'>
										{product.name}
									</Heading>
									<Stack spacing='5'>

										<Text w={{ base: '100%', md: '700px', lg: '800px' }} textAlign='justify'>{product.description}</Text>


										<Box flexBasis='50%' minWidth='300px' maxW='500px' display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center'>
											<Box pb={4} width='100%' borderBottom='2px'>
												<Text fontWeight='bold' >A TERMÉKRŐL</Text>
											</Box>
											<Flex py={3} borderBottom='2px' justify='space-between' alignItems='center' width='100%'>
												<Box display='flex' alignItems='center'>
													<MdOutlineBackpack fontSize='40px' />
													<Text fontSize='xl' ms={3}>Kiszerelés</Text>
												</Box>
												<Text fontSize='xl' fontWeight='bold'>{product.packaking * 1000}g</Text>
											</Flex>
											<Flex py={3} borderBottom='2px' justify='space-between' alignItems='center' width='100%'>
												<Box display='flex' alignItems='center'>
													<IoTimerOutline fontSize='40px' />
													<Text fontSize='xl' ms={3}>Főzési idő</Text>
												</Box>
												<Text fontSize={{ base: 'xl', md: 'xl' }} fontWeight='bold'>{product.cookingTime}</Text>
											</Flex>
											<Flex py={3} borderBottom='2px' justify='space-between' alignItems='center' width='100%'>
												<Box display='flex' alignItems='center'>
													<TbMapSearch fontSize='40px' />
													<Text fontSize={{ base: 'md', md: 'xl' }} ms={3}>Összetevők</Text>
												</Box>
												<Text fontSize={{ base: 'sm', md: 'xl' }} fontWeight='bold'>{product.ingredients}</Text>
											</Flex>
										</Box>
										<Box display='flex' alignItems='center'>
											<Text me={5}>Mennyiség:</Text>

											{product.stock === 0 && (
												<Badge w='80px' fontSize='0.8em' colorScheme='red'>
													elfogyott
												</Badge>
											)}
											{product.stock > 1 && (
												<Badge w='80px' fontSize='0.8em' colorScheme='green'>
													Raktáron
												</Badge>
											)}
										</Box>
										{/* <Box display='flex' alignItems='center' justifyContent='space-between'>
											<Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
												<Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
													<MinusIcon />
												</Button>
												<Text mx='30px'>{amount}</Text>
												<Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
													<SmallAddIcon />
												</Button>

											</Flex>

											<Button
												variant='outline'
												isDisabled={product.stock === 0}
												colorScheme='red'
												w='100%'
												onClick={() => addItem()}>
												Kosárba
											</Button>
										</Box> */}
									</Stack>
								</Stack>
								<Flex position='relative' direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
									<Box
										cursor="zoom-in"
										onClick={onOpen}
										transition="transform 0.2s"
										_hover={{ transform: "scale(1.05)" }}
										maxW="300px" 
									>
										<Image
											filter=' drop-shadow(4px 4px 4px rgba(0, 0, 0, .45));'
											// _hover={{ transform: 'translateY(-5px)', transition: 'transform 0.3s ease-in-out' }}
											mb='30px'
											maxH='400px'
											src={product.image}
											alt={product.name}
											fallbackSrc='https://via.placeholder.com/250'
										/>
									</Box>
									<Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
										<ModalOverlay />
										<ModalContent bg="transparent" boxShadow="none">
											<ModalBody p={0}>
												<Image src={product.image} alt={product.name} borderRadius="md" />
											</ModalBody>
										</ModalContent>
									</Modal>
									{product.productIsNew && (
										<Badge fontSize='lg' color='white' position='absolute' rounded='lg' right={20} top={1} ml='2' bg='red.500'>
											új
										</Badge>
									)}
									<Tooltip label={`${product.packingOf} tojásos`} placement="top" hasArrow>
									<Box
										position="absolute"
										top={5}
										left="50px"
										borderRadius="full"
										display="flex"
										alignItems="center"
										justifyContent="center"
										boxShadow="lg"
									>
										<Box position="absolute" fontSize="6xl" color="yellow.600">
											<FaEgg />
										</Box>
										<Text fontSize="2xl" fontWeight="bold" color="white" zIndex="1">
											{product.packingOf}
										</Text>
									</Box>
									</Tooltip>

								</Flex>
							</Stack>


						</Container>
						<Box my={10} display='flex' justifyContent={{ base: 'center', md: 'flex-start' }}>
							<Tabs>
								<TabList border={0}>
									<Tab
										_selected={{ color: 'red.600' }}

										borderRadius='md'
									>
										TÁPÉRTÉK
									</Tab>
									<Tab
										_selected={{ color: 'red.600' }}

										borderRadius='md'
									>
										ÁLTALÁNOS INFORMÁCIÓ
									</Tab>
								</TabList>

								<TabPanels>
									<TabPanel width="350px">
										<Box color="white" fontWeight="bold" py={3} px={2} display="flex" justifyContent="space-between" bg="red.600">
											<Text>Átlagos Tápérték</Text>
											<Text>100g/adag</Text>
										</Box>

										{product.nutrionalValue.map((value) => (
											<Box key={value._id}>
												<Box display="flex" py={3} px={2} justifyContent="space-between" border="2px" borderColor="red.600">
													<Text>Energiatartalom</Text>
													<Text>{value.energy}</Text>
												</Box>
												<Box display="flex" py={3} px={2} justifyContent="space-between" border="2px" borderTop="0" borderColor="red.600">
													<Text>Zsír</Text>
													<Text>{value.fat}</Text>
												</Box>
												<Box display="flex" py={3} px={2} justifyContent="space-between" border="2px" borderTop="0" borderColor="red.600">
													<Text fontSize="sm"> -amelyből telített zsírsavak</Text>
													<Text>{value.saturedFat}</Text>
												</Box>
												<Box display="flex" py={3} px={2} justifyContent="space-between" border="2px" borderTop="0" borderColor="red.600">
													<Text>Szénhidrát</Text>
													<Text>{value.carbohydrates}</Text>
												</Box>
												<Box display="flex" py={3} px={2} justifyContent="space-between" border="2px" borderTop="0" borderColor="red.600">
													<Text fontSize="sm">-amelyből cukrok</Text>
													<Text>{value.sugar}</Text>
												</Box>
												<Box display="flex" py={3} px={2} justifyContent="space-between" border="2px" borderTop="0" borderColor="red.600">
													<Text>Fehérje</Text>
													<Text>{value.protein}</Text>
												</Box>
												<Box display="flex" py={3} px={2} justifyContent="space-between" border="2px" borderTop="0" borderColor="red.600">
													<Text>Só</Text>
													<Text>{value.salt}</Text>
												</Box>
											</Box>
										))}
									</TabPanel>

									<TabPanel>
										<Text textAlign="justify">
											Ezen alapanyagok felhasználásával készített száraztészták, kifőzés után, a háromszorosukat adják vissza.
											1 kg száraztésztából 3kg főtt tésztát kapunk, amit készételként fogyaszthatunk.
										</Text>
									</TabPanel>
								</TabPanels>
							</Tabs>

						</Box>
					</Box>
				)
			)}
		</Wrap>
	);
};

export default ProductScreen;
