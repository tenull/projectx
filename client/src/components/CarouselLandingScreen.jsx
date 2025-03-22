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
    const dotsToShow = useBreakpointValue({base:false,md:false})
    const settings = {
    dots: dotsToShow,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 500000,
    slidesToShow: slidesToShow, 
    slidesToScroll: 1,
}

    const cards = [ 
        {
            image: '/images/pastalogo3.jpg',
            title: 'Laskodi tészta',
            title2:'Tekintsd meg 4 és 8 tojásos tésztáinkat'
        },
        {
            image: '/images/pastalogo2.jpg',
            title: 'Laskodi tészta',
             title2:'Minőség megfizethető áron'
        },
        {
            image: '/images/pastalogo4.jpg',
            title: 'Laskodi tészta',
            title2:'25.000 Ft felett ingyenes kiszállítás az ország bármelyik területére'
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
                variant='outline'
                _hover={{variant:'none'}}
                position="absolute"
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={1}
                onClick={() => slider?.slickPrev()}>
                <BiLeftArrowAlt color='white' size="40px" />
            </IconButton>
            <IconButton
                aria-label="right-arrow"
                variant='outline'
                _hover={{variant:'none'}}
                position="absolute"
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={1}
                onClick={() => slider?.slickNext()}>
                <BiRightArrowAlt color='white' size="40px" />
            </IconButton>
            <style>
              
            </style>

            <Slider   {...settings} ref={(slider)  => setSlider(slider)} style={{ height: '500px' }}>
                {Array.isArray(cards) && cards.map((card, index) => (
                    <Box
                    
                        key={index}
                        position="relative"
                        // backgroundImage={`url(${card.image})`} 
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                            <Box
                                spacing={3}
                                width={{base:'100%',md:'100%'}}
                                height={{base:'400px', md:'500px'}}
                                textAlign="center"
                                backgroundColor="red.600" 
                                backgroundImage={`url(${card.image})`} 
                                backgroundPosition="center"
                                backgroundSize='cover'
                                backgroundRepeat="no-repeat"
                                padding="20px"
                                rounded="10px"
                            >
                                <Heading display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontFamily='Pacifico, cursive' color="white">
                                    {card.title}
                                </Heading>
                                <Heading display={'flex'} justifyContent={'center'} fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontFamily='Pacifico, cursive' color="white">
                                    {card.title2}
                                </Heading>
                                <Text fontSize={{ base: 'md', lg: 'lg' }} color="white">
                                    {card.text}
                                </Text>
                            </Box>
                      
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}
