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
import { getAllOrders, deleteOrder, resetErrorAndRemoval, setDelivered, setPaid } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from '../components/ConfirmRemovalAlert';
import { TbMoneybag, TbTruckDelivery } from 'react-icons/tb';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const OrderScreen = () => {
  const { id } = useParams(); // 🔹 URL-ből kinyerjük az `id`-t
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderToDelete, setOrderToDelete] = useState('');
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const { orders, orderRemoval, deliveredFlag, paidFlag } = useSelector((state) => state.admin);
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const redirectUrl = '/admin/rendeles'



  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0 && id) {
      const foundOrder = orders.find((order) => order._id === id);
      setOrder(foundOrder || null);
    }
  }, [id, orders]);

  // useEffect(() => {
  //   if (orderRemoval) {
  //     toast({
  //       description: 'Rendelés törölve lett.',
  //       status: 'success',
  //       isClosable: true,
  //     });
  //   }

  //   if (deliveredFlag) {
  //     toast({
  //       description: 'Rendelés kiszállítás alatt van.',
  //       status: 'success',
  //       isClosable: true,
  //     });
  //   }
  // }, [toast, orderRemoval, deliveredFlag,paidFlag]);

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
  const onSetToPaid = () => {
    if (order) {
      dispatch(resetErrorAndRemoval());
      dispatch(setPaid(order._id));
      navigate('/admin/rendeles');
    }
  };

  if (!order) return <p>Order not found</p>;

  const paymentName = {
    cash_on_delivery: 'Utánvétes fizetés (+495 Ft)',
    credit_card: 'Bankkártyával',
    bank_transfer: 'Banki átutalással',
  };


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
          <Text>{order.shippingAddress.postalCode},{order.shippingAddress.city},{order.shippingAddress.address}</Text>
          <Text fontWeight="bold">Számlázási adatok</Text>
          <Text>{order.shippingAddress.billingName}</Text>
          <Text>{order.shippingAddress.billingPostalCode},{order.shippingAddress.billingCity},{order.shippingAddress.billingAddress}, {order.shippingAddress.BillingCity}</Text>
          {order.isDelivered ? (
            <Text color="green.500">Kiszállítva: {order.updatedAt}</Text>
          ) : (
            <Text color="red.500">Nincs kiszállítva</Text>
          )}
          <Divider my={4} />

          <Text fontWeight="bold">Fizetés</Text>
          <Text>Fizetési mód: {paymentName[order.paymentMethod] || "Ismeretlen fizetési mód"}</Text>
          {order.isPaid ? (
            <Text color="green.500">Fizetve: {order.paidAt}</Text>
          ) : (
            <Text color="red.500">Nincs kifizetve</Text>
          )}
          <Text>{order.PaidStatus}</Text>
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
                  {order.paymentMethod !== 'credit_card' && (
                    <Button
                      w="100px"
                      leftIcon={<TbMoneybag />}
                      colorScheme="green"
                      size="sm"
                      onClick={onSetToPaid}
                      isDisabled={order.isPaid}
                    >
                      {order.isPaid ? 'Kifizetve' : 'Kifizetés'}
                    </Button>
                  )}


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
