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
    useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import PasswordForgottenForm from '../components/PasswordForgottenForm';
import TextField from '../components/TextField';
import { login, googleLogin } from '../redux/actions/userActions';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = '/products';
    const toast = useToast();

    const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    useEffect(() => {
        if (userInfo) {
            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate(redirect);
            }
            toast({
                description: 'Login successful.',
                status: 'success',
                isClosable: true,
            });
        }

        if (serverMsg) {
            toast({
                description: `${serverMsg}`,
                status: 'success',
                isClosable: true,
            });
        }
    }, [userInfo, redirect, error, navigate, location.state, toast, showPasswordReset, serverMsg]);

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
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email.').required('Required'),
                password: Yup.string().min(1, 'Too short!').required('Required'),
            })}
            onSubmit={(values) => {
                dispatch(login(values.email, values.password));
                toast({
                    description: 'Login successful',
                    status: 'success',
                    isClosable: true,
                });
            }}>
            {(formik) => (
                <Box p={4} bg="white" width='350px' boxShadow="md" borderRadius="md">
                    <Stack as="form" onSubmit={formik.handleSubmit} spacing={4}>
                        {error && (
                            <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <FormControl >
                           <Text fontWeight='bold' textAlign='center'>Belépés</Text>
                            <TextField type="text" name="email" placeholder="you@example.com" label="Email" />
                            <PasswordField type="password" name="password" placeholder="your password" label="Password" />
                            <Button size="sm" variant="link" onClick={() => setShowPasswordReset(!showPasswordReset)}>
                                Forgot Password?
                            </Button>
                            {showPasswordReset && <PasswordForgottenForm />}
                        </FormControl>
                        <Button colorScheme="red" size="md" isLoading={loading} type="submit">
                            Belépés
                        </Button>
                        <Button
                            leftIcon={<FcGoogle />}
                            colorScheme='red'
                            size='md'
                            fontSize='md'
                            isLoading={loading}
                            onClick={() => handleGoogleLogin()}>
                            Google belépés
                        </Button>
                        <Button as={ReactLink} to='/regisztracio' variant='link' colorScheme='red'>
                           Nincs még fiókod? Regisztrálj!
                        </Button>
                    </Stack>
                </Box>
            )}
        </Formik>
    );
};

export default LoginForm;
