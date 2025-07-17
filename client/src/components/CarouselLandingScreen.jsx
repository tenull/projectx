'use client'

import React from 'react'
import {
    Box,
    IconButton,
    useBreakpointValue,
    Heading,
    Text,
    Button,
    Flex,
    Image
} from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'
import { Link as ReactLink } from 'react-router-dom'

export default function CaptionCarousel() {
    const [slider, setSlider] = React.useState(null)

    const top = useBreakpointValue({ base: '50%', md: '50%' })
    const side = useBreakpointValue({ base: '10px', md: '40px' })

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 600,
        autoplaySpeed: 55550000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const cards = [
        {
            image: '/images/carousel/laskod.jpg',
            title: 'Friss, házias tészta',
            subtitle: 'Kézzel készült, válogatott alapanyagokból',
            right: 10,
            bottom: 10
        },
        {
            image: '/images/rolunk/LTGy-42.jpg',
            // title: 'Ingyenes szállítás 25.000 Ft felett!',
            // subtitle: 'Rendelj most, és élvezd a házhoz szállítás kényelmét',
            left: "10",
            bottom: '0'
        },
    ]

    return (
        <Box position={'relative'} width="100%" h={{base:'550px',md:'500px'}} overflow="hidden">
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            {/* Balra nyíl */}
            <IconButton
                aria-label="left-arrow"
                variant="unstyled"
                position="absolute"
                left={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickPrev()}
                _hover={{ opacity: 0.8 }}
            >
                <BiLeftArrowAlt color="white" size="50px" />
            </IconButton>

            {/* Jobbra nyíl */}
            <IconButton
                aria-label="right-arrow"
                variant="unstyled"
                position="absolute"
                right={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickNext()}
                _hover={{ opacity: 0.8 }}
            >
                <BiRightArrowAlt color="white" size="50px" />
            </IconButton>


            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {cards.map((card, index) => (
                    index === 0 ? (
                        <Flex
                            // border='1px solid red'
                            borderRadius={{base:'0',md:'10px'}}
                            className='test'
                            key={index}
                            direction={{ base: "column", md: "row" }}
                            align="center"
                            position='relative'
                            justify="center"
                            bg="#EDEDEE"
                            px={{ base: 6, md: 16 }}
                        >
                            <Box
                                flex="1"
                                maxW={{ base: '70%', md: '45%' }}
                                height="100%"
                                display='flex'
                                sx={{ svg: { display: 'block' } }}
                                zIndex={1}
                            >
                                <svg
                                    style={{ display: 'block' }}
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
                                                d="M35,-57C48.4,-53,64.3,-49.7,74.9,-40.3C85.4,-30.9,90.6,-15.4,90.7,0.1C90.8,15.6,85.8,31.1,75.3,40.4C64.7,49.7,48.4,52.8,35,60.9C21.5,69,10.7,82.1,-1.7,85.1C-14.2,88.1,-28.3,80.9,-39.5,71.4C-50.6,61.9,-58.7,50.2,-66.7,38C-74.8,25.7,-82.9,12.8,-85.5,-1.5C-88.1,-15.9,-85.3,-31.7,-76.7,-43.2C-68.2,-54.6,-53.9,-61.7,-40.2,-65.5C-26.5,-69.3,-13.2,-70,-1.2,-67.9C10.8,-65.8,21.7,-61,35,-57Z"
                                            />
                                        </clipPath>
                                    </defs>
                                    <image
                                        style={{ display: 'block' }}
                                        href={card.image}
                                        width="100%"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        clipPath="url(#blobClip)"
                                    />
                                </svg>
                            </Box>
                            <Box
                                display={{ base: 'none', md: 'block' }}
                                position="absolute"
                                bottom="-10"
                                right="-4"
                                width="250px"
                                height="250px"
                                zIndex={2}
                            >
                                <svg
                                    style={{ display: 'block' }}
                                    viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                >
                                    <path
                                        transform="translate(100 100)"
                                        fill="#e63e3e" // piros
                                        d="M35,-57C48.4,-53,64.3,-49.7,74.9,-40.3C85.4,-30.9,90.6,-15.4,90.7,0.1C90.8,15.6,85.8,31.1,75.3,40.4C64.7,49.7,48.4,52.8,35,60.9C21.5,69,10.7,82.1,-1.7,85.1C-14.2,88.1,-28.3,80.9,-39.5,71.4C-50.6,61.9,-58.7,50.2,-66.7,38C-74.8,25.7,-82.9,12.8,-85.5,-1.5C-88.1,-15.9,-85.3,-31.7,-76.7,-43.2C-68.2,-54.6,-53.9,-61.7,-40.2,-65.5C-26.5,-69.3,-13.2,-70,-1.2,-67.9C10.8,-65.8,21.7,-61,35,-57Z"
                                    />
                                </svg>
                            </Box>

                            <Box flex="1" textAlign={{ base: "center", md: "left" }} pl={{ md: 12 }}>
                                <Heading
                                    fontFamily="'Playfair Display', serif"
                                    fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                                    fontWeight="bold"
                                    mb={4}
                                    color="gray.800"
                                >
                                    Üdvözöljük!
                                </Heading>

                                <Text
                                    fontFamily="'Inter', sans-serif"
                                    fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                                    lineHeight="1.8"
                                    mb={6}
                                    color="gray.700"
                                    maxW="600px"
                                    textAlign='justify'
                                >
                                      A Nyír-Aranytojás Kft. több mint 25 éve gyártja Laskod községben a jól
                                    ismert Laskodi Száraztésztákat. Családi vállalkozásként indultunk, azóta is
                                    ebben a formában gyártjuk a házias jellegű tésztáinkat.
                                </Text>
                                <Button
                             
                                    colorScheme="red"
                                    as={ReactLink}
                                    to="/rolunk"
                                    size="lg"
                                    fontWeight="bold"
                                    fontSize="lg"
                                    _hover={{ bg: 'red.600' }}
                                >
                                    Rólunk
                                </Button>
                            </Box>
                        </Flex>
                    ) : (
                        <Box></Box>
                        // <Flex
                        //     borderRadius='10px'
                        //     className='test'
                        //     key={index}
                        //     direction={{ base: "column", md: "row" }}
                        //     align="center"
                        //     position='relative'
                        //     justify="center"
                        //     bg="#EDEDEE"
                        //     height="550px"
                        //     px={{ base: 6, md: 16 }}
                        // >
                        //     <Box flex="1" zIndex={2} textAlign={{ base: "center", md: "left" }} pl={{ md: 12 }}>
                        //         <Heading
                        //             fontFamily="'Playfair Display', serif"
                        //             fontSize={{ base: '2xl', md: '3xl' }}
                        //             fontWeight="semibold"
                        //             mb={2}
                        //             color="white"
                        //         >
                        //             NYÍR-ARANYTOJÁS KFT.
                        //         </Heading>

                        //         <Text
                        //             fontFamily="'Playfair Display', serif"
                        //             fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                        //             lineHeight="1.2"
                        //             fontWeight="bold"
                        //             color="gray.800"
                        //             maxW="600px"
                        //         >
                        //             Hazai alapanyagokból készült házi jellegű tészták
                        //         </Text>
                        //     </Box>
                        //     <Box
                        //         flex="1"
                        //         maxW={{ base: '70%', md: '45%' }}
                        //         height="100%"
                        //         display='flex'
                        //         sx={{ svg: { display: 'block' } }}
                        //         zIndex={1}
                        //     >
                        //         <svg
                        //             style={{ display: 'block' }}
                        //             viewBox="0 0 200 200"
                        //             xmlns="http://www.w3.org/2000/svg"
                        //             width="100%"
                        //             height="100%"
                        //             preserveAspectRatio="xMidYMid slice"
                        //         >
                        //             <defs>
                        //                 <clipPath id="blobClip">
                        //                     <path
                        //                         transform="translate(100 100)"
                        //                         d="M34.3,-50.7C47.5,-45,63.3,-40.5,73,-30.1C82.7,-19.8,86.3,-3.4,82.4,10.7C78.6,24.8,67.4,36.8,57.1,50.4C46.7,64.1,37.3,79.6,24,84.9C10.8,90.2,-6.4,85.2,-18.9,76.2C-31.4,67.2,-39.3,54,-48.9,42.6C-58.4,31.1,-69.7,21.4,-72,9.9C-74.3,-1.6,-67.7,-14.7,-60.8,-26.8C-53.8,-38.9,-46.5,-49.9,-36.3,-57.1C-26.1,-64.2,-13.1,-67.5,-1.2,-65.6C10.6,-63.7,21.2,-56.5,34.3,-50.7Z"
                        //                     />
                        //                 </clipPath>
                        //             </defs>
                        //             <image
                        //                 style={{ display: 'block' }}
                        //                 href={card.image}
                        //                 width="100%"
                        //                 height="100%"
                        //                 preserveAspectRatio="xMidYMid slice"
                        //                 clipPath="url(#blobClip)"
                        //             />
                        //         </svg>
                        //     </Box>
                        //     <Box
                        //         display={{ base: 'block', md: 'block' }}
                        //         position="absolute"
                        //         top={{base:'-30px',md:'-150px'}}
                        //         left={{base:'50px',md:'-30px'}}
                        //         width={{base:'300px',md:'550px'}}
                        //         height={{base:'300px',md:'550px'}}
                        //         zIndex={1}
                        //     >
                        //         <svg
                        //             style={{ display: 'block' }}
                        //             viewBox="0 0 200 200"
                        //             xmlns="http://www.w3.org/2000/svg"
                        //             width="100%"
                        //             height="100%"
                        //             preserveAspectRatio="xMidYMid slice"
                        //         >
                        //             <path
                        //                 transform="translate(100 100)"
                        //                 fill="#e63e3e"
                        //                 d="M35,-57C48.4,-53,64.3,-49.7,74.9,-40.3C85.4,-30.9,90.6,-15.4,90.7,0.1C90.8,15.6,85.8,31.1,75.3,40.4C64.7,49.7,48.4,52.8,35,60.9C21.5,69,10.7,82.1,-1.7,85.1C-14.2,88.1,-28.3,80.9,-39.5,71.4C-50.6,61.9,-58.7,50.2,-66.7,38C-74.8,25.7,-82.9,12.8,-85.5,-1.5C-88.1,-15.9,-85.3,-31.7,-76.7,-43.2C-68.2,-54.6,-53.9,-61.7,-40.2,-65.5C-26.5,-69.3,-13.2,-70,-1.2,-67.9C10.8,-65.8,21.7,-61,35,-57Z"
                        //             />
                        //         </svg>
                        //     </Box>


                        // </Flex>

                    )
                ))}
            </Slider>

        </Box>
    )
}
