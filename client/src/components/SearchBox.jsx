import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Flex } from '@chakra-ui/react';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  useEffect(() => {
    setKeyword(urlKeyword || '');
  }, [urlKeyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Flex as="form" onSubmit={submitHandler} w="full" maxW="400px">
      <Input
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        borderRadius="md"
        borderColor="gray.300"
        _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 1px green.400' }}
      />
      <Button type="submit" colorScheme="green" ml={2}>
        Search
      </Button>
    </Flex>
  );
};

export default SearchBox;
