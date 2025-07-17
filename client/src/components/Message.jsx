
import {
    Button,
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogOverlay,
} from '@chakra-ui/react';


const Message = ({ message,isOpen, onClose }) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
                        Kedves Vásárlóink!
                    </AlertDialogHeader>
                    <AlertDialogBody textAlign='justify'>
                    <div dangerouslySetInnerHTML={{ __html: message }} />
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>Bezár</Button>
                        <Button colorScheme="red" onClick={onClose} ml={3}>
                            Értem
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};


export default Message;