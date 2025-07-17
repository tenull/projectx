
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../redux/actions/productActions';
import { Box,Flex,useBreakpointValue, Breadcrumb, BreadcrumbItem, Container, Text, Wrap, WrapItem, Center, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { IoIosCheckmark } from "react-icons/io";
import { Link as ReactLink } from "react-router-dom";
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getUserFavorites } from '../redux/actions/userActions';
import { setFavoritesUpdateFlag } from '../redux/slices/user';
const ProductsScreen = () => {
	const blobSvgHeight = useBreakpointValue({ base: "200px", md: "400px" });
	const dispatch = useDispatch();
	const { category } = useParams();
	const navigate = useNavigate();
	const { pageNumber = 1, keyword = '' } = useParams();
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState();
	const { loading, error, products, favoritesToggled } = useSelector((state) => state.product);
	const { userInfo } = useSelector((state) => state.user);
	const { cartItems } = useSelector((state) => state.cart);
	const { favoritesFlag, } = useSelector((state) => state.user);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category.name);
		navigate(`/tesztaink/${category.filter.packingOf}-${category.filter.type}`);
	};

	useEffect(() => {
		dispatch(getProducts(pageNumber, keyword));

	}, [dispatch, pageNumber, keyword]);



	const categoryButtons = [
		{ name: "4 Tojásos körettészta", filter: { packingOf: 4, type: "körettészta" } },
		{ name: "4 Tojásos levestészta", filter: { packingOf: 4, type: "levestészta" } },
		// { name: "8 Tojásos körettészta", filter: { packingOf: 8, type: "körettészta" } },
		{ name: "8 Tojásos levestészta", filter: { packingOf: 8, type: "levestészta" } }
	];

	useEffect(() => {
		if (category) {
			const [packingOf, type] = category.split('-');
			const filtered = products.filter(
				(product) => product.packingOf === Number(packingOf) && product.type === type
			);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	}, [category, products]);

	const filteredByType = filteredProducts.filter(item => {
		if (!selectedType) return true;
		console.log(item.packing)
		return item.packing === selectedType.toLowerCase();

	});


	useEffect(() => {
		if (favoritesFlag) {
			dispatch(getUserFavorites());
			dispatch(setFavoritesUpdateFlag(false));
		}
	}, [favoritesFlag, dispatch]);


	return (
		<>
			{products.length >= 1 && (
				<Box mx='auto' maxW="8xl" p={{ base: '0', lg: '12' }} minH="6xl">
					  <Flex
                borderRadius={{base:'0',md:'10px'}}
                direction="row"
                align="center"
                justify="space-between"
                bg="#EDEDEE"
                px={{ base: 4, md: 16 }}
                py={{ base: 6, md: 0 }}
                height="auto"
                position="relative"
                overflow="hidden"
            >
                {/* Szöveg szekció */}
                <Box
                    flex="1"
                    pr={{ base: 4, md: 12 }}
                    zIndex={1}
                    textAlign="left"
                >
                    <Text
                        fontFamily="'Playfair Display', serif"
                        fontSize={{ base: "2xl", md: "5xl" }}
                        ps={5}
                        lineHeight="1.2"
                        fontWeight="bold"
                        color="gray.800"
                        maxW="100%"
                    >
                        Tésztáink
                    </Text>
                </Box>

                {/* Kép szekció */}
                <Box
                    flexShrink={2}
                    width={{ base: "200px", sm: "150px", md: "390px" }}
                    height={{ base: "100px", sm: "100px", md: "300px" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        svg: {
                          height: blobSvgHeight, // csak az SVG-re érvényes
                          width: "auto",   // opcionális: megtartja az arányokat
                          display: "block",
                        }
                      }}
                >
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <clipPath id="blobClip">
                                <path
                                    transform="translate(100 100)"
                                    d="M34.3,-50.7C47.5,-45,63.3,-40.5,73,-30.1C82.7,-19.8,86.3,-3.4,82.4,10.7C78.6,24.8,67.4,36.8,57.1,50.4C46.7,64.1,37.3,79.6,24,84.9C10.8,90.2,-6.4,85.2,-18.9,76.2C-31.4,67.2,-39.3,54,-48.9,42.6C-58.4,31.1,-69.7,21.4,-72,9.9C-74.3,-1.6,-67.7,-14.7,-60.8,-26.8C-53.8,-38.9,-46.5,-49.9,-36.3,-57.1C-26.1,-64.2,-13.1,-67.5,-1.2,-65.6C10.6,-63.7,21.2,-56.5,34.3,-50.7Z"
                                />
                            </clipPath>
                        </defs>
                        <image
                            href="/images/rolunk/LTGy-42.jpg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#blobClip)"
                        />
                    </svg>
                </Box>

                {/* Háttér blob */}
                <Box
                    position="absolute"
                    zIndex={0}
                    top={{base:'0',md:'-30px'}}
                    left="0"
                    width={{ base: "150px", md: "350px" }}
                    height={{ base: "150px", md: "350px" }}
                >
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <path
                            transform="translate(100 100)"
                            fill="#e63e3e"
                            d="M35,-57C48.4,-53,64.3,-49.7,74.9,-40.3C85.4,-30.9,90.6,-15.4,90.7,0.1C90.8,15.6,85.8,31.1,75.3,40.4C64.7,49.7,48.4,52.8,35,60.9C21.5,69,10.7,82.1,-1.7,85.1C-14.2,88.1,-28.3,80.9,-39.5,71.4C-50.6,61.9,-58.7,50.2,-66.7,38C-74.8,25.7,-82.9,12.8,-85.5,-1.5C-88.1,-15.9,-85.3,-31.7,-76.7,-43.2C-68.2,-54.6,-53.9,-61.7,-40.2,-65.5C-26.5,-69.3,-13.2,-70,-1.2,-67.9C10.8,-65.8,21.7,-61,35,-57Z"
                        />
                    </svg>
                </Box>
            </Flex>
					<Breadcrumb ms={2} mt={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
						<BreadcrumbItem>
							<ReactLink to='/'>Főoldal</ReactLink>
						</BreadcrumbItem>

						<BreadcrumbItem>
							<ReactLink to='/tesztaink'>Tésztáink</ReactLink>
						</BreadcrumbItem>

					</Breadcrumb>
					<Container maxW='container.xl' px={0} display='flex' spacing="30px" justify="between" minHeight="80vh" >

						<Box position='sticky' height='500px' top='150px' minW="260px" rounded="md" maxW="5%" display={{ base: "none", md: "block" }}>
							<Text fontFamily="Poppins" mb={2} color="black" fontWeight="bold" fontSize="4xl">
								KATEGÓRIA
							</Text>
							{categoryButtons.map((category, index) => (
								<Button
									key={category.name}
									onClick={() => handleCategorySelect(category)}
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

						</Box>

						<Container maxW={{ base: 'container.md', md: 'container.lg', lg: 'container.lg' }} mx={0} display='flex' flexDirection='column' alignItems='center'>
							<Box minW="260px" rounded="md" maxW="5%" display={{ base: "block", md: "none" }}>
								
								<Text fontFamily="Poppins" mb={2} color="black" fontWeight="bold" fontSize="4xl">
									KATEGÓRIA
								</Text>
								{categoryButtons.map((category, index) => (
									<Button
										key={category.name}
										onClick={() => handleCategorySelect(category)}
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

							</Box>
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
									Lédig
									{selectedType === "gyujto" && <IoIosCheckmark style={{ position: 'absolute', right: '1px' }} fontSize='30px' />}
								</Button>

							</Box>
							<Wrap mt={5} spacing={{ base: '20px', md: '30px' }} justify='center' minHeight='80vh' >
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
											<Text mt={10} textAlign='center' fontSize='xl'>A lédig csomagolása 10 kg-os polietilén zsákban történik.</Text>}
									</Box>
								) : (
									filteredByType.map((product) => (
										<WrapItem key={product._id}>
											<Center >
												<ProductCard key={product._id} product={product} loading={loading} cartItems={cartItems} />
											</Center>
										</WrapItem>
									))
								)}
							</Wrap>
						</Container>

					</Container>

				</Box >
			)}
		</>
	);
};

export default ProductsScreen;
