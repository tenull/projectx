import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Spinner,
    Box,
    Wrap,
    useToast,
    useDisclosure
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getProducts, resetProductError } from '../../redux/actions/productActions';
import ConfirmRemovalAlert from '../../components/ConfirmRemovalAlert';
import ProductItemScreen from '../ProductItemScreen';
import { deleteProduct } from '../../redux/actions/adminActions';

const AdminProductScreen = () => {
    const cancelRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { products, productUpdate, loading, error } = useSelector((state) => state.product);
    const toast = useToast();
    const [productToDelete, setProductToDelete] = useState(null);
    useEffect(() => {
        dispatch(getProducts()); // Mindig lekérjük az aktuális terméklistát a szerverről
        dispatch(resetProductError());
    
        if (productUpdate) {
            toast({
                description: 'Product has been updated.',
                status: 'success',
                isClosable: true,
            });
            dispatch(getProducts()); // Újra lekérjük a friss terméklistát
        }
    }, [dispatch, toast, productUpdate]);
    

    const openDeleteConfirmBox = (product) => {
        setProductToDelete(product);
        onOpen();
    };


    return (
        <Box p={4}>
            {error && toast({ description: error, status: 'error', isClosable: true })}
            {loading ? (
                <Wrap justify='center'>
                    <Spinner size='xl' color='cyan.500' />
                </Wrap>
            ) : (
                <TableContainer>
                    <Table variant='simple' size='lg'>
                        <Thead bg='gray.100'>
                            <Tr>
                                <Th>ID</Th>
                                <Th>NAME</Th>
                                <Th>PRICE</Th>
                                <Th>CATEGORY</Th>
                                <Th>BRAND</Th>
                                <Th>ACTIONS</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {products.length > 0 && products.map((product) => (
                                <ProductItemScreen
                                    key={product._id}
                                    product={product}
                                    onDelete={openDeleteConfirmBox} 
                                />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}

       
        </Box>
    );
};

export default AdminProductScreen;
