import { Box, Container, Center, Text, Image, Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React, { useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {
    Button,
    Flex,
    Heading,
    Icon,
    Input,
    Link,
    Textarea,
    VStack
} from '@chakra-ui/react';
import { PhoneIcon, TimeIcon } from '@chakra-ui/icons';
import { MdMail } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
const Contact = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tphone, setTphone] = useState('');
    const [submitFailed, setSubmitFailed] = useState(false);
    const [submitSuccessful, setSubmitSuccessful] = useState(false);
    const { userInfo } = useSelector((state) => state.user);
    const [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
    const [lastNameIsInvalid, setLastNameIsInvalid] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [phoneIsInvalid, setPhoneIsInvalid] = useState(false);
    const [messageIsInvalid, setMessageIsInvalid] = useState(false);

    const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const isValid = () => {
        if (firstName.length < 2) setFirstNameIsInvalid(true);
        else setFirstNameIsInvalid(false);

        if (lastName.length < 2) setLastNameIsInvalid(true);
        else setLastNameIsInvalid(false);

        if (tphone.length < 6) setPhoneIsInvalid(true);
        else setPhoneIsInvalid(false);

        if (!emailRegex.test(email)) setEmailIsInvalid(true);
        else setEmailIsInvalid(false);

        if (message.length < 2 || message.length > 100) setMessageIsInvalid(true);
        else setMessageIsInvalid(false);

        return (
            firstName.length > 1 &&
            lastName.length > 1 &&
            emailRegex.test(email) &&
            message.length < 101
        );
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
        const data = {
            firstName,
            lastName,
            email,
            tphone,
            message,
        };

        try {
            const res = await fetch('http://localhost:5000/api/sendorderconfirmationemail/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setFirstName('');
                setLastName('');
                setTphone('');
                setEmail('');
                setMessage('');
                setSubmitSuccessful(true);
                setSubmitFailed(false);
            } else {
                setSubmitSuccessful(false);
                setSubmitFailed(true);
            }
        } catch (error) {
            console.error('Hiba az email küldése közben:', error);
            setSubmitFailed(true);
        }
    } else {
        setSubmitFailed(true);
    }
};

const emailData = {
    firstName,
    userInfo,
    lastName,
    email,
    tphone,
    message,
};

const sendOrderConfirmationEmail = async () => {
    try {
        await axios.post('http://localhost:5000/api/sendorderconfirmationemail/send-email', emailData
        );
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const onSubmit = async (values)=>{
    sendOrderConfirmationEmail();
}



    const mapContainerStyle = {
        width: '90%',
        height: '700px',
    };
    const mapContainerStyleMobile = {
        width: '100%',
        height: '500px',
    };

    const center = { lat: 48.02184, lng: 21.38115 };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyB8ZVOSmtLY1o_dL6GAwku8uIT1JrzshuA',
    });
    return (
        <Box maxW="8xl" mx="auto" p={{ base: '0', lg: '12' }} minH="6xl">
            <Center
                height={{ base: '200px', md: '300px' }}
                backgroundImage={`linear-gradient(rgb(51, 51, 51, 0.7), #c53030),/images/pastalogo2.jpg`}
                backgroundColor="red.600"
                color="white"
                position="relative"
                backgroundPosition="bottom"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="bold"
                textAlign="center"
            >
                Kapcsolat
            </Center>
            <Breadcrumb ms={2} mt={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
                <BreadcrumbItem>
                    <ReactLink to='/'>Főoldal</ReactLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <ReactLink to='/kapcsolat'>Kapcsolat</ReactLink>
                </BreadcrumbItem>

            </Breadcrumb>

            <Box py={5} mt={5}>
                <Container maxW="container.xl" display='flex' flexWrap='wrap' justifyContent={{ base: 'flex-start', md: 'space-between' }}>
                    <VStack pt={{ base: '0', md: '5' }} align="start" spacing={2} mb={5}>
                        <Text fontSize='sm'>Cím</Text>
                        <Text fontSize="xl" display='flex' alignItems='center'>
                            <Icon as={MdLocationPin} me={2} /> Laskod, 4543 Szabadság út 31.
                        </Text>
                        <Text fontSize='sm'>Nyitvatartás</Text>
                        <Text fontSize="xl" display='flex' alignItems='center'>
                            <Icon as={TimeIcon} me={2} />
                            <Box>
                                Hétfőtől - Szombatig 6 - 16 <br />

                            </Box>
                        </Text>
                        <Text fontSize='sm'>Elérhetőség</Text>
                        <Link fontSize='xl' href="tel:+3645709508" _hover={{ color: 'red.600' }} display='flex' alignItems='center'>
                            <Icon as={PhoneIcon} me={2} /> +36 45-709-508
                        </Link>
                        <Link fontSize='xl' href="mailto:laskoditeszta@hu.inter.net" _hover={{ color: 'red.600' }} display='flex' alignItems='center'>
                            <Icon as={MdMail} me={2} /> laskoditeszta@hu.inter.net
                        </Link>
                    </VStack>
                    {/* <Flex justifyContent="space-around" wrap="wrap" mb={5}>
                        <Box textAlign="center" mb={3}>
                            <Text fontSize="2xl">Intézményvezető</Text>
                            <Text>Kiss-Csáki Beatrix</Text>
                        </Box>
                        <Box textAlign="center" mb={3}>
                            <Text fontSize="2xl">Intézményvezető-helyettes</Text>
                            <Text>Pallay Zsófia</Text>
                        </Box>
                        <Box textAlign="center" mb={3}>
                            <Text fontSize="2xl">Intézmény ápoló</Text>
                            <Text>Koleszár Ferenc</Text>
                        </Box>
                    </Flex> */}

                    <Box py={5}  >
                        <form onSubmit={handleSubmit}>
                            <Text maxW='700px' fontSize="xl" textAlign={{ base: 'justify', md: 'justify' }} mb={5}>
                                Amennyiben érdekli együttműködési lehetőség cégünkkel, vagy további kérdése van, kérjük, vegye fel velünk a kapcsolatot az alábbi elérhetőségeken!
                            </Text>
                            {submitSuccessful ? (
                                <Box textAlign="center" mb={5}>
                                    <Box color="green.500">Az üzenetét elküldtük!</Box>
                                </Box>
                            ) : (
                                submitFailed && (
                                    <Box textAlign="center" mb={5}>
                                        <Box color="red.500">Az üzenetét nem tudtuk elküldeni!</Box>
                                    </Box>
                                )
                            )}
                            <VStack spacing={4} align="stretch" mb={5}>
                                <Flex>
                                    <Box flex="1" mr={2}>
                                        <Input
                                            placeholder="Vezetéknév*"
                                            value={lastName}
                                            _focus={{
                                                borderColor: 'red.600'
                                            }}
                                            onChange={(e) => setLastName(e.target.value)}
                                            isInvalid={lastNameIsInvalid}
                                        />
                                        {lastNameIsInvalid && <Text color="red.500" fontSize="sm">*Legalább két karaktert</Text>}
                                    </Box>
                                    <Box flex="1" ml={2}>
                                        <Input
                                            placeholder="Keresztnév*"
                                            value={firstName}
                                            _focus={{
                                                borderColor: 'red.600'
                                            }}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            isInvalid={firstNameIsInvalid}
                                        />
                                        {firstNameIsInvalid && <Text color="red.500" fontSize="sm">*Legalább két karaktert</Text>}
                                    </Box>
                                </Flex>
                                <Flex>
                                    <Box flex="1" mr={2}>
                                        <Input
                                            _focus={{
                                                borderColor: 'red.600'
                                            }}
                                            placeholder="E-mail cím*"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={emailIsInvalid}
                                        />
                                        {emailIsInvalid && <Text color="red.500" fontSize="sm">*Rossz e-mail formátum</Text>}
                                    </Box>
                                    <Box flex="1" ml={2}>
                                        <Input
                                            placeholder="Telefonszám*"
                                            _focus={{
                                                borderColor: 'red.600'
                                            }}
                                            value={tphone}
                                            onChange={(e) => setTphone(e.target.value)}
                                            isInvalid={phoneIsInvalid}
                                        />
                                        {phoneIsInvalid && <Text color="red.500" fontSize="sm">*Legalább hat karaktert</Text>}
                                    </Box>
                                </Flex>
                                <Textarea
                                    _focus={{
                                        borderColor: 'red.600'
                                    }}
                                    placeholder="Üzenet*"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    isInvalid={messageIsInvalid}
                                    height='250px'
                                />
                                {messageIsInvalid && <Text color="red.500" fontSize="sm">*Minimum 2 és maximum 100 karaktert</Text>}
                                <Button
                                    type="submit"
                                    width='100%'
                                    bg="red.600"
                                    color="white"
                                    _hover={{ bg: "red.700" }}
                                    rounded='0'
                                    alignSelf="center"
                                >
                                    Küldés
                                </Button>

                            </VStack>
                        </form>
                    </Box>

                </Container>
                <Box display={{ base: 'none', md: 'block' }} mb={10}>
                    {isLoaded && (
                        <Flex justifyContent="center">
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={17}
                            />
                        </Flex>
                    )}
                </Box>
                <Box display={{ base: 'block', md: 'none' }} mb={5}>
                    {isLoaded && (
                        <Flex justifyContent="center">
                            <GoogleMap
                                mapContainerStyle={mapContainerStyleMobile}
                                center={center}
                                zoom={17}
                            />
                        </Flex>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Contact;
