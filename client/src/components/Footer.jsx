import {
	Button,
	ButtonGroup,
	Container,
	Divider,
	IconButton,
	Stack,
	Text,
	Box,
	Flex,
	Image,
} from '@chakra-ui/react';
import { Link as ReactLink } from "react-router-dom";
import { FaFacebook } from 'react-icons/fa';

const Footer = () => (
	<Box bg="white" py={10}>
		<Container maxW="7xl">
			<Stack spacing={10} direction={{ base: 'column', md: 'row' }} justify="space-between">
			
				<Stack spacing={4} align={{ base: 'center', md: 'start' }}>
					<Flex alignItems="center" gap={4}>
						<Image src="/images/laskoditesztalogo.png" width="80px" height="80px" />
						<Text fontSize="2xl" fontWeight="bold" color="gray.700">
							Laskodi Tészta
						</Text>
					</Flex>
				</Stack>
				<Stack direction={{ base: 'column', md: 'row' }} spacing={10} flex={1} justify="center">
					<Stack spacing={3} align={{ base: 'center', md: 'start' }}>
						<Text fontSize="md" fontWeight="semibold" color="gray.600">Menü</Text>
						<Button  as={ReactLink} to='/rolunk' variant="link" color="gray.500">Rólunk</Button>
						<Button  as={ReactLink} to='/tesztaink' variant="link" color="gray.500">Tésztáink</Button>
						<Button  as={ReactLink} to='/palyazat' variant="link" color="gray.500">Pályázat</Button>
						<Button  as={ReactLink} to='/kapcsolat' variant="link" color="gray.500">Kapcsolat</Button>
					</Stack>

					<Stack spacing={3} align={{ base: 'center', md: 'start' }}>
						<Text fontSize="md" fontWeight="semibold" color="gray.600">Információk</Text>
						<Button  data-disabled="" variant="link" color="gray.500">ÁSZF</Button>
						<Button data-disabled="" variant="link" color="gray.500">Adatkezelés</Button>
						<Button data-disabled="" variant="link" color="gray.500">Szállítás</Button>
					</Stack>
				</Stack>

				<Stack spacing={3} align={{ base: 'center', md: 'end' }}>
					<Text fontSize="md" fontWeight="semibold" color="gray.600">Elérhetőség</Text>
					<Text fontSize="sm" color="gray.500">Cím: 4543, Laskod Szabadság út 31.</Text>
					<Text fontSize="sm" color="gray.500">Telefon: <a href="tel:+3645709508">+36 45-709-508</a></Text>
					<Text fontSize="sm" color="gray.500">Email: <a href="mailto:laskoditeszta@hu.inter.net">laskoditeszta@hu.inter.net</a></Text>
				</Stack>
			</Stack>

			<Divider my={6} />
			<Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
				<Text fontSize="sm" color="gray.500">&copy; {new Date().getFullYear()} Laskodi Tészta. Minden jog fenntartva.</Text>
				<ButtonGroup>
					<IconButton as='a' href='#' icon={<FaFacebook fontSize='1.5rem' />} colorScheme="blue" variant="ghost"/>
				</ButtonGroup>
			</Stack>
		</Container>
	</Box>
);

export default Footer;
