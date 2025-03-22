import { Tr, Td, IconButton,useDisclosure } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ConfirmRemovalAlert from '../components/ConfirmRemovalAlert';
import { deleteProduct } from '../redux/actions/adminActions';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const ProductItemScreen = ({ product, onDelete }) => {
    const cancelRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate()
    const openDeleteConfirmBox = () => {
		onOpen();
	};
    const redirectUrl = '/admin/termekek'


    return (
<>

        <Tr>
            <Td>{product.name}</Td>
            <Td>{product.packaking} kg</Td>
            <Td>{product.packingOf} tojásos</Td>
            <Td>{product.price} Ft</Td>
            <Td>{product.stock} db</Td>
            <Td>
                <IconButton
                    as={Link}
                    to={`/admin/termekek/${product._id}/edit`}
                    icon={<FaEdit />}
                    aria-label="Edit"
                    colorScheme="blue"
                    mr={2}
                />
                <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete"
                    colorScheme="red"
                    onClick={openDeleteConfirmBox}
                />
            </Td>
        </Tr>
        <ConfirmRemovalAlert
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				cancelRef={cancelRef}
				itemToDelete={product}
				deleteAction={deleteProduct}
                navigate={navigate}
                 redirectUrl={redirectUrl}
			/>
        </>

    );
};

export default ProductItemScreen;
