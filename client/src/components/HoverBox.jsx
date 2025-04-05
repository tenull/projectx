import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HoverBox = ({ text,image,link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      display="flex"
      as={Link}
      to={link}
      cursor='pointer'
      justifyContent="center"
      alignItems="center"
      w="300px"
      h="400px"
      backgroundImage={image}
      backgroundPosition='center'
      backgroundSize='cover'
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} 
    >
      <Box
        position="absolute"
        top="15px"
        left="15px"
        width={hovered ? "calc(100% - 30px)" : "0%"}
        
        height="2px"
        background="white"
        transition="width 0.3s ease-in-out"
      />
      <Box
        position="absolute"
        top="15px"
        right="15px"
        width="2px"
        height={hovered ? "calc(100% - 30px)" : "0%"}
        background="white"
        transition="height 0.3s ease-in-out"
      />
      <Box
        position="absolute"
        bottom="15px"
        left="15px"
        width={hovered ? "calc(100% - 30px)" : "0%"}
        height="2px"
        background="white"
        transition="width 0.3s ease-in-out 0.3s"
      />
      <Box
        position="absolute"
        top="15px"
        left="15px"
        width="2px"
        height={hovered ? "calc(100% - 30px)" : "0%"}
        bg="rgba(0, 0, 0, 0.5)"
        background="white"
        transition="height 0.3s ease-in-out 0.3s"
      />
     <Text
  fontSize="xl"
  color={hovered? 'red.600':'white'}
  transition={hovered? 'ease-in-out 0.3s' :'ease-in-out 0.3s'}
  fontWeight="bold"
  textShadow="2px 2px 5px rgba(0, 0, 0, 0.9)" 
>
  {text}
</Text>
    </Box>
  );
};

export default HoverBox;
