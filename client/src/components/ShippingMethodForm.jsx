import { Box, Heading, RadioGroup, Stack, Text, Radio } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { setShipping, setSelectedShippingMethodPrice } from '../redux/actions/cartActions';
import { shippingMethods } from "../shippingMethods";
import { CheckIcon } from '@chakra-ui/icons';

const ShippingMethodForm = () => {
    const dispatch = useDispatch();
    const { shipping, subtotal, selectedShippingMethodPrice } = useSelector((state) => state.cart);
    const { cartItems } = useSelector((state) => state.cart);
    const totalWeight = cartItems.reduce((acc, item) => acc + item.qty * (item.packaking ?? 0), 0);
    const [selectedShippingPrice, setSelectedShippingPrice] = useState(selectedShippingMethodPrice || shipping || "");
    const [selectedShipping, setSelectedShipping] = useState(shipping || "");

    const handleShippingChange = (value) => {
        setSelectedShipping(value);
        dispatch(setShipping(value));

        if (value === "Személyes átvétel") {
            dispatch(setSelectedShippingMethodPrice(0));
            localStorage.setItem("selectedShippingMethod", "0");
        } else {
            const selectedMethod = shippingMethods.find(method => method.name === value);
            if (selectedMethod) {
                const price = getShippingPrice(selectedMethod, totalWeight, subtotal);
                dispatch(setSelectedShippingMethodPrice(price));
                localStorage.setItem("selectedShippingMethod", price.toString());
            }
        }
    };

    const getShippingPrice = (method, totalWeight, subtotal) => {
        if (method.prices[0].maxWeight) {
            return method.prices.find((p) => totalWeight <= p.maxWeight)?.price || null;
        } else if (method.prices[0].maxPrice) {
            return method.prices.find((p) => subtotal <= p.maxPrice)?.price || null;
        }
        return null;
    };

    return (
        <Box w="100%" pr="5">
            <Heading fontSize="2xl" fontWeight="extrabold" mb="6">
                Szállítás
            </Heading>
            <RadioGroup value={selectedShipping} onChange={handleShippingChange}>
                <Stack direction={{ base: 'column', lg: 'row' }} wrap="wrap" align="stretch" spacing={3}>

                    <Box
                        minW="100%"
                     
                        p={4}
                        border="2px"
                        borderColor="gray.200"
                        borderRadius="lg"
                        boxShadow="md"
                        cursor="pointer"
                        _hover={{ borderColor: "gray.400" }}
                        transition="all 0.2s ease-in-out"
                    >
                        <Radio
                            value="Személyes átvétel"
                            w="100%"
                            colorScheme="green"
                            position="relative"
                        >
                            {selectedShipping === "Személyes átvétel" && (
                                <CheckIcon
                                    position="absolute"
                                    left="-12px"
                                    top='0px'
                                    color="white"
                                    bg="green.400"
                                    borderRadius="50%"
                                    p={1}
                                    boxSize={5}
                                    ml="10px"
                                    mt="14px"
                                />
                            )}
                            <Text fontWeight="bold" fontSize="lg">Személyes átvétel</Text>
                            <Text fontSize="sm" color="gray.600">Átveheti telephelyünkön.</Text>
                        </Radio>
                    </Box>


                    {shippingMethods.map((method) => {
                        const price = getShippingPrice(method, totalWeight, subtotal);
                        const isDisabled = !price;

                        return (

                            <Box
                              minW='100%'
                                width={{ base: '330px', md: '600px' }}
                                p={4}
                                border="2px"
                                borderColor={isDisabled ? "red.400" : "gray.200"}
                                borderRadius="lg"
                                boxShadow="md"
                                cursor={isDisabled ? "not-allowed" : "pointer"}
                                _hover={{ borderColor: isDisabled ? "red.500" : "gray.400" }}
                                transition="all 0.2s ease-in-out"
                                opacity={isDisabled ? 0.6 : 1}
                            >
                                <Radio
                                    value={method.name}
                                    isDisabled={isDisabled}
                                    w="100%"
                                    colorScheme="green"
                                    position='relative'
                                >
                                    {selectedShipping === method.name && (
                                        <CheckIcon
                                            position="absolute"
                                            left="-12px"
                                            top='7px'
                                            color="white"
                                            bg="green.400"
                                            borderRadius="50%"
                                            p={1}
                                            boxSize={5}
                                            ml="10px"
                                            mt="14px"
                                        />
                                    )}
                                    <Text fontWeight="bold" fontSize="md">{method.name}</Text>
                                    <Text fontSize="xs" color="gray.600">{method.date}</Text>
                                    <Text color={isDisabled ? "red.500" : "gray.600"}>
                                        {price !== null ? `Szállítási költség: ${price} Ft` : "Nem elérhető"}
                                    </Text>
                                </Radio>
                            </Box>

                        );
                    })}
                </Stack>
            </RadioGroup>
        </Box>
    );
};

export default ShippingMethodForm;
