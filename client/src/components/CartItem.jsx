import { CloseButton, Button, Input, Flex, Image, Select, Spacer, Text, VStack, useColorModeValue as mode } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';
import { FaTrashCan } from 'react-icons/fa6';
import { useToast } from '@chakra-ui/react';
const CartItem = ({ cartItem }) => {
	const { name, image, price, stock, qty, id, brand,packaking } = cartItem;
	const dispatch = useDispatch();
	const toast = useToast()
	

	const handleQtyChange = (id, stock, value) => {
		let newQty = parseInt(value, 10);

		if (newQty > stock) {
			newQty = stock;
			toast({
				description: 'Elérted a maximális készletet.',
				status: 'warning',
				isClosable: true,
			});
		} else if (newQty < 1 || isNaN(newQty)) {
			newQty = 1;
		}

		dispatch(addCartItem(id, newQty));
	};

	const increaseQty = (id, stock, qty) => {
		if (qty < stock) {
			dispatch(addCartItem(id, qty + 1));
		} else {
			toast({
				description: 'Nem tudsz többet hozzáadni, nincs elég készlet.',
				status: 'warning',
				isClosable: true,
			});
		}
	};

	const decreaseQty = (id, qty) => {
		if (qty > 1) {
			dispatch(addCartItem(id, qty - 1));
		} else {
			dispatch(removeCartItem(id));
		}
	};


	return (
		<Flex minWidth='300px' borderBottom='1px solid gray' py={4} align='center'>

			<Image rounded='lg' w='120px' h='120px' fit='cover' src={image} fallbackSrc='https://placehold.co/400' />
			<VStack p='2' w='100%' spacing='4' align='stretch'>
				<Flex alignItems='center' justify='space-between'>
					<Text fontWeight='medium'>
						{name} {packaking < 1 ? packaking * 1000 + "g" : packaking + "kg"}
					</Text>
					<Flex alignItems="center">
						<Button
							type="button"
							colorScheme="red"
							size="xs"
							onClick={() => decreaseQty(id, qty)}
						>
							{qty < 2 ? <FaTrashCan /> : '-'}
						</Button>
						<Input
							type="number"
							_focus={{
								borderColor: "red", 
								boxShadow: "0 0 0 1px red",
							  }}
							value={qty}
							onChange={(e) => handleQtyChange(id, stock, e.target.value)}
							max={stock}
							min={1}
							width="40px"
							height='30px'
							mx="1"
							px={2}
							fontSize="md"
						/>
						<Button
							type="button"
							colorScheme="red"
							size="xs"
							onClick={() => increaseQty(id, stock, qty)}
							isDisabled={qty >= stock}
							backgroundColor={qty >= stock ? 'red.200' : 'red.500'}
							_hover={{
								backgroundColor: qty >= stock ? 'red.200' : 'red.400',
							}}
							opacity={qty >= stock ? 0.7 : 1}
							cursor={qty >= stock ? 'not-allowed' : 'pointer'}
						>
							+
						</Button>
					</Flex>
					<Text fontWeight="bold">{price * qty} Ft</Text>

					<CloseButton onClick={() => dispatch(removeCartItem(id))} />
				</Flex>
				<Spacer />
				<Flex alignItems="center" justify="space-between">

				</Flex>
			</VStack>
		</Flex>
	);
};

export default CartItem;
