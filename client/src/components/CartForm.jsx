import {
    CloseButton, Box, Button, Input, Flex, Image, Spacer, Text, VStack, useColorModeValue as mode, useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';
import { FaTrashCan } from "react-icons/fa6";
import { useState } from 'react';
import { Link, Link as ReactLink } from 'react-router-dom';
import { TbShoppingCartOff } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
const CartForm = ({ cartItems, onClose }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { loading } = useSelector((state) => state.user);
    const { subtotal, shipping } = useSelector((state) => state.cart);
    const navigate = useNavigate()
    const handleQtyChange = (id, stock, value) => {
        let newQty = parseInt(value, 10);

        if (newQty > stock) {
            newQty = stock;
            toast({
                description: 'Elérted a maximális készletet.',
                status: 'warning',
                isClosable: true,
            });
        } else if (newQty < 1 || isNaN(newQty)) {
            newQty = 1;
        }

        dispatch(addCartItem(id, newQty));
    };

    const increaseQty = (id, stock, qty) => {
        if (qty < stock) {
            dispatch(addCartItem(id, qty + 1));
        } else {
            toast({
                description: 'Nem tudsz többet hozzáadni, nincs elég készlet.',
                status: 'warning',
                isClosable: true,
            });
        }
    };

    const decreaseQty = (id, qty) => {
        if (qty > 1) {
            dispatch(addCartItem(id, qty - 1));
        } else {
            dispatch(removeCartItem(id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Box as="form" onSubmit={handleSubmit} minWidth="250px" bg="white" align="center">
            <Text fontWeight='bold'>Kosár tartalma</Text>
            {cartItems.length > 0 ? (
                cartItems.map(({ name, image, price, stock, qty, id,packaking }) => (
                    <VStack borderBottom="2px" borderBottomColor="gray.300" key={id} p="2" w="100%" align="stretch">
                        <Flex alignItems="center" justify="space-between">
                            <Image
                                rounded="lg"
                                w="25px"
                                h="25px"
                                fit="cover"
                                src={image}
                                fallbackSrc="https://via.placeholder.com/150"
                            />
                            <Text fontSize="sm" fontWeight="medium">{name} {packaking*1000}g</Text>
                            <Spacer />
                            <FaTrashCan cursor='pointer' onClick={() => dispatch(removeCartItem(id))} />
                        </Flex>
                        <Spacer />
                        <Flex alignItems="center" justify="space-between">
                            <Flex alignItems="center">
                                <Button
                                    type="button"
                                    colorScheme="red"
                                    size="xs"
                                    onClick={() => decreaseQty(id, qty)}
                                >
                                    {qty < 2 ? <FaTrashCan /> : '-'}
                                </Button>
                                <Input
                                    type="number"
                                    _focus={{
                                        borderColor: "red",
                                        boxShadow: "0 0 0 1px red",
                                    }}
                                    value={qty}
                                    onChange={(e) => handleQtyChange(id, stock, e.target.value)}
                                    max={stock}
                                    min={1}
                                    width="40px"
                                    height='30px'
                                    mx="1"
                                    px={3}
                                    fontSize="md"
                                />
                                <Button
                                    type="button"
                                    colorScheme="red"
                                    size="xs"
                                    onClick={() => increaseQty(id, stock, qty)}
                                    isDisabled={qty >= stock}
                                    backgroundColor={qty >= stock ? 'red.200' : 'red.500'}
                                    _hover={{
                                        backgroundColor: qty >= stock ? 'red.200' : 'red.400',
                                    }}
                                    opacity={qty >= stock ? 0.7 : 1}
                                    cursor={qty >= stock ? 'not-allowed' : 'pointer'}
                                >
                                    +
                                </Button>
                            </Flex>
                            <Text fontWeight="bold">{price * qty} Ft</Text>
                        </Flex>
                    </VStack>

                ))
            ) : (
                <Box mt={10} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <TbShoppingCartOff fontSize='50' />
                    <Box p={4}>Üres a kosár.</Box>
                    <Button
                    colorScheme="red"
                    size="md"
                    isLoading={loading}
                    type="button"
                    onClick={() => {
                        onClose();
                        setTimeout(() => {
                            navigate('/tesztaink');
                        }, 100);
                    }}
                >
                    Tovább a tésztáinkhoz
                </Button>
                </Box>
            )}

            {!cartItems.length == 0 && (<>
                <Box py={5} display='flex' justifyContent='space-between' fontWeight='bold'>
                    <Text>Teljes összeg</Text>
                    <Text>{subtotal} Ft</Text>
                </Box>
                <Button
                    colorScheme="red"
                    size="md"
                    isLoading={loading}
                    type="button"
                    onClick={() => {
                        onClose();
                        setTimeout(() => {
                            navigate('/kosar');
                        }, 100);
                    }}
                >
                    Pénztár
                </Button></>)}

        </Box>

    );
}

export default CartForm;
