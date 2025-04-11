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
        autoplaySpeed: 5000,
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
        // {
        //     image: '/images/carousel/10.png',
        //     // title: 'Ingyenes szállítás 25.000 Ft felett!',
        //     // subtitle: 'Rendelj most, és élvezd a házhoz szállítás kényelmét',
        //     left: "10",
        //     bottom: '0'
        // },
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
                    index === 0 ? (
                        <Flex
                            className='test'
                            key={index}
                            direction={{ base: "column", md: "row" }}
                            align="center"
                            justify="center"
                            // bg="#c53030"
                            height="500px"
                            px={{ base: 6, md: 16 }}
                        >
                            <Box
                                flex="1"
                                maxW={{base:'70%',md:'45%'}}
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

                            <Box flex="1" textAlign={{ base: "center", md: "left" }} pl={{ md: 12 }}>
                                <Heading fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" mb={4}>
                                    Üdvözöljük!
                                </Heading>
                                <Text fontSize={{base:'md',md:'lg'}} mb={6}>
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
                        // A többi diát hagyjuk a megszokott háttérképes módon
                        <Box
                            key={index}
                            position="relative"
                            width="100%"
                            height="500px"
                            backgroundImage={`url(${card.image})`}
                            backgroundPosition="center"

                            backgroundRepeat="no-repeat"
                        >

                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}

                                zIndex={1}
                            />

                            {/* Tartalom középen, maszkolás felett */}
                            <Box
                                position="relative"
                                zIndex={2}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                textAlign="center"
                                px={{ base: 6, md: 16 }}
                                color="white"
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
                                    mb={6}
                                    fontFamily="'Lora', serif"
                                >
                                    {card.subtitle}
                                </Text>
                                <Button
                                    colorScheme="red"
                                    as={ReactLink}
                                    to="/tesztaink"
                                    size="lg"
                                    fontWeight="bold"
                                    fontSize="lg"
                                    _hover={{ bg: 'red.600' }}
                                >
                                    Fedezd fel kínálatunkat
                                </Button>
                            </Box>
                        </Box>

                    )
                ))}
            </Slider>

        </Box>
    )
}
