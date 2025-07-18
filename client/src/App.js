import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ProductsScreen from './screens/ProductsScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingScreen from './screens/LandingScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import axios from 'axios';
import { VStack, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CheckoutScreen from './screens/CheckoutScreen';
import YourOrdersScreen from './screens/YourOrdersScreen';
import CancelScreen from './screens/CancelScreen';
import SuccessScreen from './screens/SuccessScreen';
import AdminConsoleScreen from './screens/AdminConsoleScreen';
import AboutUs from './screens/AboutUs';
import Deliver from './screens/Deliver';
import Contact from './screens/Contact';
import AdminScreen from './screens/AdminScreen';
import AdminOrderScreen from './screens/admin/AdminOrderScreen';
import AdminLastOrderScreen from './screens/admin/AdminLastOrderScreen';
import AdminUsersScreen from './screens/admin/AdminUsersScreen';
import AdminProductScreen from './screens/admin/AdminProductScreen';
import AdminNewProductScreen from './screens/admin/AdminNewProductScreen';
import OrderScreen from './screens/OrderScreen';
import AdminProductEditScreen from './screens/admin/AdminProductEditScreen';
import ProfileScreen from './screens/ProfileScreen';
import YourOrdersScreenDetails from './screens/YourOrderScreenDetails';
import SearchScreen from './screens/SearchScreen';
import AdminNotification from './screens/admin/AdminNotification';
import FavoritesScreen from './screens/FavoritesScreen';
import PalyazatScreen from './screens/PalyazatScreen';
import PaymentResult from './screens/PaymentResult';
import NotFoundScreen from './screens/NotFoundScreen';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
function App() {
	const theme = extendTheme({
		styles: {
			global: (props) => ({
				body: {
					bg: props.colorMode === 'light' && '#F7FAFC',
				},
			}),
		},
	});

	const [googleClient, setGoogleClient] = useState(null);
	useEffect(() => {
		const googleKey = async () => {
			const { data: googleId } = await axios.get('http://91.214.112.61:8000/api/config/google');
			setGoogleClient(googleId);
		};
		googleKey();
	}, [googleClient]);

	return (
		<ChakraProvider theme={theme}>
			{!googleClient ? (
				<VStack pt='37vh'>
					<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
				</VStack>
			) : (
				<GoogleOAuthProvider clientId={googleClient}>
					<Router>
						<Header />
						<ScrollToTop/>
						<ScrollToTopButton/>
						<main>
							<Routes>
								<Route path='/tesztaink/:category' element={<ProductsScreen />} />
								<Route path='/tesztaink' element={<ProductsScreen />} />
								<Route path='/rolunk' element={<AboutUs />} />
								<Route path='/szallitasi-informaciok' element={<Deliver />} />
								<Route path='/kapcsolat' element={<Contact />} />
								<Route path='/' element={<LandingScreen />} />
								<Route path='/teszta/:id' element={<ProductScreen />} />
								<Route path='/profil' element={<ProfileScreen />} />
								<Route path='/search/:keyword' element={<SearchScreen />} />
								<Route path='/kosar' element={<CartScreen />} />
								<Route path='/bejelentkezes' element={<LoginScreen />} />
								<Route path='/regisztracio' element={<RegistrationScreen />} />
								<Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
								<Route path='/password-reset/:token' element={<PasswordResetScreen />} />
								<Route path='/penztar' element={<CheckoutScreen />} />
								<Route path='/sikertelen' element={<CancelScreen />} />
								<Route path='/rendelesitortenet' element={<YourOrdersScreen />} />
								<Route path='/rendelesitortenet/:id' element={<YourOrdersScreenDetails />} />
								<Route path='/sikeres' element={<SuccessScreen />} />
								<Route path='/admin-console' element={<AdminConsoleScreen />} />
								<Route path="/admin" element={<AdminScreen />}>
									<Route path="legutolsorendeles" element={<AdminLastOrderScreen />} />
									<Route path="felhasznalok" element={<AdminUsersScreen />} />
									<Route path="rendeles" element={<AdminOrderScreen />} />
									<Route path='rendeles/:id' element={<OrderScreen />} />
									<Route path="termekek" element={<AdminProductScreen />} />
									<Route path="termekek/:id/edit" element={<AdminProductEditScreen />} />
									<Route path="ujtermek" element={<AdminNewProductScreen />} />
									<Route path="uzenet" element={<AdminNotification />} />
								</Route>
								<Route path='/kedvencek' element={<FavoritesScreen />} />
								<Route path="/payment-result" element={<PaymentResult />} />
								<Route path="/palyazat" element={<PalyazatScreen />} />
								<Route path="*" element={<NotFoundScreen />} /> 
							</Routes>
						</main>
						<Footer />
					</Router>
				</GoogleOAuthProvider>
			)}
		</ChakraProvider>
	);
}

export default App;
