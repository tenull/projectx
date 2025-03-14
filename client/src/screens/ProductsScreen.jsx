
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../redux/actions/productActions';
import { Box,Breadcrumb,BreadcrumbItem, Container, Text, Wrap, WrapItem, Center, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import ProductCard from '../components/ProductCard';
import { IoIosCheckmark } from "react-icons/io";
import { Link as ReactLink } from "react-router-dom";
import { ChevronRightIcon } from '@chakra-ui/icons';

const ProductsScreen = () => {
	const dispatch = useDispatch();


	const { pageNumber = 1, keyword = '' } = useParams();
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState();
	const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	useEffect(() => {
		dispatch(getProducts(pageNumber, favoritesToggled, keyword));
	}, [dispatch, pageNumber, keyword, favoritesToggled]);

	const paginationButtonClick = (page) => {
		dispatch(getProducts(page, favoritesToggled, keyword));
	};

	const categoryButtons = [
		{ name: "4 Tojásos körettészta", filter: { packingOf: 4, type: "körettészta" } },
		{ name: "4 Tojásos levestészta", filter: { packingOf: 4, type: "levestészta" } },
		{ name: "8 Tojásos körettészta", filter: { packingOf: 8, type: "körettészta" } },
		{ name: "8 Tojásos levestészta", filter: { packingOf: 8, type: "levestészta" } }
	];

	useEffect(() => {
		if (selectedCategory) {
			const filtered = products.filter(
				(product) =>
					product.packingOf === categoryButtons.find((c) => c.name === selectedCategory)?.filter.packingOf &&
					product.type === categoryButtons.find((c) => c.name === selectedCategory)?.filter.type
			);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	}, [selectedCategory, products]);



	const filteredByType = filteredProducts.filter(item => {
		if (!selectedType) return true;
		return item.packing === selectedType.toLowerCase();
	});


	return (
		<>
			{products.length >= 1 && (
				<Box maxW="8xl" mx="auto" p={{ base: '0', lg: '12' }} minH="6xl">
					<Center
						height={{ base: '200px', md: '300px' }}
						backgroundColor="red.600"
						color="white"
						position="relative"
						backgroundPosition="bottom"
						backgroundRepeat="no-repeat"
						backgroundSize="cover"
						fontSize={{ base: '2xl', md: '4xl' }}
						fontWeight="bold"
						textAlign="center"
					>
						Tésztáink
					</Center>
					<Breadcrumb mt={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
                <BreadcrumbItem>
                    <ReactLink to='/'>Főoldal</ReactLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <ReactLink to='/tesztaink'>Tésztáink</ReactLink>
                </BreadcrumbItem>

            </Breadcrumb>
					<Container maxW='container.xl' display='flex' spacing="30px" justify="between" minHeight="80vh" >

						<Wrap minW="260px" rounded="md" maxW="5%" display={{ base: "none", md: "block" }}>
							<Text fontFamily="Poppins" mb={2} color="black" fontWeight="bold" fontSize="4xl">
								KATEGÓRIA
							</Text>
							{categoryButtons.map((category, index) => (
								<Button
									key={category.name}
									onClick={() => setSelectedCategory(category.name)}
									minW="100%"
									borderTop={index === 0 ? "none" : "2px"}
									borderColor="red.600"
									borderRadius="0"
									fontSize="md"
									fontFamily="Poppins"
									fontWeight="500"
									position="relative"
									bg={selectedCategory === category.name ? "red.600" : "transparent"}
									color={selectedCategory === category.name ? "white" : "black"}
									_hover={{ bg: "red.600", color: "white" }}
									display="flex"
									justifyContent="space-between"
								>
									{category.name}
									{selectedCategory === category.name && <IoIosCheckmark style={{ position: 'absolute', right: '1px' }} fontSize='30px' />}
								</Button>
							))}

						</Wrap>

						<Container maxW={{base:'container.md',md:'container.lg',lg:'container.lg'}} mx={0}>

							<Box display='flex' justifyContent='center' gap={0}>
								<Button
									bg={selectedType === "lakossagi" ? 'red.600' : 'transparent'}
									color={selectedType === "lakossagi" ? 'white' : 'black'}
									rounded='0'
									mt={5}
									border='2px solid'
									borderColor={selectedType === "lakossagi" ? 'red.600' : 'red.600'}
									width={{ base: '140px', md: '180px' }}
									height={{ base: '40px', md: '50px' }}
									fontSize={{ base: 'md', md: 'lg' }}
									boxSizing="border-box"
									onClick={() => setSelectedType(selectedType === "lakossagi" ? null : "lakossagi")}
									_hover={{
										bg: 'red.600',
										color: 'white',
										border: '2px solid',
										borderColor: 'red.600'
									}}
								>
									Lakossági
									{selectedType === "lakossagi" && <IoIosCheckmark style={{ position: 'absolute', right: '1px' }} fontSize='30px' />}
								</Button>

								<Button
									bg={selectedType === "gyujto" ? 'red.600' : 'transparent'}
									color={selectedType === "gyujto" ? 'white' : 'black'}
									rounded='0'
									mt={5}
									border='2px solid'
									borderColor={selectedType === "gyujto" ? 'red.600' : 'red.600'}
									width={{ base: '140px', md: '180px' }}
									height={{ base: '40px', md: '50px' }}
									fontSize={{ base: 'md', md: 'lg' }}
									boxSizing="border-box"
									onClick={() => setSelectedType(selectedType === "gyujto" ? null : "gyujto")}
									_hover={{
										bg: 'red.600',
										color: 'white',
										border: '2px solid',
										borderColor: 'red.600'
									}}
								>
									Gyűjtő
									{selectedType === "gyujto" && <IoIosCheckmark style={{ position: 'absolute', right: '1px' }} fontSize='30px' />}
								</Button>

							</Box>
							<Box spacing='30px' gap={10} display='flex' justifyContent='center' flexWrap='wrap'>
								{error ? (
									<Alert status="error">
										<AlertIcon />
										<AlertTitle>We are sorry!</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								) : selectedCategory && filteredByType.length === 0 ? (
									<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
										<Text mt={10} fontSize="lg" fontWeight="bold" textAlign="center" color="red.500">
											Nincs elérhető termék ebben a kategóriában.
										</Text>

										{selectedType === 'gyujto' &&
											<Text mt={10} textAlign='center' fontSize='xl'>A gyűjtő csomagolása 10 kg-os polietilén zsákban történik.</Text>}
									</Box>
								) : (
									filteredByType.map((product) => (
										<WrapItem key={product._id}>
											<Center w="250px" h="450px">
												<ProductCard key={product._id} product={product} loading={loading} cartItems={cartItems} />
											</Center>
										</WrapItem>
									))
								)}
							</Box>
						</Container>

					</Container>
					{!favoritesToggled && (
						<Wrap spacing="10px" justify="center" p="5">
							<Button border="1px solid red" color='red' onClick={() => paginationButtonClick(1)}>
								<ArrowLeftIcon />
							</Button>
							{Array.from(Array(pagination.totalPages), (e, i) => {
								return (
									<Button
										color={pagination.currentPage === i + 1 ? 'red' : 'gray'}
										border={pagination.currentPage === i + 1 ? '1px solid red' : '1px solid white'}
										key={i}
										onClick={() => paginationButtonClick(i + 1)}>
										{i + 1}
									</Button>
								);
							})}
							<Button border="1px solid red" color='red' onClick={() => paginationButtonClick(pagination.totalPages)}>
								<ArrowRightIcon />
							</Button>
						</Wrap>
					)}
				</Box >
			)}
		</>
	);
};

export default ProductsScreen;
