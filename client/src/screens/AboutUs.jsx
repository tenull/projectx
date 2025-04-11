import { Box, Center, Container, Text,Breadcrumb,BreadcrumbItem } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";

const AboutUs = () => {
    return (
        <Box maxW="8xl" mx="auto" p={{ base: '0', lg: '12' }} minH="6xl">
            <Center
                height={{ base: '200px', md: '300px' }}
                backgroundColor="red.600"
                color="white"
                position="relative"
                backgroundImage={`linear-gradient(rgb(51, 51, 51, 0.7), #c53030),/images/pastalogo2.jpg`}
                backgroundPosition="20% 30%"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="bold"
                textAlign="center"
            >
                Rólunk
            </Center>
            <Breadcrumb ms={2} mt={3} fontSize={{ base: 'xs', md: 'sm' }} spacing={{ base: '3px', md: '8px' }} separator={<ChevronRightIcon color='gray.400' />}>
                <BreadcrumbItem>
                    <ReactLink to='/'>Főoldal</ReactLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <ReactLink to='/rolunk'>Rólunk</ReactLink>
                </BreadcrumbItem>

            </Breadcrumb>

            <Container fontFamily='Poppins' maxW='container.xl' maxH={{ md: '800px' }} py={10} >
                <Box position='relative' display='flex'>


                    <Box width={{ base: "100%", md: "50%" }} minW={{ base: '100%', md: '500px' }} display='flex' flexDirection='column' alignItems='center' px={4}>
                        <Text textAlign={{ base: 'justify', md: 'justify' }} fontSize={{ base: 'lg', md: 'xl' }} mb={{ base: '3', md: '10' }}>
                            A Nyír-Aranytojás Kft. több mint 25 éve gyártja Laskod községben a jól ismert Laskodi Száraztésztákat.Családi vállalkozásként indultunk, azóta is ebben a formában gyártjuk a házias jellegű tésztáinkat.
                        </Text>
                        <Box
                            mb={3}
                            display={{ base: 'flex', md: 'none' }}
                            justifyContent='center'
                            boxShadow='dark-lg'
                            backgroundImage={`url(../images/rolunk/LTGy-65.jpg)`}
                            backgroundPosition='center'
                            backgroundSize='cover'
                            width='300px'
                            height='400px'
                            border='15px solid white'
                        />
                        <Text textAlign={{ base: 'justify', md: 'justify' }} fontSize={{ base: 'lg', md: 'xl' }} mb={{ base: '3', md: '10' }}>
                            Kezdettől azt tartottuk a legfontosabbnak, hogy megőrizzük azt a minőséget, amit hajdan szüleink házilag készítettek. Kizárólag hazai piacról beszerzett minőségi, friss tyúktojást és BFF 55 Réteslisztet használunk a gyártás folyamán.
                        </Text>
                        <Box
                            mb={3}
                            display={{ base: 'flex', md: 'none' }}
                            boxShadow='dark-lg'
                            backgroundImage={`url(../images/rolunk/LTGy-31.jpg)`}
                            backgroundPosition='center'
                            backgroundSize='cover'
                            width='300px'
                            height='400px'
                            border='15px solid white'
                        />
                        <Text textAlign={{ base: 'justify', md: 'justify' }} fontSize={{ base: 'lg', md: 'xl' }} mb={3}>
                            Ezen alapanyagok felhasználásával készített száraztészták, kifőzés után, a háromszorosukat adják vissza. 1 kg száraztésztából 3kg főtt tésztát kapunk, amit készételként fogyaszthatunk. a BL 55 Búzalisztből készült száraztészták nem tudják visszaadni csak a kétszeres mennyiséget. Ezt azért tartom fontosnak megjegyezni a kedves vásárlóink felé, hogy van lehetőségük ár-érték alapján is dönteni!
                        </Text>
                        <Box
                            mb={3}
                            display={{ base: 'block', md: 'none' }}
                            boxShadow='dark-lg'
                            backgroundImage={`url(../images/rolunk/LTGy-42.jpg)`}
                            backgroundPosition='center'
                            backgroundSize='cover'
                            width='300px'
                            height='400px'
                            border='15px solid white'
                        />
                    </Box>
                    <Box width={{ base: "100%", md: "50%" }} display={{ base: 'none', md: 'block' }} position='relative'>
                        <Box>
                            <Box
                            filter="auto" dropShadow="0px 0px 10px rgba(0, 0, 0, 0.5)" 
                                backgroundImage={`url(../images/rolunk/LTGy-31.jpg)`}
                                backgroundPosition="center"
                                backgroundSize="cover"
                                width="300px"
                                height="400px"
                                position="relative"
                                top="-50px"
                                right="-150px"
                                border="15px solid white"
                                transform="rotate(3deg)"
                                sx={{
                                    imageRendering: "auto",
                                    WebkitImageRendering: "optimize-contrast",
                                    imageRendering: "smooth"
                                }}
                            /></Box>
                        <Box>
                            <Box
                            filter="auto" dropShadow="0px 0px 10px rgba(0, 0, 0, 0.5)" 
                                backgroundImage={`url(../images/rolunk/LTGy-42.jpg)`}
                                backgroundPosition='center'
                                backgroundSize='cover'
                                width='300px'
                                height='400px'
                                position='relative'
                                top='-200px'
                                right='-100px'
                                border='15px solid white'
                                transform='rotate(-10deg)'
                                sx={{
                                    imageRendering: "auto",
                                    WebkitImageRendering: "optimize-contrast",
                                    imageRendering: "smooth"
                                }}

                            /></Box>
                        <Box>
                            <Box
                               filter="auto" dropShadow="0px 0px 10px rgba(0, 0, 0, 0.5)" 
                                backgroundImage={`url(../images/rolunk/LTGy-17.jpg)`}
                                backgroundPosition='center'
                                backgroundSize='cover'
                                width='300px'
                                height='400px'
                                position='relative'
                                top='-500px'
                                right='-250px'
                                border='15px solid white'
                                transform='rotate(3deg)'
                                sx={{
                                    imageRendering: "auto",
                                    WebkitImageRendering: "optimize-contrast",
                                    imageRendering: "smooth"
                                }}
                            /></Box>
                    </Box>
                </Box>

            </Container>

        </Box>
    );
}

export default AboutUs;