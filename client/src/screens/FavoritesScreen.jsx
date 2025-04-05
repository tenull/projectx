import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavorites, } from '../redux/actions/userActions';
import { Wrap, WrapItem, Center, Text, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Spinner, Stack } from "@chakra-ui/react";
import ProductCard from '../components/ProductCard';
import { setFavoritesUpdateFlag } from '../redux/slices/user';
const FavoritesScreen = () => {
    const dispatch = useDispatch();
    const { loading, error, favorites,userInfo,favoritesFlag } = useSelector((state) => state.user);

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
        <Box>
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Upps!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Center marginY='20px'>
                <Text fontSize='4xl' fontWeight='bold'>Kedvenc termékek</Text>
            </Center>

            {favorites.length === 0 ? (
                <Center>
                    <Text mb='50vh' fontSize='xl'>Jelenleg nincs hozzáadva kedvenc termék.</Text>
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
