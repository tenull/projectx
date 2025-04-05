import {
	Box,
} from '@chakra-ui/react';
import CaptionCarousel from '../components/CarouselLandingScreen';
import TermekekCarousel from '../components/TermekekCarousel';
import Ujdonsag from '../components/Ujdonsag';
import Szolgaltatas from '../components/Szolgaltatas';
import Message from '../components/Message';
import { useSelector, useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import { fetchNotification } from '../redux/actions/notificationActions';
const LandingScreen = () => {

	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(true);
	const { message = '', } = useSelector((state) => state.notification || {});

	useEffect(() => {
		dispatch(fetchNotification());
	}, [dispatch]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsOpen(false);
		}, 30000);
		return () => clearTimeout(timeout);
	}, []);

		return (
	<Box maxW='8xl' mx='auto' p={{ base: '0', lg: '12' }} minH='6xl'>		
		<CaptionCarousel />
		<Ujdonsag />
		<Szolgaltatas />
		<TermekekCarousel />
		{message && message.isVisible && message.message && (
			<Message message={message.message} isOpen={isOpen} onClose={() => setIsOpen(false)} />
		)}
	</Box>
)};

export default LandingScreen;
