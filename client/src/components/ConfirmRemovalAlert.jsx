import {
	Button,
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogBody,
	AlertDialogHeader,
	AlertDialogOverlay,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const ConfirmRemovalAlert = ({ isOpen, onClose, cancelRef, itemToDelete, deleteAction,navigate,redirectUrl }) => {
	const dispatch = useDispatch();
	const onDeleteItem = () => {
		dispatch(deleteAction(itemToDelete._id));
		navigate(redirectUrl)
		onClose();
	};
	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						 {itemToDelete.name} Törlése
					</AlertDialogHeader>
					<AlertDialogBody>Biztos vagy benne? Nem tudod utána megváltoztatni.</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Mégse
						</Button>
						<Button colorScheme='red' onClick={onDeleteItem} ml={3}>
							Törlés {itemToDelete.name}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default ConfirmRemovalAlert;
