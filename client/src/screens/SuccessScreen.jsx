import { Center, Text, Box, Button, VStack } from '@chakra-ui/react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetCart } from '../redux/actions/cartActions';

const SuccessScreen = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetCart());
	}, [dispatch]);

	return (
		<Center height="100vh" flexDirection="column" bg="gray.50">
			<VStack spacing={6} textAlign="center">
				<Text fontSize={{ base: 'lg', md: '2xl', lg: '3xl' }} fontWeight="bold" color="green.600">
					Köszönjük a rendelésed!
				</Text>
				<Box bg="green.100" p={4} borderRadius="full">
					<BsBoxSeamFill size="70px" color="green.600" />
				</Box>
				<Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700">
					Rendelésed feldolgozás alatt van. Az előzményeid között nyomon követheted.
				</Text>
				<Button 
					as={ReactLink} 
					to="/rendelesitortenet" 
					mt="4" 
					colorScheme="green" 
					size="lg"
					px={6}
					shadow="md"
					_hover={{ bg: 'green.500' }}
				>
					Rendeléseim megtekintése
				</Button>
			</VStack>
		</Center>
	);
};

export default SuccessScreen;
