import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";


const ConfirmAdminChangeAlert = ({ isOpen, onClose, cancelRef, updateUser,user,navigate,redirectUrl }) => {
    const dispatch = useDispatch();

    if (!user) return null; 

    const toggleAdminStatus = () => {
        dispatch(updateUser(user._id, { isAdmin: !user.isAdmin }));
        navigate(redirectUrl)
        onClose();
    };

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Admin jog módosítása
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Biztosan {user.isAdmin ? "eltávolítod" : "hozzáadod"} {user.name}-t adminnak?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Mégse
                        </Button>
                        <Button colorScheme="blue" onClick={toggleAdminStatus} ml={3}>
                            {user.isAdmin ? "Eltávolítás" : "Adminná tétel"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default ConfirmAdminChangeAlert;
