import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <Box textAlign="center" minH='3xl' py={10} px={6}>
      <Heading as="h2" size="xl" color="red.500">
        404 - Az oldal nem található
      </Heading>
      <Text fontSize="lg" mt={4} mb={6}>
        Sajnos az oldal, amit keresel, nem létezik. Lehet, hogy elírtad az URL-t, vagy az oldal már nem elérhető.
      </Text>
      <Button as={Link} to="/" colorScheme="red" size="lg">
        Vissza a főoldalra
      </Button>
    </Box>
  );
};

export default NotFoundScreen;
