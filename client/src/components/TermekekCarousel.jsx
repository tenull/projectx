import {
    Container,
    Wrap,
    IconButton,
    Text,
    Box,
    WrapItem,
    useBreakpointValue,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast,
} from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavorites } from "../redux/actions/userActions";
import { setFavoritesUpdateFlag } from "../redux/slices/user";
import Slider from 'react-slick';
import React, { useEffect } from 'react';
import {
    getProducts,
    resetProductError,
} from '../redux/actions/productActions';


const TermekekCarousel = () => {
    const [slider, setSlider] = React.useState(null);
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.product);
    const { productUpdate } = useSelector((state) => state.product);
    const { favoritesFlag } = useSelector((state) => state.user);
    const toast = useToast();
    const top = useBreakpointValue({ base: '60%', md: '50%' });
    const side = useBreakpointValue({ base: '5px', md: '-30px' });
    const slidesToShow = useBreakpointValue({ base: 1, sm: 1, md: 3, lg: 4 });
    const dotsToShow = useBreakpointValue({ base: false, md: false })
    const settings = {
        dots: dotsToShow,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
    };

    useEffect(() => {
        dispatch(getProducts());
        dispatch(resetProductError());

        if (productUpdate) {
            toast({
                description: 'A termék frissítve lett.',
                status: 'success',
                isClosable: true,
            });
        }
    }, [dispatch, toast, productUpdate]);

    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css";

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css";

        document.head.appendChild(link1);
        document.head.appendChild(link2);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
        };
    }, []);

        useEffect(() => {
            if (favoritesFlag) {
                dispatch(getUserFavorites());
                dispatch(setFavoritesUpdateFlag(false)); 
            }
        }, [favoritesFlag, dispatch]);

    return (
        <Box py={10}>
            <Container px={0} mx={0} my={5} maxW='container.xl'>
                <Wrap justify='center' pt='' pb='10'>
                    <Text fontWeight='semibold' fontSize='3xl'>TÉSZTÁINK</Text>
                </Wrap>
                <Box display='flex' justify='center' position="relative">
                    <IconButton
                        aria-label="left-arrow"
                        variant="ghost"
                        position="absolute"
                        left={side}
                        top={top}
                        transform={'translate(0%, -50%)'}
                        zIndex={1}
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
                        zIndex={1}
                        onClick={() => slider?.slickNext()}>
                        <BiRightArrowAlt size="40px" />
                    </IconButton>
                    <style>
                        {`
                .slick-dots {
                position: relative ;
                margin-top: -20px;
                }
                 @media (max-width: 766px) {
            .slick-dots {
            position: relative ;
              margin-bottom: 15px;
              margin-top: 5px
            }
          }
                `}
                    </style>

                    <Slider {...settings} ref={(slider) => setSlider(slider)} style={{ width: '100%' }}>
                        {error ? (
                            <Alert status='error'>
                                <AlertIcon />
                                <AlertTitle>Sajnáljuk!</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        ) : (
                            products.length > 0 ? (
                                products.slice(-25).map((product) => (
                                    <WrapItem py={2} key={product._id}>
                                        <Center>
                                            <ProductCard product={product} loading={loading} />
                                        </Center>
                                    </WrapItem>
                                ))
                            ) : (
                                <Text textAlign='center'>Nincs elérhető termék.</Text>
                            )
                        )}
                    </Slider>
                </Box>
            </Container>
        </Box>
    );
}

export default TermekekCarousel;
