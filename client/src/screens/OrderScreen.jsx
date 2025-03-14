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
  } from '@chakra-ui/react';
  import { useEffect, useState, useRef } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { getAllOrders, deleteOrder, resetErrorAndRemoval, setDelivered,setOrderToDelete } from '../redux/actions/adminActions';
  import ConfirmRemovalAlert from '../components/ConfirmRemovalAlert';
  import { TbTruckDelivery } from 'react-icons/tb';
  import { DeleteIcon } from '@chakra-ui/icons';
  import { useParams } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  const OrderScreen = () => {
    const { id } = useParams(); // 🔹 URL-ből kinyerjük az `id`-t
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [orderToDelete, setOrderToDelete] = useState('');
    const cancelRef = useRef();
    const dispatch = useDispatch();
    const { orders, orderRemoval, deliveredFlag } = useSelector((state) => state.admin);
    const toast = useToast();
    const [order, setOrder] = useState(null);
    console.log(order)
  
    useEffect(() => {
      dispatch(getAllOrders()); // 🔹 Betölti az összes rendelést
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
      }
    };
  
    if (!order) return <p>Order not found</p>; // 🔹 Ha nincs rendelés, kiírja, hogy nem található
  
    return (
      <Box p={5}>
         <Link to='/rendeles' >
        Go Back
      </Link>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Username</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr key={order._id}>
              <Td>{order._id}</Td>
              <Td>{order.username}</Td>
              <Td>{order.isDelivered ? 'Delivered' : 'Pending'}</Td>
              <Td>
                <Button
                  leftIcon={<TbTruckDelivery />}
                  colorScheme="green"
                  size="sm"
                  onClick={onSetToDelivered}
                  isDisabled={order.isDelivered}
                >
                  Set Delivered
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  onClick={openDeleteConfirmBox}
                >
                  Delete
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
   
        />
      </Box>
    );
  };
  
  export default OrderScreen;
  