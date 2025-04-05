import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Input,
  Image,
  Grid,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Flex,
  DrawerFooter,
  Box,
  Text
} from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const SearchInput = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    setKeyword(urlKeyword || '');
  }, [urlKeyword]);

  useEffect(() => {
    if (keyword.trim()) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [keyword, products]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <IconButton
        icon={<BiSearchAlt size="25px" />}
        onClick={onOpen}
        variant="ghost"
        aria-label="Keresés"
      />

      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="white" borderRadius="0 0 20px 20px" boxShadow="lg">
          <DrawerCloseButton />
          <DrawerHeader textAlign="center" fontSize="xl" fontWeight="bold">
            Termékek keresése
          </DrawerHeader>

          <DrawerBody>
            <Flex align="center" gap={2}>
              <Input
                border="2px solid"
                borderColor="gray.300"
                _focus={{
                  borderColor: "red.400",
                }}
                placeholder="Írja be a keresett terméket..."
                bg="white"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                borderRadius="full"
                px={4}
              />
              <Button colorScheme="red" borderRadius="full" onClick={submitHandler}>
                Keresés
              </Button>
            </Flex>
          </DrawerBody>

          <DrawerFooter flexDirection="column" alignItems="center">
            {filteredProducts.length > 0 && (
              <Text fontSize="md" fontWeight="semibold" my={2}>
                Találatok: {filteredProducts.length} termék
              </Text>
            )}

            <Grid
              templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
              gap={4}
              w="full"
              maxH={{ base: '400px', md: '500px' }}
              overflowX='auto'
              p={3}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Box
                    as={Link}
                    to={`teszta/${product._id}`}
                    key={product.id}
                    position='relative'
                    maxW='250px'
                    p={3}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{ boxShadow: "xl", transform: "scale(1.00)" }}
                    onClick={onClose}
                  >
                    <Text
                      position="absolute"
                      top="15px"
                      right="10px"
                      bg="blackAlpha.700" 
                      color="yellow.300" 
                      border="2px solid yellow.400"
                      borderRadius="full"
                      px={3}
                      py={1}
                      fontSize="lg"
                      fontWeight="bold"
                      boxShadow="lg"
                      transform="translateY(-50%)"
                    >
                      {product.packingOf}
                    </Text>

                    <Image src={product.image} 
                    fallbackSrc='https://placehold.co/400'
                    borderRadius="md" maxW="80px" mx="auto" />
                    <Text fontSize="sm" fontWeight="bold" textAlign="center" mt={2}>
                      {product.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600" textAlign="center">
                      {product.packaging} g
                    </Text>
                    <Text fontSize="sm" color="red.500" fontWeight="bold" textAlign="center">
                      {product.price} Ft
                    </Text>
                  </Box>
                ))
              ) : (
                <Text textAlign="center" fontSize="sm" color="gray.500">
                  Nincs találat...
                </Text>
              )}
            </Grid>

            {filteredProducts.length >= 1 && (
              <Text
                my={3}
                cursor="pointer"
                color="red.500"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
                onClick={submitHandler}
              >
                Mind a {filteredProducts.length} termék megjelenítése
              </Text>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchInput;
