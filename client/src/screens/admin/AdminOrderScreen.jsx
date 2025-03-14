import {
    Box,
    TableContainer,
    Th,
    Tr,
    Table,
    Td,
    Thead,
    Tbody,
    Button,
    useDisclosure,
    Alert,
    Stack,
    Spinner,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Wrap,
    Text,
    Flex,
    useToast,
    Container
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, resetErrorAndRemoval, setDelivered } from '../../redux/actions/adminActions';
import ConfirmRemovalAlert from '../../components/ConfirmRemovalAlert';
import { TbTruckDelivery } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
const AdminOrderScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [orderToDelete, setOrderToDelete] = useState('');
    const dispatch = useDispatch();
    const { error, loading, orders, deliveredFlag, orderRemoval } = useSelector((state) => state.admin);
    const toast = useToast();


    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(resetErrorAndRemoval());
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
    }, [dispatch, toast, orderRemoval, deliveredFlag]);

    const openDeleteConfirmBox = (order) => {
        setOrderToDelete(order);
        onOpen();
    };

    const onSetToDelivered = (order) => {
        dispatch(resetErrorAndRemoval());
        dispatch(setDelivered(order._id));
    };

    return (
        <Box>
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Upps!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {loading ? (
                <Wrap justify='center'>
                    <Stack direction='row' spacing='4'>
                        <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
                    </Stack>
                </Wrap>
            ) : (
                <Box minH='2xl'>
                    <Text my={10} textAlign='center' fontSize='xl' fontWeight='bold'>Rendelések</Text>
                    <Container maxW="container.xl" display="flex" flexDirection={{ base: "column", md: "row" }}>

                        <Box
                            width={{ base: "100%", md: "20%" }}
                            p={4}
                            borderRight={{ base: "none", md: "1px solid gray" }}
                            borderBottom={{ base: "1px solid gray", md: "none" }}
                        >

                            <Stack spacing={4} direction={{ base: "row", md: "column" }} justify='center' wrap="wrap">
                                <NavLink to="/rendeles"><Text>Rendelések</Text></NavLink>
                                <NavLink to="/admin/legutolsorendeles"><Text>Legutolsó Rendelés</Text></NavLink>
                                <NavLink to="/felhasznalok"><Text>Felhasználók</Text></NavLink>
                                <NavLink to="/admin/termekek"><Text>Termékek</Text></NavLink>
                                <NavLink to="/admin/ujtermek"><Text>Új termék hozzáadása</Text></NavLink>
                                <NavLink to="/admin/uzenet"><Text>Üzenet</Text></NavLink>
                            </Stack>
                        </Box>
                        <Box flex="1" p={4}>
                            <TableContainer>
                                <Table variant="striped" colorScheme="gray" size={{ base: "sm", md: "md" }}>
                                    <Thead>
                                        <Tr>
                                            <Th>Date</Th>
                                            <Th>Name</Th>
                                            <Th>Shipping Price</Th>
                                            <Th>Total</Th>
                                            <Th>Delivered</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {orders &&
                                            orders.map((order) => (
                                                <Tr key={order._id}>
                                                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                                                    <Td>{order.username}</Td>
                                                    <Td>${order.shippingPrice}</Td>
                                                    <Td>${order.totalPrice}</Td>
                                                    <Td>{order.isDelivered ? <CheckCircleIcon /> : 'X'}</Td>
                                                    <Td>
                                                        <Flex direction='column'>
                                                            <Button variant='outline'
                                                             as={ReactLink}
                                                             to={`/rendeles/${order._id}`} >
                                                               Részletek
                                                            </Button>
                    
                                                        </Flex>
                                                    </Td>
                                                    {/* <Td>
                                                        <Flex direction='column'>
                                                            <Button variant='outline' onClick={() => openDeleteConfirmBox(order)}>
                                                                <DeleteIcon mr='5px' />
                                                                Remove Order
                                                            </Button>
                                                            {!order.isDelivered && (
                                                                <Button mt='4px' variant='outline' onClick={() => onSetToDelivered(order)}>
                                                                    <TbTruckDelivery />
                                                                    <Text ml='5px'>Delivered</Text>
                                                                </Button>
                                                            )}
                                                        </Flex>
                                                    </Td> */}
                                                </Tr>
                                            ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <ConfirmRemovalAlert
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onClose={onClose}
                                cancelRef={cancelRef}
                                itemToDelete={orderToDelete}
                                deleteAction={deleteOrder}
                            />
                            </Box>
                              </Container>
                        </Box>
			)}
                </Box>
            );
}

            export default AdminOrderScreen;
