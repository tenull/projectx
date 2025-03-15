import { Tr, Td, IconButton,useDisclosure } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ConfirmRemovalAlert from '../components/ConfirmRemovalAlert';
import { deleteProduct } from '../redux/actions/adminActions';
import { useRef } from 'react';

const ProductItemScreen = ({ product, onDelete }) => {
    const cancelRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

    const openDeleteConfirmBox = () => {
		onOpen();
	};

    return (
<>

        <Tr>
            <Td>{product._id}</Td>
            <Td>{product.name}</Td>
            <Td>${product.price}</Td>
            <Td>{product.category}</Td>
            <Td>{product.brand}</Td>
            <Td>
                <IconButton
                    as={Link}
                    to={`/termekek/${product._id}/edit`}
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
			/>
        </>

    );
};

export default ProductItemScreen;
