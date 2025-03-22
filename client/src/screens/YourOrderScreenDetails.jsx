import {
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    useDisclosure,
    VStack,
    Heading,
    Grid,
    Text,
    Divider,
    Image,
    Flex,
    Container
  } from '@chakra-ui/react';
  import { useEffect, useState, useRef } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { getAllOrders, deleteOrder, resetErrorAndRemoval, setDelivered, setOrderToDelete } from '../redux/actions/adminActions';
  import ConfirmRemovalAlert from '../components/ConfirmRemovalAlert';
  import { TbTruckDelivery } from 'react-icons/tb';
  import { DeleteIcon } from '@chakra-ui/icons';
  import { useNavigate, useParams } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  const YourOrderScreenDetails = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const { orders, orderRemoval, deliveredFlag } = useSelector((state) => state.admin);
    const { userInfo } = useSelector((state) => state.user)
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

  
    useEffect(() => {
      dispatch(getAllOrders());
      dispatch(resetErrorAndRemoval());
    }, [dispatch]);
  
    useEffect(() => {
      if (orders.length > 0 && id) {
        const foundOrder = orders.find((order) => order._id === id);
        setOrder(foundOrder || null);
      }
    }, [id]);
  
    if (!order) return <p>Order not found</p>;
  
    return (
        <Container py={10} maxW='container.xl'>
      <VStack spacing={6} align="stretch">
        <Heading textAlign='center' as="h1" size="xl">Rendelés {order._id}</Heading>
        <Button to='/rendelesitortenet' as={Link} maxW='80px'>
          Vissza
        </Button>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
          <Box>
            <Text fontWeight="bold">Szállítás</Text>
            <Text>{order.username} ({order.email})</Text>
            <Text>{order.shippingAddress.address}, {order.shippingAddress.city}</Text>
            {order.isDelivered ? (
              <Text color="green.500">Kiszállítva: {order.updatedAt}</Text>
            ) : (
              <Text color="red.500">Nincs kiszállítva</Text>
            )}
            <Divider my={4} />
  
            <Text fontWeight="bold">Fizetés</Text>
            <Text>Fizetési mód: {order.paymentMethod}</Text>
            {order.isPaid ? (
              <Text color="green.500">Fizetve: {order.paidAt}</Text>
            ) : (
              <Text color="red.500">Nincs kifizetve</Text>
            )}
            <Divider my={4} />
  
            <Text fontWeight="bold">Rendelés tételei</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Kép</Th>
                  <Th>Termék</Th>
                  <Th>Mennyiség</Th>
                  <Th>Összeg</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.orderItems.map((item) => (
                  <Tr key={item.product}>
                    <Td><Image src={item.image} boxSize="50px" objectFit="cover" /></Td>
                    <Td>{item.name} {item.packaking * 1000}g</Td>
                    <Td>{item.qty}</Td>
                    <Td>{item.qty * item.price} Ft</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
  
          <Box borderWidth={1} p={4} borderRadius={8}>
            <Text fontWeight="bold">Rendelés összegzés</Text>
            <Divider my={4} />
            <Flex justify="space-between"><Text>Tételek:</Text><Text>{order.subtotal} Ft</Text></Flex>
            <Flex justify="space-between"><Text>Szállítás:</Text><Text>{order.totalPrice - order.subtotal} Ft</Text></Flex>
            <Flex justify="space-between" fontWeight="bold"><Text>Összesen:</Text><Text>{order.totalPrice} Ft</Text></Flex>
            <Divider my={4} />
            <Box mt={10} display='flex' alignItems='center' justifyContent='center'>
            <Button colorScheme='red'>Számla megtekintése</Button>
            </Box>
          </Box>
        </Grid>
      </VStack>
      </Container>
    );
  };
  
  export default YourOrderScreenDetails;
  