import { Box, Text, Image, Grid, GridItem, Center,Breadcrumb,BreadcrumbItem } from '@chakra-ui/react';
import { shippingMethods } from '../shippingMethods';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ReactLink } from 'react-router-dom';

const Deliver = () => {
    return (
        <Box maxW="8xl" mx="auto" p={{ base: '0', lg: '12' }} minH="6xl">
            <Center
                height={{ base: '200px', md: '300px' }}
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
                Szállítási információk
            </Center>
            <Breadcrumb mt={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
                <BreadcrumbItem>
                    <ReactLink to='/'>Főoldal</ReactLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <ReactLink to='/szallitasi-informaciok'>Szállítási információk</ReactLink>
                </BreadcrumbItem>

            </Breadcrumb>

            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={6}
                mt={10}
            >
                {shippingMethods.map((method, index) => (
                    <Box key={index} p={6} borderWidth={1} borderRadius="md" boxShadow="md" bg="white">
                        <Text fontSize="xl" fontWeight="bold" mb={4}>{method.name}</Text>
                        <Box h='250px' display='flex' justifyContent='center'>
                            <Image  src={method.image} alt={method.name} mb={4} borderRadius="md" /> 
                        </Box>
                        
                       
                        {method.details.map((detail, i) => (
                            <Text key={i} fontSize="md" color="gray.700" mb={2}>{detail}</Text>
                        ))}
                    </Box>
                ))}
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10} mt={16}>
                <GridItem>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>Szeretnéd, ha mi szállítanánk ki a rendelésed?</Text>
                    <Text mb={4}>Bár kapacitásunk korlátozott, lehetőséget biztosítunk saját kiszállításra is.</Text>
                    <Text mb={2}>✅ <b>Viszonteladók számára</b> akár országos kiszállítást is vállalunk – ennek költsége a helyszíntől és a rendelés mennyiségétől függ. Részletekért vedd fel velünk a kapcsolatot!</Text>
                    <Text mb={4}>✅ <b>Szabolcs-Szatmár-Bereg megye területén</b> több mint 30 éve szállítunk házhoz magánvevőink, viszonteladóink és éttermek számára.</Text>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>Szállítási díjak:</Text>
                    <Text>📦 <b>12.000 Ft alatti rendelés esetén</b>: 990 Ft</Text>
                    <Text>📦 <b>12.000 Ft felett</b>: <b>INGYENES</b></Text>
                </GridItem>

                <GridItem>
                    <Text fontSize="xl" fontWeight="bold" mb={4}>Heti szállítási rendünk (kedvezményes szállítással):</Text>
                    <Text>📍 <b>Debrecen</b> – Kedd, péntek (12:00–16:00)</Text>
                    <Text>📍 <b>Nyíregyháza</b> – Kedd, szerda, péntek (12:00–18:00)</Text>

                    <Text fontSize="xl" fontWeight="bold" mt={6} mb={2}>További információért vedd fel velünk a kapcsolatot:</Text>
                    <Text>📩 <b>E-mail:</b>  | </Text>
                    <Text>📞 <b>Telefon:</b> </Text>

                    <Text fontSize="lg" fontWeight="bold" mt={6}>Tekintsd meg kínálatunkat, és időzítsd jól a rendelésed, hogy minél hamarabb megkapd!</Text>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default Deliver;