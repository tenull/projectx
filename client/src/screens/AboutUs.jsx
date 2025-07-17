import { Box,Flex, Container, Text, Breadcrumb, BreadcrumbItem,useBreakpointValue } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";

const AboutUs = () => {
    const blobSvgHeight = useBreakpointValue({ base: "200px", md: "400px" });
    return (
        <Box maxW="8xl" mx="auto" p={{ base: '0', lg: '12' }} minH="8xl">
            <Flex
                borderRadius={{base:'0',md:'10px'}}
                direction="row"
                align="center"
                justify="space-between"
                bg="#EDEDEE"
                px={{ base: 4, md: 16 }}
                py={{ base: 6, md: 0 }}
                height="auto"
                position="relative"
                overflow="hidden"
            >
                {/* Szöveg szekció */}
                <Box
                    flex="1"
                    pr={{ base: 4, md: 12 }}
                    zIndex={1}
                    textAlign="left"
                >
                    <Text
                        fontFamily="'Playfair Display', serif"
                        fontSize={{ base: "2xl", md: "5xl" }}
                        ps={5}
                        lineHeight="1.2"
                        fontWeight="bold"
                        color="gray.800"
                        maxW="100%"
                    >
                        Rólunk
                    </Text>
                </Box>

                {/* Kép szekció */}
                <Box
                    flexShrink={2}
                    width={{ base: "200px", sm: "150px", md: "390px" }}
                    height={{ base: "100px", sm: "100px", md: "300px" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        svg: {
                          height: blobSvgHeight, // csak az SVG-re érvényes
                          width: "auto",   // opcionális: megtartja az arányokat
                          display: "block",
                        }
                      }}
                >
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <clipPath id="blobClip">
                                <path
                                    transform="translate(100 100)"
                                    d="M34.3,-50.7C47.5,-45,63.3,-40.5,73,-30.1C82.7,-19.8,86.3,-3.4,82.4,10.7C78.6,24.8,67.4,36.8,57.1,50.4C46.7,64.1,37.3,79.6,24,84.9C10.8,90.2,-6.4,85.2,-18.9,76.2C-31.4,67.2,-39.3,54,-48.9,42.6C-58.4,31.1,-69.7,21.4,-72,9.9C-74.3,-1.6,-67.7,-14.7,-60.8,-26.8C-53.8,-38.9,-46.5,-49.9,-36.3,-57.1C-26.1,-64.2,-13.1,-67.5,-1.2,-65.6C10.6,-63.7,21.2,-56.5,34.3,-50.7Z"
                                />
                            </clipPath>
                        </defs>
                        <image
                            href="/images/rolunk/LTGy-11.jpg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#blobClip)"
                        />
                    </svg>
                </Box>

                {/* Háttér blob */}
                <Box
                    position="absolute"
                    zIndex={0}
                    top={{base:'0',md:'-30px'}}
                    left="0"
                    width={{ base: "150px", md: "350px" }}
                    height={{ base: "150px", md: "350px" }}
                >
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <path
                            transform="translate(100 100)"
                            fill="#e63e3e"
                            d="M35,-57C48.4,-53,64.3,-49.7,74.9,-40.3C85.4,-30.9,90.6,-15.4,90.7,0.1C90.8,15.6,85.8,31.1,75.3,40.4C64.7,49.7,48.4,52.8,35,60.9C21.5,69,10.7,82.1,-1.7,85.1C-14.2,88.1,-28.3,80.9,-39.5,71.4C-50.6,61.9,-58.7,50.2,-66.7,38C-74.8,25.7,-82.9,12.8,-85.5,-1.5C-88.1,-15.9,-85.3,-31.7,-76.7,-43.2C-68.2,-54.6,-53.9,-61.7,-40.2,-65.5C-26.5,-69.3,-13.2,-70,-1.2,-67.9C10.8,-65.8,21.7,-61,35,-57Z"
                        />
                    </svg>
                </Box>
            </Flex>

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
                                    
                                }}
                            /></Box>
                    </Box>
                </Box>

            </Container>

        </Box>
    );
}

export default AboutUs;