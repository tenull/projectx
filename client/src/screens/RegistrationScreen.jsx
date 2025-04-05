import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	FormControl,
	HStack,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	useToast,
} from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import TextField from '../components/TextField';
import { googleLogin, register } from '../redux/actions/userActions';

const RegistrationScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const redirect = '/';
	const toast = useToast();
	const { loading, error, userInfo } = useSelector((state) => state.user);
	const headingBR = useBreakpointValue({ base: 'md', md: 'lg' });

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
			toast({
				description: userInfo.firstLogin
					? 'Fiók létrehozva. Üdv a fedélzeten!'
					: `Üdv újra, ${userInfo.name}!`,
				status: 'success',
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, toast]);

	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${response.access_token}` },
				})
				.then((res) => res.data);
			const { sub, email, name, picture } = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '', name: '' }}
			validationSchema={Yup.object({
				name: Yup.string().required('Név megadása kötelező.'),
				email: Yup.string()
					.email('Érvénytelen email cím.')
					.required('Email megadása kötelező.'),
				password: Yup.string()
					.min(6, 'A jelszónak legalább 6 karakter hosszúnak kell lennie.')
					.required('Jelszó megadása kötelező.'),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref('password'), null], 'A jelszavak nem egyeznek.')
					.required('A jelszó megerősítése kötelező.'),
			})}
			onSubmit={(values) => {
				dispatch(register(values.name, values.email, values.password));
			}}>
			{(formik) => (
				<Container maxW="lg" py={{ base: '12', md: '16' }} px={{ base: '4', md: '8' }}>
					<Stack spacing="8">
						<Stack spacing="4" textAlign="center">
							<Heading size={headingBR}>Fiók létrehozása</Heading>
							<HStack spacing="1" justify="center">
								<Text color="gray.600">Már van fiókod?</Text>
								<Button as={ReactLink} to="/bejelentkezes" variant="link" colorScheme="red">
									Jelentkezz be
								</Button>
							</HStack>
						</Stack>
						<Box py={{ base: '4', md: '6' }} px={{ base: '4', md: '10' }} boxShadow="lg" borderRadius="md">
							<Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
								{error && (
									<Alert status="error">
										<AlertIcon />
										<AlertTitle>Hiba történt!</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}
								<Stack spacing="4">
									<FormControl>
										<TextField type="text" name="name" placeholder="Teljes név" label="Teljes név" />
										<TextField type="email" name="email" placeholder="you@example.com" label="Email cím" />
										<PasswordField type="password" name="password" placeholder="Jelszó" label="Jelszó" />
										<PasswordField
											type="password"
											name="confirmPassword"
											placeholder="Jelszó megerősítése"
											label="Jelszó megerősítése"
										/>
									</FormControl>
								</Stack>
								<Stack spacing="4">
									<Button colorScheme="red" size="lg" isLoading={loading} type="submit">
										Regisztráció
									</Button>
									<Button
										variant="outline"
										size="lg"
										leftIcon={<FcGoogle size={24} />}
										isLoading={loading}
										onClick={handleGoogleLogin}>
										Folytatás Google-lel
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
	);
};

export default RegistrationScreen;
