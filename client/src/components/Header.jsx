import React from 'react';
import {
	IconButton,
	Box,
	Flex,
	HStack,
	Icon,
	Stack,
	Text,
	useColorModeValue as mode,
	useDisclosure,
	AlertDescription,
	Alert,
	AlertIcon,
	AlertTitle,
	Divider,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spacer,
	useToast,
	Button,
	Input
} from '@chakra-ui/react';
import {
	DrawerActionTrigger,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerRoot,
	DrawerTitle,
	DrawerTrigger,
	Drawer,
	DrawerOverlay,
	DrawerCloseButton

} from "@chakra-ui/react"

import { useEffect, useState } from 'react';
import { BsPhoneFlip } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { BiUserCheck, BiUser, BiLogInCircle, BiSearchAlt } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { TbShoppingCart } from 'react-icons/tb';
import { logout } from '../redux/actions/userActions';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { googleLogout } from '@react-oauth/google';
import { color } from 'framer-motion';
import LoginForm from './LoginForm';
import CartForm from './CartForm';
import CartMenu from './CartMenu';
import SearchInput from './SearchInput';
const Links = [
	{ name: 'Rólunk', route: '/rolunk' },
	{ name: 'Tésztáink', route: '/tesztaink' },
	{ name: 'Szállítási információk', route: '/szallitasi-informaciok' },
	{ name: 'Kapcsolat', route: '/kapcsolat' },
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const toast = useToast();
	const { favoritesToggled, products } = useSelector((state) => state.product);
	const { cartItems, subtotal } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);
	const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false);
	const [isLoginVisible, setIsLoginVisible] = useState(false);
	const [isCartVisible, setIsCartVisible] = useState(false);
	let timeoutId;

	const handleMouseEnter = () => {
		clearTimeout(timeoutId);
		setIsCartVisible(true);
	};

	const handleMouseLeave = () => {
		timeoutId = setTimeout(() => {
			setIsCartVisible(false);
		}, 300);
	};

	useEffect(() => {
		if (userInfo && !userInfo.active) {
			setShowBanner(true);
		}
	}, [favoritesToggled, dispatch, userInfo]);

	const logoutHandler = () => {
		googleLogout();
		dispatch(logout());
		toast({
			description: 'You have been logged out.',
			status: 'success',
			isClosable: 'true',
		});
	};

	return (
		<>
			<Box zIndex={1} bg={mode(`white`, 'gray.900')} position='sticky' top='0' w='100%' px='4'>
				<Box alignItems='center' display='flex' justifyContent='space-between' px={10}>
					<Box width={{ base: '0', md: '150px' }} h='1px'>
						<Flex display={{ base: 'flex', md: 'none' }} position='absolute' left={4} top={2}>
							<IconButton
								bg='parent'
								size='md'
								icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
								onClick={isOpen ? onClose : onOpen}
							/>
						</Flex>
					</Box>
					{/* <Icon as={BsPhoneFlip} h='6' w='6' color={mode('black', 'yellow.200')} /> */}
					<Box display='flex' alignItems='center' as={ReactLink} to='/'>
					<Image src="../images/laskoditesztalogo.png" width="50px" height="50px" />
						<Text as='b' display={{base:'none',md:'block'}} fontSize={{ base: 'xl', md: '2xl' }}>LaskodiTészta</Text>
					</Box>
					<Flex alignItems='center' justify='flex-end'>
						{userInfo ? (
							<Menu>
								<MenuButton rounded='full' variant='link' cursor='pointer' minW='0'>
									<HStack>
										{userInfo.googleImage ? (
											<Image
												borderRadius='full'
												boxSize='40px'
												src={userInfo.googleImage}
												referrerPolicy='no-referrer'
											/>
										) : (
											<BiUserCheck size='35' />
										)}

										{/* <ChevronDownIcon ms={-3}/> */}
									</HStack>
								</MenuButton>
								<MenuList>
									<HStack>
										<Text pl='3' as='i'>
											{userInfo.email}
										</Text>
										{userInfo.googleId && <FcGoogle />}
									</HStack>
									<Divider py='1' />
									<MenuItem as={ReactLink} to='/order-history'>
										Order History
									</MenuItem>
									<MenuItem as={ReactLink} to='/profile'>
										Profile
									</MenuItem>
									{userInfo.isAdmin && (
										<>
											<MenuDivider />
											<MenuItem as={ReactLink} to='/admin-console'>
												<MdOutlineAdminPanelSettings />
												<Text ml='2'>Admin Console</Text>
											</MenuItem>
											<MenuItem as={ReactLink} to='/admin'>
												<MdOutlineAdminPanelSettings />
												<Text ml='2'>Admin</Text>
											</MenuItem>
										</>
									)}
									<MenuDivider />
									<MenuItem onClick={logoutHandler}>Logout</MenuItem>

								</MenuList>

							</Menu>
						) : (
							<Box position="relative">
								<IconButton
									icon={<BiUser />}
									fontSize="25px"
									onMouseEnter={() => setIsLoginVisible(true)}
									onMouseLeave={() => setIsLoginVisible(false)}
									aria-label="User"
								/>
								{isLoginVisible && (
									<Box position="absolute" zIndex={1} top="40px" right="0" onMouseEnter={() => setIsLoginVisible(true)} onMouseLeave={() => setIsLoginVisible(false)}>
										<LoginForm />
									</Box>
								)}
							</Box>
						)}
						{favoritesToggled ? (
							<IconButton
								onClick={() => dispatch(toggleFavorites(false))}
								icon={<MdOutlineFavorite size='25px' />}
								variant='ghost'
							/>
						) : (
							<IconButton
								onClick={() => dispatch(toggleFavorites(true))}
								icon={<MdOutlineFavoriteBorder size='25px' />}
								variant='ghost'
							/>
						)}

						{/* <IconButton icon={<BiSearchAlt size='25px' />} onClick={searchOpen} variant='ghost' />
						{handleSearch && <Box display='flex' alignItems='center' position='fixed' left='1px' top='80px' width='100%'>
							<Input placeholder='keresés...' />
							<Button>Keresés</Button>
							<Text onClose={() => setSearchOpen(false)}>X</Text>
						</Box>} */}
						<SearchInput/>

							<CartMenu/>
						
					</Flex>
				</Box>
				<Flex h="10" alignItems="center" justifyContent={{ base: 'space-between', md: 'center' }}>

					<HStack spacing='8' alignItems='center' >


						<HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }} >
							{Links.map((link) => (
								<NavLink route={link.route} key={link.route}>
									<Text fontWeight='medium'>{link.name}</Text>
								</NavLink>
							))}
						</HStack>
					</HStack>

				</Flex>
				<Box display='flex'>
					{isOpen && (
						<Box pb='4' display={{ md: 'none' }}>
							<Stack as='nav' spacing='4'>
								{Links.map((link) => (
									<NavLink route={link.route} key={link.route}>
										<Text fontWeight='medium'>{link.name}</Text>
									</NavLink>
								))}
							</Stack>
							{favoritesToggled ? (
								<IconButton
									onClick={() => dispatch(toggleFavorites(false))}
									icon={<MdOutlineFavorite size='20px' />}
									variant='ghost'
								/>
							) : (
								<IconButton
									onClick={() => dispatch(toggleFavorites(true))}
									icon={<MdOutlineFavoriteBorder size='20px' />}
									variant='ghost'
								/>
							)}
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Header;
