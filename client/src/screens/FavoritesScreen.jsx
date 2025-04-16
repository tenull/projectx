import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavorites, } from '../redux/actions/userActions';
import { Wrap, WrapItem, Center, Text, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Spinner, Stack } from "@chakra-ui/react";
import ProductCard from '../components/ProductCard';
import { setFavoritesUpdateFlag } from '../redux/slices/user';
const FavoritesScreen = () => {
    const dispatch = useDispatch();
    const { loading, error, favorites, userInfo, favoritesFlag } = useSelector((state) => state.user);

    useEffect(() => {
        if (favoritesFlag) {
            dispatch(getUserFavorites());
            dispatch(setFavoritesUpdateFlag(false));
        }
    }, [favoritesFlag, dispatch]);

    if (loading) {
        return (
            <Wrap justify='center'>
                <Stack direction='row' spacing='4'>
                    <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
                </Stack>
            </Wrap>
        );
    }

    return (
        <Box py={{ base: 6, md: 12 }}>
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Upps!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Center mb={8}>
                <Text
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontWeight="bold"
                    fontFamily="'Playfair Display', serif"
                    color="gray.700"
                    textAlign="center"
                >
                    Kedvelt termékek
                </Text>
            </Center>

            {favorites.length === 0 ? (
                <Center minH="40vh" px={4}>
                    <Text
                        fontSize={{ base: 'md', md: 'xl' }}
                        color="gray.500"
                        textAlign="center"
                    >
                        Jelenleg nincs hozzáadva kedvelt termék.
                    </Text>
                </Center>
            ) : (
                <Wrap mb='25vh' spacing='30px' justify='center' mx={{ base: '3', md: '20', lg: '32' }}>
                    {favorites.map((product) => (
                        <WrapItem key={product._id}>
                            <Center>
                                <ProductCard product={product} loading={loading} />
                            </Center>
                        </WrapItem>
                    ))}
                </Wrap>
            )}
        </Box>
    );
};

export default FavoritesScreen;
