
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../redux/actions/productActions';
import { Box, Breadcrumb, BreadcrumbItem, Container, Text, WrapItem, Center, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

import ProductCard from '../components/ProductCard';

import { Link as ReactLink } from "react-router-dom";
import { ChevronRightIcon } from '@chakra-ui/icons';
// import { useNavigate } from 'react-router-dom';
const SearchScreen = () => {

    const dispatch = useDispatch();
    const { category } = useParams();
  
    const { pageNumber = 1, keyword = '' } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedType, ] = useState(null);
    const [selectedCategory, ] = useState();
    const { loading, error, products, favoritesToggled } = useSelector((state) => state.product);
    const { cartItems } = useSelector((state) => state.cart);



    useEffect(() => {
        dispatch(getProducts(pageNumber, favoritesToggled, keyword));
    }, [dispatch, pageNumber, keyword, favoritesToggled]);

    // const paginationButtonClick = (page) => {
    //     dispatch(getProducts(page, favoritesToggled, keyword));
    // };



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



    return (
        <>
            {products.length >= 1 && (
                <Box  maxW="8xl" mx="auto" p={{ base: '0', lg: '12' }} minH="6xl">
                    <Center
                        height={{ base: '200px', md: '300px' }}
                        backgroundColor="red.600"
                        backgroundImage={`linear-gradient(rgb(51, 51, 51, 0.7), #c53030),/images/pastalogo2.jpg`}
                        color="white"
                        position="relative"
                        backgroundPosition="bottom"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        fontSize={{ base: '2xl', md: '4xl' }}
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Keresés : {keyword}
                    </Center>
                    <Breadcrumb mt={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
                        <BreadcrumbItem>
                            <ReactLink to='/'>Főoldal</ReactLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <ReactLink to={`/search/${keyword}`}>Keresés</ReactLink>
                        </BreadcrumbItem>

                    </Breadcrumb>
                    <Container maxW='container.xl' my={10} display='flex' justifyContent='center' spacing="30px" justify="between" minHeight="80vh" >
                        <Container maxW={{ base: 'container.md', md: 'container.lg', lg: 'container.lg' }} mx={0}>


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

                </Box >
            )}
        </>
    );
};

export default SearchScreen;
