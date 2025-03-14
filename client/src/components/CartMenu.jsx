import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Input, Button, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Flex } from '@chakra-ui/react';
import { TbShoppingCart } from 'react-icons/tb';
import CartForm from './CartForm';

const CartMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { cartItems, subtotal } = useSelector((state) => state.cart);
    const { favoritesToggled, products } = useSelector((state) => state.product);
    return (
        <Box  position='relative'>
            <Box
             onClick={onOpen}
             cursor='pointer'
            // as={ReactLink}
            // to='/cart'
            // onMouseEnter={handleMouseEnter} 
            // onMouseLeave={handleMouseLeave} 
            >
                <>
                    <Box position="relative">
                        <IconButton
                            aria-label="Kosár"
                            icon={<TbShoppingCart size="25px" />}
                       
                            variant="ghost"
                        />
                        {cartItems.length > 0 && (
                            <Text
                                fontWeight="bold"
                                
                                bg="red.600"
                                px='1.5'
                                py='1.2'
                                color="white"
                                position="absolute"
                                top="-0px"
                                right="-6px"
                                borderRadius="full"
                                fontSize="sm"
                            >
                                {cartItems.length}
                            </Text>
                        )}
                        {cartItems.length > 0 && cartItems.map((cart) => (
                            <Text fontWeight='bold' position='absolute' ml='8' mt='-5' fontSize='2xs'>
                                {subtotal}Ft
                            </Text>
                        ))}
                    </Box>
                    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: 'full', md: 'md' }}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Kosár</DrawerHeader>

                            <DrawerBody>
                                <CartForm cartItems={cartItems} products={products} onClose={onClose} />
                                {/* <Button variant="outline" mr={3} onClick={onClose}>
                    Mégse
                </Button>
                <Button colorScheme="green">Fizetés</Button> */}
                            </DrawerBody>

                        </DrawerContent>
                    </Drawer>
                </>
            </Box>

            {/* {isCartVisible && (
                <Box 
                    position="absolute" 
					zIndex={1}
                    top="40px" 
                    right="0" 
                    bg="white" 
                    p="4" 
                    shadow="md"
                    onMouseEnter={handleMouseEnter}  
                    onMouseLeave={handleMouseLeave} 
                >
                    <CartForm cartItems={cartItems} products={products} />
                </Box>
            )} */}


        </Box>

    );
}

export default CartMenu;