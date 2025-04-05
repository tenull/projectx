import { Center, Text, Box, Button, VStack } from '@chakra-ui/react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';

const CancelScreen = () => {
	return (
		<Center height="100vh" flexDirection="column" bg="gray.50">
			<VStack spacing={6} textAlign="center">
				<Text fontSize={{ base: 'lg', md: '2xl', lg: '3xl' }} fontWeight="bold" color="red.600">
					A fizetési folyamat megszakadt!
				</Text>
				<Box bg="red.100" p={4} borderRadius="full">
					<BsBoxSeamFill size="70px" color="red.600" />
				</Box>
				<Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700">
					Ne aggódj, a kosaradat elmentettük, ha később folytatnád a vásárlást.
				</Text>
				<Button 
					as={ReactLink} 
					to="/kosar" 
					mt="4" 
					colorScheme="red" 
					size="lg"
					px={6}
					shadow="md"
					_hover={{ bg: 'red.500' }}
				>
					Vissza a kosárhoz
				</Button>
			</VStack>
		</Center>
	);
};

export default CancelScreen;
