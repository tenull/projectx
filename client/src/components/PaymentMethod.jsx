import { Box, Heading, RadioGroup, Radio, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethodValue, setPaymentMethodCostValue } from '../redux/actions/cartActions';
import { CheckIcon } from '@chakra-ui/icons';

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod, paymentMethodCost } = useSelector((state) => state.cart);

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
                    {['cash_on_delivery', 'credit_card', 'bank_transfer'].map((method) => {
                        const methodDetails = {
                            cash_on_delivery: {
                                label: 'Utánvétes fizetés (+495 Ft)',
                                description: '+495 Ft',
                            },
                            credit_card: {
                                label: 'Bankkártyával',
                                description: '',
                            },
                            bank_transfer: {
                                label: 'Banki átutalással',
                                description: '',
                            },
                        };

                        return (
                            <Box
                                key={method}
                                w="100%"
                                p={4}
                                border="2px"
                                borderColor="gray.200"
                                borderRadius="lg"
                                boxShadow="md"
                                cursor="pointer"
                                _hover={{ borderColor: "gray.400" }}
                                transition="all 0.2s ease-in-out"
                                onClick={() => handlePaymentChange(method)}
                            >
                                <Radio value={method} isDisabled={false}>
                                    {paymentMethod === method && (
                                        <CheckIcon
                                            position="absolute"
                                            left="-2px"
                                            top="4px"
                                            color="white"
                                            bg="green.400"
                                            borderRadius="50%"
                                            p={1}
                                            boxSize={5}
                                        />
                                    )}
                                    <Text fontWeight="bold" fontSize="lg">{methodDetails[method].label}</Text>
                                   
                                </Radio>
                            </Box>
                        );
                    })}
                </Stack>
            </RadioGroup>
        </Box>
    );
};

export default PaymentMethod;
