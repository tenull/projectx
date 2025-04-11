import React from 'react';
import {
	IconButton,
	Box,
	Flex,
	HStack,
	Text,
	useColorModeValue as mode,
	useDisclosure,
	Divider,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useToast,

} from '@chakra-ui/react';

import { useEffect, useState, useRef } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import { BiUserCheck, BiUser } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { HamburgerIcon, CloseIcon, } from '@chakra-ui/icons';
import { logout } from '../redux/actions/userActions';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { googleLogout } from '@react-oauth/google';
import LoginForm from './LoginForm';
import CartMenu from './CartMenu';
import SearchInput from './SearchInput';
import MobileNav from './MobileNav';
const Links = [
	{ name: 'Rólunk', route: '/rolunk' },
	{ name: 'Tésztáink', route: '/tesztaink' },
	{ name: 'Pályázat', route: '/palyazat' },
	{ name: 'Szállítási információk', route: '/szallitasi-informaciok' },
	{ name: 'Kapcsolat', route: '/kapcsolat' },
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const toast = useToast();
	const { favoritesToggled, products } = useSelector((state) => state.product);
	const { userInfo } = useSelector((state) => state.user);
	const [, setShowBanner] = useState(userInfo ? !userInfo.active : false);
	const [isLoginVisible, setIsLoginVisible] = useState(false);
	const [isCartVisible, setIsCartVisible] = useState(false);
	const loginRef = useRef(null);
	const formRef = useRef(null);
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
			description: 'Kijelentkeztél.',
			status: 'success',
			isClosable: 'true',
		});
	};

	const handleClickOutside = (event) => {
		if (loginRef.current && !loginRef.current.contains(event.target) && !formRef.current.contains(event.target)) {
			setIsLoginVisible(false);
		}
	};

	useEffect(() => {
		if (isLoginVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isLoginVisible]);

	return (
		<>
			<Box height={{ base: '70px', md: '100px' }} pt={2} zIndex={2} bg={mode(`white`, 'gray.900')} position='sticky' top='0' w='100%' px='4'>
				<Box alignItems='center' display='flex' justifyContent='space-between' px={10}>
					<Box width={{ base: '0', md: '150px' }} h='1px'>
						<Flex display={{ base: 'flex', md: 'none' }} position='absolute' left={7} top={4}>
							<IconButton
								bg='parent'
								size='md'
								icon={isOpen ? <CloseIcon /> : <HamburgerIcon fontSize='20' />}
								onClick={onOpen}

							/>
							<MobileNav Links={Links} isOpen={isOpen} onClose={onClose} />

						</Flex>
					</Box>
					{/* <Icon as={BsPhoneFlip} h='6' w='6' color={mode('black', 'yellow.200')} /> */}
					<Box display='flex' alignItems='center' as={ReactLink} to='/'>
						<Image src="/images/laskoditesztalogo.png" width="50px" height="50px" />
						<Box  as={ReactLink} to='/' position='relative' alignItems="center" justifyContent='flex-start' display={{base:'none',md:'flex'}} flexDirection="column">
							<Text as="b" href="#wave">
								LASKODI
							</Text>
							<Text top={5} position='absolute' as="b" fontSize="10px" alignItems="center" >
								TÉSZTA
							</Text>
						</Box>
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
											Üdvözöljük,{userInfo.email}!
										</Text>
										{userInfo.googleId && <FcGoogle />}
									</HStack>
									<Divider py='1' />
									<MenuItem as={ReactLink} to='/profil'>
										Profil
									</MenuItem>
									<MenuItem as={ReactLink} to='/rendelesitortenet'>
										Rendelési történet
									</MenuItem>

									{userInfo.isAdmin && (
										<>
											<MenuDivider />
											{/* <MenuItem as={ReactLink} to='/admin-console'>
												<MdOutlineAdminPanelSettings />
												<Text ml='2'>Admin Console</Text>
											</MenuItem> */}
											<MenuItem as={ReactLink} to='/admin'>
												<MdOutlineAdminPanelSettings />
												<Text ml='2'>Admin</Text>
											</MenuItem>
										</>
									)}
									<MenuDivider />
									<MenuItem onClick={logoutHandler}>Kijelentkezés</MenuItem>

								</MenuList>

							</Menu>
						) : (
							<Box>
								<Box display={{ base: 'none', md: 'block' }} position="relative" ref={loginRef}>
									<IconButton
										icon={<BiUser />}
										fontSize="25px"
										onClick={() => setIsLoginVisible(!isLoginVisible)}
										aria-label="User"
									/>
									{isLoginVisible && (
										<Box
											position="absolute"
											zIndex={1}
											top="40px"
											right="0"
										>

											<div ref={formRef}>
												<LoginForm />
											</div>
										</Box>
									)}
								</Box>
								<Box display={{ base: 'block', md: 'none' }} position="relative" ref={loginRef}>
									<IconButton
										icon={<BiUser />}
										fontSize="25px"
										as={ReactLink}
										to='/bejelentkezes'
										aria-label="User"
									/>

								</Box>
							</Box>
						)}

						<IconButton
							as={ReactLink}
							to='/kedvencek'
							onClick={() => dispatch(toggleFavorites(false))}
							icon={<MdOutlineFavoriteBorder size='25px' />}
							variant='ghost'
						/>



						{/* <IconButton icon={<BiSearchAlt size='25px' />} onClick={searchOpen} variant='ghost' />
						{handleSearch && <Box display='flex' alignItems='center' position='fixed' left='1px' top='80px' width='100%'>
							<Input placeholder='keresés...' />
							<Button>Keresés</Button>
							<Text onClose={() => setSearchOpen(false)}>X</Text>
						</Box>} */}

						<SearchInput products={products} />

						<CartMenu />

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

			</Box>
		</>
	);
};

export default Header;
