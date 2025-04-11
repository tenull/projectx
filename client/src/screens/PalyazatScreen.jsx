import { Box, Text, Image, Grid, GridItem, Center,Breadcrumb,BreadcrumbItem } from '@chakra-ui/react';
import { shippingMethods } from '../shippingMethods';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ReactLink } from 'react-router-dom';

const PalyazatScreen = () => {
    return ( 
        <Box  maxW="8xl" mx="auto" p={{ base: '0', lg: '12' }} minH="6xl">
            <Center
                height={{ base: '200px', md: '300px' }}
                backgroundColor="red.600"
                backgroundImage={`linear-gradient(rgb(51, 51, 51, 0.7), #c53030),/images/pastalogo2.jpg`}
                color="white"
                position="relative"
                backgroundPosition="bottom"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="bold"
                textAlign="center"
            >
                Pályázat
            </Center>
            <Breadcrumb ms={2} mt={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
                <BreadcrumbItem>
                    <ReactLink to='/'>Főoldal</ReactLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <ReactLink to='/palyazat'>Pályázat</ReactLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Box display='flex' justifyContent='center'>
        <Image my={10} src='/images/palyazat.jpg'/>
            </Box>
            <Box border='1px solid' borderColor='gray.200'>
                <Box  borderBottom='1px solid' borderBottomColor='gray.200'>
                    <Box display='flex' p={5}>
                    <Text width='200px'>Kedvezményezett neve:</Text>
                    <Text fontWeight='bold'> - </Text>
                    </Box>
                </Box>
                <Box  borderBottom='1px solid' borderBottomColor='gray.200'>
                    <Box display='flex' p={5}>
                    <Text width='200px'>Projekt címe:</Text>
                    <Text fontWeight='bold'> - </Text>
                    </Box>
                </Box>
                <Box  borderBottom='1px solid' borderBottomColor='gray.200'>
                    <Box display='flex' p={5}>
                    <Text width='200px'>Kedvezményezett neve:</Text>
                    <Text fontWeight='bold'> - </Text>
                    </Box>
                </Box>
                <Box  borderBottom='1px solid' borderBottomColor='gray.200'>
                    <Box display='flex' p={5}>
                    <Text width='200px'>Szerződött támogatás összege:</Text>
                    <Text fontWeight='bold'> - </Text>
                    </Box>
                </Box>
                <Box  borderBottom='1px solid' borderBottomColor='gray.200'>
                    <Box display='flex' p={5}>
                    <Text width='200px'>Támogatás mértéke:</Text>
                    <Text fontWeight='bold'> - </Text>
                    </Box>
                </Box>
                <Box  borderBottom='1px solid' borderBottomColor='gray.200'>
                    <Box display='flex' p={5}>
                    <Text width='200px'>A projekt tartalma:</Text>
                    <Text fontWeight='bold'> - </Text>
                    </Box>
                </Box>
                <Box  borderBottom='1px solid' borderBottomColor='gray.200'>
                    <Box display='flex' p={5}>
                    <Text width='200px'>A projekt tervezett befejezése:</Text>
                    <Text fontWeight='bold'> - </Text>
                    </Box>
                </Box>
              
            </Box>
        </Box>
     );
}
 
export default PalyazatScreen;



