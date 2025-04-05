'use client'

import React from 'react'
import {
    Box,
    IconButton,
    useBreakpointValue,
    Heading,
    Text,
    Button,
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
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const cards = [
        {
            image: '/images/pastalogo2.jpg',
            title: 'Friss, házias tészta',
            subtitle: 'Kézzel készült, válogatott alapanyagokból',
            right: '',
            left: ''
        },
        {
            image: '/images/pastalogo3.jpg',
            title: 'Minőség minden tányéron',
            subtitle: 'Ellenőrzött forrásból, tradícióval készítve',
            right: '',
            left: ''
        },
        {
            image: '/images/pastalogo5.png',
            // title: 'Ingyenes szállítás 25.000 Ft felett!',
            // subtitle: 'Rendelj most, és élvezd a házhoz szállítás kényelmét',
            // right:'',
            // left:''
        },
        {
            image: '/images/pastalogo6.png',
            // title: 'Ingyenes szállítás 25.000 Ft felett!',
            // subtitle: 'Rendelj most, és élvezd a házhoz szállítás kényelmét',
            // right:'',
            // left:''
        },
    ]

    return (
        <Box position={'relative'} width="100%" height="500px" overflow="hidden">
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
                    <Box
                        key={index}
                        position="relative"
                        width="100%"
                        height="500px"
                        backgroundImage={`url(${card.image})`}
                        backgroundPosition="center"
                        backgroundSize="cover"
                        backgroundRepeat="no-repeat"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        px={{ base: 6, md: 16 }}
                    >
                        <Box
                            color="white"
                            textAlign="center"
                            // bg="rgba(0, 0, 0, 0.6)"
                            p={6}
                            borderRadius="lg"
                        >
                            <Heading
                                fontSize={{ base: '3xl', md: '5xl' }}
                                fontWeight="bold"
                                fontFamily="'Playfair Display', serif"
                                mb={4}
                                lineHeight="1.2"
                            >
                                {card.title}
                            </Heading>
                            <Text
                                fontSize={{ base: 'lg', md: 'xl' }}
                                fontWeight="medium"
                                maxW="600px"
                                mx="auto"
                                mb={6}
                                fontFamily="'Lora', serif"
                            >
                                {card.subtitle}
                            </Text>
                            {index !== 3 && index !==2 && ( 
                                <Button
                                    colorScheme="red"
                                    as={ReactLink}
                                    to='/tesztaink'
                                    size="lg"
                                    fontWeight="bold"
                                    fontSize="lg"
                                    _hover={{ bg: 'red.600' }}
                                >
                                    Fedezd fel kínálatunkat
                                </Button>
                            )}

                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}
