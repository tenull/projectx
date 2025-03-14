import { Box, Heading, RadioGroup, Radio, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethodValue,setPaymentMethodCostValue } from '../redux/actions/cartActions';

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod,paymentMethodCost } = useSelector((state) => state.cart);

    const handlePaymentChange = (value) => {
        const paymentCosts = {
            cash_on_delivery: 495,
            credit_card: 0,
            bank_transfer: 0,
        };
        const cost = paymentCosts[value] ?? 0;
        dispatch(setPaymentMethodValue(value));
        dispatch(setPaymentMethodCostValue(cost));
        localStorage.setItem("paymentMethodCost", JSON.stringify(Number(cost)));
    };

    
    return ( 
        <Box w="100%" py={10} pr="5">
            <Heading fontSize="2xl" fontWeight="extrabold" mb="6">
                Fizetési mód
            </Heading>
            <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
                <Stack direction={{ base: 'column', lg: 'row' }} wrap="wrap" align="stretch" spacing={3}>
                    <Box
                        w="100%"
                        p={4}
                        border="2px"
                        borderColor="gray.200"
                        borderRadius="lg"
                        boxShadow="md"
                        _hover={{ borderColor: "gray.400" }}
                        transition="all 0.2s ease-in-out"
                    >
                        <Radio value="cash_on_delivery">
                            <Text fontWeight="bold" fontSize="lg">Utánvétes fizetés (+495 Ft)</Text>
                        </Radio>
                    </Box>
                    <Box
                        w="100%"
                        p={4}
                        border="2px"
                        borderColor="gray.200"
                        borderRadius="lg"
                        boxShadow="md"
                        _hover={{ borderColor: "gray.400" }}
                        transition="all 0.2s ease-in-out"
                    >
                        <Radio value="credit_card">
                            <Text fontWeight="bold" fontSize="lg">Bankkártyával</Text>
                        </Radio>
                    </Box>
                    <Box
                        w="100%"
                        p={4}
                        border="2px"
                        borderColor="gray.200"
                        borderRadius="lg"
                        boxShadow="md"
                        _hover={{ borderColor: "gray.400" }}
                        transition="all 0.2s ease-in-out"
                    >
                        <Radio value="bank_transfer">
                            <Text fontWeight="bold" fontSize="lg">Banki átutalással</Text>
                        </Radio>
                    </Box>
                </Stack>
            </RadioGroup>
        </Box>
    );
};

export default PaymentMethod;
