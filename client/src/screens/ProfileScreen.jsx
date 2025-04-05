import { Container, Text, Box, Button, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Link as ReactLink } from "react-router-dom";
import { BiUserCheck } from "react-icons/bi";
const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { loading, error, orders, userInfo } = useSelector((state) => state.user);
    const location = useLocation();


    useEffect(() => {
        if (userInfo) {
            dispatch(getUserOrders());
        }
    }, [dispatch, userInfo]);

    return (
        <Container py={10} maxW='container.xl'>
            <Text fontSize='2xl' fontWeight='bold' textAlign='center'>Felhasználó Fiók</Text>
            <Box my={5} display='flex' flexWrap='wrap' justifyContent='space-evenly'>
                <Box >
                    <Box display='flex'>
                        <Text me={2}>Felhasználónév: </Text>
                        <Text>{userInfo.name}</Text>
                    </Box>
                    <Box display='flex'>
                        <Text me={2}>Email cím: </Text>
                        <Text>{userInfo.email}</Text>
                    </Box>
                    <Box display='flex'>
                        <Text me={2}>Regisztráció időpontja:</Text>
                        <Text>{new Date(userInfo.created).toLocaleString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text>
                    </Box>


                    <Button my={5} as={ReactLink} to='/rendelesitortenet'>Rendelési előzmények</Button>
                </Box>
                <Box>
                    {userInfo.googleImage ? (<Image borderRadius='full' boxSize='140px' src={userInfo.googleImage} referrerPolicy='no-referrer' />) : (<BiUserCheck size='130' />)}
                </Box>
            </Box>

            <Box>
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">Legutolsó Rendelés</Text>

                {orders && orders.length > 0 ? (
                    orders.slice(-1).map((order) => (
                        <Box key={order._id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
              
                            <Text fontWeight="bold">Rendelés ID: {order._id}</Text>
                            <Text>Dátum: {new Date(order.createdAt).toLocaleString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text>
                            <Text>Felhasználó: {order.username}</Text>
                            <Text>Szállítási idő: {order.selectedDeliveryTime}</Text>
                            <Text>Szállítási cím: {order.shippingAddress.address}</Text>
                            <Text>Teljes összeg: {order.totalPrice} Ft</Text>
                            <Text>Fizetés: {order && parseFloat(order.shippingPrice) === 4.99 ? 'Fizetés a helyszínen' : 'Fizetés bankkártyával'}</Text>

                          
                            <Text color={order.isDelivered ? 'green.500' : 'red.500'}>
                                {order.isDelivered ? 'Kiszállítva' : 'Szállítás alatt'}
                            </Text>

 
                            <Box mt={4}>
                                <Text fontSize="lg" fontWeight="bold">Rendelt tételek:</Text>
                                {order.orderItems.map((item) => (
                                    <Box key={item._id} p={2} borderWidth="1px" borderRadius="md" mt={2}>
                                        <Text><strong>Termék neve:</strong> {item.name}</Text>
                                        <Text><strong>Márka:</strong> {item.brand}</Text>
                                        <Text><strong>Darabszám:</strong> {item.qty}</Text>
                                        <Text><strong>Ár:</strong> {item.price} Ft</Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Text my={10} textAlign='center'>Nincsenek rendeléseid.</Text>
                )}
            </Box>
        </Container>
    );
}

export default ProfileScreen;