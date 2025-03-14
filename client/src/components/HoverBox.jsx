import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const HoverBox = ({ text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="300px"
      h="400px"
      bg="blue"
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} // Itt visszaállítjuk
    >
      {/* Felső vonal */}
      <Box
        position="absolute"
        top="15px"
        left="15px"
        width={hovered ? "calc(100% - 30px)" : "0%"}
        height="2px"
        background="white"
        transition="width 0.3s ease-in-out"
      />
      {/* Jobb oldali vonal */}
      <Box
        position="absolute"
        top="15px"
        right="15px"
        width="2px"
        height={hovered ? "calc(100% - 30px)" : "0%"}
        background="white"
        transition="height 0.3s ease-in-out"
      />
      {/* Alsó vonal */}
      <Box
        position="absolute"
        bottom="15px"
        left="15px"
        width={hovered ? "calc(100% - 30px)" : "0%"}
        height="2px"
        background="white"
        transition="width 0.3s ease-in-out 0.3s"
      />
      {/* Bal oldali vonal */}
      <Box
        position="absolute"
        top="15px"
        left="15px"
        width="2px"
        height={hovered ? "calc(100% - 30px)" : "0%"}
        background="white"
        transition="height 0.3s ease-in-out 0.3s"
      />
      <Text fontSize="xl" color="white">
        {text}
      </Text>
    </Box>
  );
};

export default HoverBox;
