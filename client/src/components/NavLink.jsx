import { IconButton } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const NavLink = ({ children, route }) => (
	<IconButton 
  as={ReactLink} 
  px='2' 
  py='1' 
  rounded='md' 
  variant='ghost' 
  textTransform='uppercase' 
  _hover={{color:'red.500'}} 
  to={route}
  fontFamily='Poppins, sans-serif'  // Betűtípus beállítása
>
  {children}
</IconButton>

);

export default NavLink;
