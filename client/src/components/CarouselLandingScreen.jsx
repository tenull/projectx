'use client'

import React from 'react'
import {
    Box,
    IconButton,
    useBreakpointValue,
    useColorMode as mode,
    Stack,
    Heading,
    Text,
    Container,
} from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'
import { GiTakeMyMoney, } from 'react-icons/gi'
import { TbTruckDelivery } from 'react-icons/tb'
// Settings for the slider


export default function CaptionCarousel() {
    const [slider, setSlider] = React.useState(null)

    const top = useBreakpointValue({ base: '60%', md: '50%' })
    const side = useBreakpointValue({ base: '10px', md: '40px' })

    const slidesToShow = useBreakpointValue({ base: 1, md: 1 })
    const dotsToShow = useBreakpointValue({base:false,md:true})
    const settings = {
    dots: dotsToShow,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: slidesToShow, 
    slidesToScroll: 1,
}

    const cards = [ 
        {
            image: '/images/mikulasposter.jpeg',
        },
        {
            image: '/images/Facebookpost2.jpeg',
        },
    ];

    return (
        <Box position={'relative'}  >
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

            <IconButton
                aria-label="left-arrow"
                variant="ghost"
                position="absolute"
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickPrev()}>
                <BiLeftArrowAlt size="40px" />
            </IconButton>
            <IconButton
                aria-label="right-arrow"
                variant="ghost"
                position="absolute"
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickNext()}>
                <BiRightArrowAlt size="40px" />
            </IconButton>
            <style>
              
            </style>

            <Slider   {...settings} ref={(slider) => setSlider(slider)}>
                {Array.isArray(cards) && cards.map((card, index) => (
                    <Box
                    
                        key={index}
                        height={{ base: '400px', md: '500px' }} 
                        position="relative"
                        backgroundPosition='bottom'
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        // backgroundImage={`url(${card.image})`} 
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Container size="container.xl"position="relative">
                            <Stack
                                spacing={3}
                                width={{base:'100%',md:'100vw'}}
                                height={{base:'400px', md:'500px'}}
                                textAlign="center"
                                backgroundColor="red.600" 
                                backgroundImage={`url(${card.image})`} 
                                backgroundPosition="center"
                                backgroundRepeat="no-repeat"
                                backgroundSize="cover"
                                padding="20px"
                                rounded="10px"
                            >
                                <Heading display={'flex'} justifyContent={'center'} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} color="white">
                                    {card.title}
                                </Heading>
                                <Heading display={'flex'} justifyContent={'center'} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} color="white">
                                    {card.title2}
                                </Heading>
                                <Text fontSize={{ base: 'md', lg: 'lg' }} color="white">
                                    {card.text}
                                </Text>
                            </Stack>
                        </Container>
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}
