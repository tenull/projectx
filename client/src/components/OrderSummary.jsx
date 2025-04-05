import { Button, Flex, Heading, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';

const OrderSummary = ({ checkoutSreen = false }) => {
	const { subtotal, shipping,selectedShippingMethod,paymentMethodCost,paymentMethod } = useSelector((state) => state.cart);

	const paymentName = {
		cash_on_delivery: 'Utánvétes fizetés (+495 Ft)',
		credit_card: 'Bankkártyával',
		bank_transfer: 'Banki átutalással',
	};

	return (
		<Stack
			minWidth='300px'
			spacing='8'
			borderWidth='1px'
			borderColor={mode('red.600', 'cyan.100')}
			rounded='lg'
			padding='8'
			w='full'>
			<Heading size='md'>Összegzés</Heading>
			<Stack spacing='6'>
				<Flex justify='space-between'>
					<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
						Összesen
					</Text>
					<Text fontWeight='medium'>{subtotal} Ft</Text>
				</Flex>
				<Flex justify='space-between'>
					<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
						Szállítási mód
					</Text>
					<Text fontWeight='medium'>{shipping || "Ismeretlen szállítási mód"}</Text>
				</Flex>
				<Flex justify='space-between'>
					<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
						Szállítási költség
					</Text>
					<Text fontWeight='medium'>{selectedShippingMethod || "Ismeretlen szállítási költség"} Ft</Text>
				</Flex>
				<Flex justify='space-between'>
					<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
						Fizetési mód
					</Text>
					<Text fontWeight='medium'>{paymentName[paymentMethod] || "Ismeretlen fizetési mód"}</Text>
				</Flex>
				<Flex justify='space-between'>
					<Text fontSize='xl' fontWeight='extrabold'>
						Végösszeg
					</Text>
					<Text fontWeight='medium'>{Number(subtotal) + Number(selectedShippingMethod) + Number(paymentMethodCost)} Ft</Text>
				</Flex>
			</Stack>
			<Button
				hidden={checkoutSreen}
				as={ReactLink}
				to='/penztar'
				colorScheme='red'
				size='lg'
				rightIcon={<FaArrowRight />}>
				Pénztár
			</Button>
		</Stack>
	);
};

export default OrderSummary;
