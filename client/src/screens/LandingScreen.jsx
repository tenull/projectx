import {
	Box,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Link,
	Skeleton,
	Stack,
	useColorModeValue as mode,
	Text,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { BsPhoneFlip } from 'react-icons/bs';
import CaptionCarousel from '../components/CarouselLandingScreen';
import TermekekCarousel from '../components/TermekekCarousel';
import Ujdonsag from '../components/Ujdonsag';

const LandingScreen = () => (
	<Box maxW='8xl' mx='auto' p={{ base: '0', lg: '12' }} minH='6xl'>
				<CaptionCarousel/>
				<Ujdonsag/>
				<TermekekCarousel/>
	</Box>
);

export default LandingScreen;
