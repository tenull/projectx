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
import { NavLink, useNavigate } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
const AdminOrderScreen = () => {
    const dispatch = useDispatch();
    const { error, loading, orders, deliveredFlag, orderRemoval,paidFlag } = useSelector((state) => state.admin);
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(resetErrorAndRemoval());
        if (orderRemoval) {
            toast({
                description: 'Rendelés törölve lett.',
                status: 'success',
                isClosable: true,
            });
            dispatch(getAllOrders());
        }
        if (deliveredFlag) {
            toast({
                description: 'Rendelés kiszállítás alatt.',
                status: 'success',
                isClosable: true,
            });  
        }
        // if (paidFlag) {
        //     toast({
        //         description: 'Rendelés kifizetve.',
        //         status: 'success',
        //         isClosable: true,
        //     });  
        // }
    }, [dispatch, toast, orderRemoval, deliveredFlag,paidFlag]);

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
                <Box >
                    <Text my={10} textAlign='center' fontSize='xl' fontWeight='bold'>Rendelések</Text>

                            <TableContainer>
                                <Table variant="striped" colorScheme="gray" size={{ base: "sm", md: "md" }}>
                                    <Thead>
                                        <Tr>
                                            <Th>DÁTUM</Th>
                                            <Th>név</Th>
                                            <Th>kiszállítási forma</Th>
                                            <Th>teljes összeg</Th>
                                            <Th>kiszállítva</Th>
                                            <Th>kifizetve</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {orders && orders?.length > 0 ? (
                                            orders.map((order) => (
                                                <Tr key={order._id}>
                                                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                                                    <Td>{order.username}</Td>
                                                    <Td>{order.shipping}</Td>
                                                    <Td>{order.totalPrice} Ft</Td>
                                                    <Td>{order.isDelivered ? <CheckCircleIcon /> : 'X'}</Td>
                                                    <Td>{order.isPaid ? <CheckCircleIcon /> : 'X'}</Td>
                                                    <Td>
                                                        <Flex direction="column">
                                                            <Button variant="outline" as={ReactLink} to={`/admin/rendeles/${order._id}`}>
                                                                Részletek
                                                            </Button>
                                                        </Flex>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan="6" textAlign="center">
                                                    Nincsenek rendelések
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>

                                </Table>
                            </TableContainer>
                          

                </Box>
            )}
        </Box>
    );
}

export default AdminOrderScreen;
