import { Box,  Image, Text, Badge, IconButton, Skeleton, useToast, Tooltip, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

import { addToFavorites, removeFromFavorites } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';
// import { addCartItem } from '../redux/actions/cartActions';
import { useEffect } from 'react';
// import { removeCartItem } from '../redux/actions/cartActions';
import { FaEgg } from 'react-icons/fa6';



const ProductCard = ({ product, loading }) => {
	const dispatch = useDispatch();
	const { favorites } = useSelector((state) => state.user);
	const [, setIsShown] = useState(false);
	const { cartItems } = useSelector((state) => state.cart);
	const cartItem = cartItems.find(item => item.id === product._id);
	const [cartQty, setCartQty] = useState(0);
	const toast = useToast();
	const [cartPlusDisabled, setCartPlusDisabled] = useState(false);
	const { userInfo,  } = useSelector((state) => state.user);

	useEffect(() => {
		if (cartItem) {
			setCartQty(cartItem.qty);
		}

	}, [cartItem]);


	// const handleQtyChange = (e) => {
	// 	let value = parseInt(e.target.value, 10);

	// 	if (value > product.stock) {
	// 		value = product.stock;
	// 		toast({
	// 			description: 'Elérted a maximális készletet.',
	// 			status: 'warning',
	// 			isClosable: true,
	// 		});
	// 	} else if (value < 1 || isNaN(value)) {
	// 		value = 1;
	// 	}

	// 	setCartQty(value);
	// 	dispatch(addCartItem(product._id, value));
	// };

	// const increaseQty = () => {
	// 	if (cartQty < product.stock) {
	// 		const newQty = cartQty + 1;
	// 		setCartQty(newQty);
	// 		dispatch(addCartItem(product._id, newQty));
	// 	} else {
	// 		toast({
	// 			description: 'Nem tudsz többet hozzáadni, nincs elég készlet.',
	// 			status: 'warning',
	// 			isClosable: true,
	// 		});
	// 	}
	// };

	// const decreaseQty = () => {
	// 	if (cartQty > 1) {
	// 		const newQty = cartQty - 1;
	// 		setCartQty(newQty);
	// 		dispatch(addCartItem(product._id, newQty));
	// 	} else {
	// 		setCartQty(0);
	// 		dispatch(removeCartItem(product._id));
	// 	}
	// };



	useEffect(() => {
		const item = cartItems.find((cartItem) => cartItem.id === product._id);
		if (item && item.qty === product.stock) {
			setCartPlusDisabled(true);
		}
	}, [product, cartItems]);

	// const addItem = (id) => {
	// 	if (cartItems.some((cartItem) => cartItem.id === id)) {
	// 		const item = cartItems.find((cartItem) => cartItem.id === id);
	// 		dispatch(addCartItem(id, item.qty + 1));
	// 	} else {
	// 		dispatch(addCartItem(id, 1));
	// 	}
	// 	toast({
	// 		description: 'A tészta hozzá lett adva.',
	// 		status: 'success',
	// 		isClosable: true,
	// 	});
	// };

	const isFavorite = favorites.some(fav => fav._id === product._id);

	const toggleFavorite = () => {
		if (!userInfo) {
			toast({
				description: 'Előbb be kell jelentkezned!',
				status: 'warning',
				isClosable: true,
			});
			return;
		}
		if (isFavorite) {
			dispatch(removeFromFavorites(product._id));
		} else {
			dispatch(addToFavorites(product._id));
		}
	};




	return (
		<Skeleton
			isLoaded={!loading}>
			<Box
				_hover={{ shadow: 'lg', transitionDuration: '0.5s' }}
				position='relative'

				border={cartQty < 1 ? '' : '1px solid red'}
				rounded='md'
				width={{ base: '140px', md: '220px', lg: '250px' }}
				maxW={{ base: '220px', md: '250px' }}
				overflow='hidden'
				p='4'
				shadow='md'>

				<Tooltip label={isFavorite ? "Eltávolítás a kedvencek közül" : "Hozzáadás a kedvencekhez"} hasArrow>
					<IconButton
						icon={isFavorite ? <MdOutlineFavorite size="20px" /> : <MdOutlineFavoriteBorder size="20px" />}
						onClick={toggleFavorite}

						aria-label={isFavorite ? "Eltávolítás a kedvencek közül" : "Hozzáadás a kedvencekhez"}
					/>
				</Tooltip>
				<Tooltip label={`${product.packingOf} tojásos`} placement="top" hasArrow>
					<Box
						position="absolute"
						top={5}
						zIndex={1}
						right="50px"
						borderRadius="full"
						display="flex"
						alignItems="center"
						justifyContent="center"
						boxShadow="lg"
					>
						<Box position="absolute" fontSize={{ base: '3xl', md: '5xl' }} color="yellow.600">
							<FaEgg />
						</Box>
						<Text fontSize={{ base: '', md: 'xl' }} fontWeight="bold" color="white" zIndex="1">
							{product.packingOf}
						</Text>
					</Box>
				</Tooltip>

				{product.productIsNew && (
					<Badge fontSize='lg' color='white' position='absolute' rounded='lg' right={1} top={1} ml='2' bg='red.500'>
						új
					</Badge>
				)}
				<Box
					as={ReactLink}
					to={`/teszta/${product._id}`}
				>
					<Box display='flex' justifyContent='center'>
						<Image
							filter=' drop-shadow(4px 4px 4px rgba(0, 0, 0, .45));'
							onMouseEnter={() => setIsShown(true)}
							onMouseLeave={() => setIsShown(false)}
							src={product.image}
							fallbackSrc='https://placehold.co/400'
							alt={product.name}
							height={{ base: '100px', md: '200px' }}
						/>
					</Box>
					{product.stock <= 0 ? (
						<Badge alignSelf="flex-start" colorScheme="red">Elfogyott</Badge>
					) : product.stock - (cartItems.find(item => item.id === product._id)?.qty || 0) <= 0 ? (
						<Badge alignSelf="flex-start" colorScheme="red">Elfogyott</Badge>
					) : product.stock < 5 ? (
						<Badge alignSelf="flex-start" colorScheme="yellow">Csak {product.stock - (cartItems.find(item => item.id === product._id)?.qty || 0)} db maradt</Badge>
					) : (
						<Badge alignSelf="flex-start" colorScheme="green">raktáron</Badge>
					)}
					{/* <Text textAlign='center' noOfLines={2} fontSize='sm' mt='2' mb={-2}>
					{product.packing}
				</Text> */}
					{/* <Text textAlign='center' noOfLines={2} fontSize='sm' mt='2' mb={-2}>
					{product.packingOf} Tojásos
				</Text> */}
					<Text mt={2} h='30px' textAlign='center' noOfLines={2} fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} fontFamily="Poppins" fontWeight='semibold'>
						{product.name}
					</Text>
					<Text textAlign="center" noOfLines={1} fontFamily="Poppins" fontSize="md" color="gray.600">
						{product.packaking < 1 ? product.packaking * 1000 + "g" : product.packaking + "kg"}
					</Text>

					{/* <Flex justify='center' alignItems='center' mt='2'>
						<Text textAlign='center' fontSize="sm" fontFamily="Poppins" fontWeight='semibold' color='red.600'>
							{product.price} Ft
						</Text>
					</Flex> */}
				</Box>
				{/* <Flex justify='center' mt='2'>
					{cartQty > 0 ? (
						<Flex alignItems='center'  >
							<Button
								colorScheme='red'
								size='md'
								onClick={decreaseQty}
							>
								{cartQty < 2 ? <FaTrashCan fontSize='12' /> : '-'}
							</Button>
							<Input
								type="number"
								value={cartQty}
								onChange={handleQtyChange}
								max={product.stock}
								min={1}
								border={0}
								_focus={{
									borderColor: "red",
									boxShadow: "0 0 0 2px red",
								}}
								width="60px"
								mx="2"
								textAlign="center"
								fontSize="lg"
							/>

							<Button
								colorScheme='red'
								size='md'
								onClick={increaseQty}
								isDisabled={cartQty >= product.stock}
								backgroundColor={cartQty >= product.stock ? 'red.200' : 'red.500'}
								_hover={{
									backgroundColor: cartQty >= product.stock ? 'red.200' : 'red.400',
								}}
								opacity={cartQty >= product.stock ? 0.7 : 1}
								cursor={cartQty >= product.stock ? 'not-allowed' : 'pointer'}
							>
								+
							</Button>

						</Flex>
					) : (

						<Tooltip
							isDisabled={!cartPlusDisabled}
							hasArrow
							label={
								!cartPlusDisabled
									? 'You reached the maximum quantity jof the product. '
									: product.stock <= 0
										? 'Out of stock'
										: ''
							}>
							<Button
								w='100%'
								colorScheme='red'
								isDisabled={product.stock <= 0 || cartPlusDisabled}
								onClick={() => addItem(product._id)}
							>


								<TbShoppingCartPlus size='20' />
								Kosárba


							</Button>
						</Tooltip>
					)}
				</Flex> */}
				<Button
					w='100%'
					colorScheme='red'
					isDisabled={product.stock <= 0 || cartPlusDisabled}
					as={ReactLink}
					to={`/teszta/${product._id}`}
				>



					Megnézem


				</Button>
			</Box>
		</Skeleton>
	);
};

export default ProductCard;
