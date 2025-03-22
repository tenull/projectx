import { Box, Container, Text } from "@chakra-ui/react";
import { TbEggs } from "react-icons/tb";
import { FaTemperatureFull, FaHandshake } from "react-icons/fa6";
import { PiSealCheckBold } from "react-icons/pi";
import { GiHungary } from "react-icons/gi";

const Szolgaltatas = () => {
    return (
        <Box >
        <Container maxW="container.xl">

            {/* <Box height='100px' display='flex' flexDirection={{base:'column',md:'row'}} justifyContent='center' my={6}>
                <Text
                w={{base:'100%',md:'450px'}}
                textAlign={{base:'center',md:'end'}}
                    data-aos="fade-right"
                    // textAlign="center"
                    fontSize={{ base: 'xl', md: '3xl' }}
                    fontFamily="Montserrat,sans-serif"
                    fontWeight="600"
                    color="gray.800"
                >
                    SZOLGÁLTATÁSAINK
                </Text>
                <Text
                    display={{base:'none',md:'block'}}
                    fontSize={{ base: 'md', md: 'md' }}
                    fontFamily="Montserrat,sans-serif"
                    fontWeight="800"
                    color="gray.800"
                    border='solid'
                    borderWidth='0px 3px 0px'
                    borderColor='red.800'
                    transform='rotate(20deg)'
                    me='5'
                />
                <Text
                textIndent='10px'
                    maxW='450px'
                    data-aos="fade-left"
                    // textAlign="center"
                    fontSize={{ base: 'md', md: '2xl' }}
                    fontFamily="Montserrat,sans-serif"
                    fontWeight={{base:'300',md:'600'}}
                    textAlign={{base:'center',md:'start'}}
                    color="gray.800"
                    lineHeight={1}
                    alignSelf="flex-end"
                >
                    MINŐSÉG, FRISSESSÉG ÉS HAGYOMÁNY
                </Text>
            </Box> */}

            <Box
               

                display="flex" justifyContent={{ base: 'space-between', md: 'space-evenly' }} flexWrap="wrap" gap={1} py={3}>
                {/* Minden doboz 45%-os szélességet kap */}
                <Box
                    display="flex"
                    alignItems="center"
                    p={{ base: '0', md: '5' }}
                    rounded="lg"
                    minW={{ base: '345px', md: '465px' }}
                    flexBasis={{ base: "100%", md: "45%" }}
                    maxW="45%"
                    _hover={{
                        '& > div:first-of-type': {
                            boxShadow: "0 0 0 3px white, 0 0 0 7px #822727",
                            transition: "all 0.3s ease",
                            bg: 'red.800'
                        }
                    }}
                >
                    <Box minW={{ base: '65px', md: '65px' }} me={4} display="flex" justifyContent="center" alignItems="center" width="70px" height="70px" bg="red.600" rounded="5px">
                        <TbEggs size="40px" color="white" />
                    </Box>
                    <Box minW={{ base: '250px', md: '400px' }}>
                        <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={2}>
                            Friss, pasztőrözött tyúktojásléből készült tészták
                        </Text>
                        <Text color="gray.600" fontSize="md">
                            A frissesség és a minőség garanciája, kizárólag hazai alapanyagokból.
                        </Text>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    p={{ base: '0', md: '5' }}
                    rounded="lg"
                    minW={{ base: '345px', md: '465px' }}
                    flexBasis={{ base: "100%", md: "45%" }}
                    maxW="45%"
                    _hover={{
                        '& > div:first-of-type': {
                            boxShadow: "0 0 0 3px white, 0 0 0 7px #822727",
                            transition: "all 0.3s ease",
                            bg: 'red.800'
                        }
                    }}
                >
                    <Box minW='65px' me={4} display="flex" justifyContent="center" alignItems="center" width="70px" height="70px" bg="red.600" rounded="5px">
                        <FaTemperatureFull size="40px" color="white" />
                    </Box>
                    <Box minW={{ base: '250px', md: '400px' }}>
                        <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={2}>
                            Magas hőmérsékletű szárítórendszer
                        </Text>
                        <Text color="gray.600" fontSize="md">
                            Korszerű technológia a maximális biztonság és az állandó minőség érdekében.
                        </Text>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    p={{ base: '0', md: '5' }}
                    rounded="lg"
                    minW={{ base: '300px', md: '465px' }}
                    flexBasis={{ base: "100%", md: "45%" }}
                    maxW="45%"
                    _hover={{
                        '& > div:first-of-type': {
                            boxShadow: "0 0 0 3px white, 0 0 0 7px #822727",
                            transition: "all 0.3s ease",
                            bg: 'red.800'
                        }
                    }}
                >
                    <Box minW='65px' me={4} display="flex" justifyContent="center" alignItems="center" width="70px" height="70px" bg="red.600" rounded="5px">
                        <PiSealCheckBold size="40px" color="white" />
                    </Box>
                    <Box minW={{ base: '250px', md: '400px' }}>
                        <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={2}>
                            Minőségellenőrzött termékek
                        </Text>
                        <Text color="gray.600" fontSize="md">
                            Folyamatos minőség-ellenőrzés akkreditált laboratóriumi körülmények között.
                        </Text>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    p={{ base: '0', md: '5' }}
                    rounded="lg"
                    minW={{ base: '300px', md: '465px' }}
                    flexBasis={{ base: "100%", md: "45%" }}
                    maxW="45%"
                    _hover={{
                        '& > div:first-of-type': {
                            boxShadow: "0 0 0 3px white, 0 0 0 7px #822727",
                            transition: "all 0.3s ease",
                            bg: 'red.800'
                        }
                    }}
                >
                    <Box transition="all 0.3s ease" minW='65px' me={4} display="flex" justifyContent="center" alignItems="center" width="70px" height="70px" bg="red.600" rounded="5px">
                        <GiHungary size="40px" color="white" />
                    </Box>
                    <Box minW={{ base: '250px', md: '400px' }}>
                        <Text fontWeight="bold" fontSize="lg" color="gray.800" mb={2}>
                            Hazai alapanyagokból készült házias jellegű tészták
                        </Text>
                        <Text color="gray.600" fontSize="md">
                            Hazai alapanyagokból készült, hagyományos ízeket idéző száraztészták.
                        </Text>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    p={{ base: '0', md: '5' }}
                    rounded="lg"
                    minW={{ base: '300px', md: '465px' }}
                    flexBasis={{ base: "100%", md: "45%" }}
                    maxW="45%"
                    _hover={{
                        '& > div:first-of-type': {
                            boxShadow: "0 0 0 3px white, 0 0 0 7px #822727",
                            transition: "all 0.3s ease",
                            bg: 'red.800'
                        }
                    }}
                >
                    <Box
                        minW="65px"
                        me={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="70px"
                        height="70px"
                        bg="red.600"
                        rounded="5px"
                        transition="all 0.3s ease"
                    >
                        <FaHandshake size="40px" color="white" />
                    </Box>
                    <Box minW={{ base: '250px', md: '400px' }}>
                        <Text
                            fontWeight="bold"
                            fontSize="lg"
                            color="gray.800"
                            mb={2}
                            transition="all 0.3s ease"
                        >
                            Kiváló partnerkapcsolatok
                        </Text>
                        <Text color="gray.600" fontSize="md">
                            Hosszú távú, korrekt együttműködés ügyfeleinkkel és szállítóinkkal.
                        </Text>
                    </Box>
                </Box>

            </Box>
        </Container>
        </Box>
    );
}

export default Szolgaltatas;
