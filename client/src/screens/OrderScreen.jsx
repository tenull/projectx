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
  Flex
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, resetErrorAndRemoval, setDelivered, setOrderToDelete } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from '../components/ConfirmRemovalAlert';
import { TbTruckDelivery } from 'react-icons/tb';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const OrderScreen = () => {
  const { id } = useParams(); // 🔹 URL-ből kinyerjük az `id`-t
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderToDelete, setOrderToDelete] = useState('');
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const { orders, orderRemoval, deliveredFlag } = useSelector((state) => state.admin);
  const { userInfo } = useSelector((state) => state.user)
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const redirectUrl = '/admin/rendeles'

  console.log(order)

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

  useEffect(() => {
    if (orderRemoval) {
      toast({
        description: 'Order has been removed.',
        status: 'success',
        isClosable: true,
      });
    }

    if (deliveredFlag) {
      toast({
        description: 'Order has been set to delivered.',
        status: 'success',
        isClosable: true,
      });
    }
  }, [toast, orderRemoval, deliveredFlag]);

  const openDeleteConfirmBox = () => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = () => {
    if (order) {
      dispatch(resetErrorAndRemoval());
      dispatch(setDelivered(order._id));
      navigate('/admin/rendeles');
    }
  };

  if (!order) return <p>Order not found</p>;

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h1" size="xl">Rendelés {order._id}</Heading>
      <Button to='/admin/rendeles' as={Link} maxW='80px'>
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
          <Table>
            <Tbody>
              <Tr key={order._id}>
                {/* <Td>{order.isDelivered ? 'Kiszállítva' : 'Folyamatban van'}</Td> */}
                <Td display='flex' justifyContent='center' flexWrap='wrap'>
                  <Button
                    w='100px'
                    leftIcon={<TbTruckDelivery />}
                    colorScheme="green"
                    size="sm"
                    onClick={onSetToDelivered}
                    isDisabled={order.isDelivered}
                  >
                    Kiszállítva
                  </Button>
                  <Button
                    w='100px'
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={openDeleteConfirmBox}
                  >
                    Törlés
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={orderToDelete}
            deleteAction={deleteOrder}
            navigate={navigate}
            redirectUrl={redirectUrl}
          />
        </Box>
      </Grid>
    </VStack>
  );
};

export default OrderScreen;
