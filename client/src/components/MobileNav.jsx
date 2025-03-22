import { Box, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import NavLink from "./NavLink";

const MobileNav = ({ Links, isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menü</DrawerHeader>
        <DrawerBody display='flex' flexDirection='column'>
          {Links.map((link) => (
            <NavLink  route={link.route} key={link.route} onClick={onClose}>
                <Box onClick={onClose} >
                <Text fontWeight="medium">{link.name}</Text>    
                </Box>
              
            </NavLink>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
