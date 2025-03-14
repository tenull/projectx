import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Input,Image,Grid, Button, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure, Flex, DrawerFooter, Box, Text } from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux'; // Reduxból betöltjük a termékeket

const SearchInput = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [filteredProducts, setFilteredProducts] = useState([]); // Szűrt termékek

  const products = useSelector((state) => state.product.products); // Termékek betöltése Reduxból

  useEffect(() => {
    setKeyword(urlKeyword || '');
  }, [urlKeyword]); // Ha változik az URL, frissítjük a keresőmezőt

  // 🔎 Keresési logika
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
      {/* Kereső ikon gomb */}
      <IconButton 
        icon={<BiSearchAlt size="25px" />} 
        onClick={onOpen} 
        variant="ghost" 
        aria-label="Keresés"
      />

      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.100">
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">Termékek keresése</DrawerHeader>

          <DrawerBody>
            <Flex align="center" gap={0}>
              <Input 
                border={0}
                _focus={{
                  borderColor: "red", 
                  boxShadow: "0 0 0 2px red",
                }}
                placeholder="Keresés..." 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
              />
              <Button colorScheme="red" onClick={submitHandler}>Keresés</Button>
            </Flex>
          </DrawerBody>

          <DrawerFooter flexDirection="column" alignItems="start">
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(10, 1fr)' }} gap={3} mt={10}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Box as={Link} to={`teszta/${product._id}`} display='flex' key={product.id} p={2} w="full" bg="white" borderRadius="md" boxShadow="sm" onClick={onClose}>
                    <Box>
                  <Image src={product.images[0]} maxW='50px'/>
                   </Box> 
                  <Box display='flex' flexDirection='column' alignItems='center'>
                  <Text fontSize="sm" fontWeight="bold">{product.name}</Text>
                  <Text fontSize="xs" color="gray.600">{product.packaking} g</Text>
                  <Text fontSize="xs" color="gray.600">{product.price} Ft</Text>
                  </Box>
                </Box>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">Nincs találat</Text>
            )}
             </Grid>
            {filteredProducts.length >= 1 && <Text  onClick={submitHandler}>mind a {filteredProducts.length} termék megjelenítése</Text>}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchInput;
