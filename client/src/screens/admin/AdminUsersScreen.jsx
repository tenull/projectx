import {
    Box,
    TableContainer,
    Th,
    Tr,
    Table,
    Td,
    Thead,
    Tbody,
    useDisclosure,
    Alert,
    Stack,
    Spinner,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Wrap,
    useToast,
    IconButton,
    Text,

} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, resetErrorAndRemoval } from "../../redux/actions/adminActions";
import { updateUser } from "../../redux/actions/adminActions";
import ConfirmRemovalAlert from "../../components/ConfirmRemovalAlert";
import ConfirmAdminChangeAlert from "../../components/ConfirmAdminChangeAlert"
import { useNavigate } from "react-router-dom";
const AdminUsersScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAdminOpen, onOpen: openAdminModal, onClose: closeAdminModal } = useDisclosure();
    const cancelRef = useRef();
    const [userToDelete, setUserToDelete] = useState("");
    const [userToEdit, setUserToEdit] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, userRemoval, userList, userAdmin } = useSelector((state) => state.admin);
    const { userInfo } = useSelector((state) => state.user);
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(resetErrorAndRemoval());
        if (userRemoval) {
            toast({
                description: "User has been removed.",
                status: "success",
                isClosable: true,
            });
        }
        if (userAdmin) {
            toast({
                description: "Felhasználó Admin lett.",
                status: "success",
                isClosable: true,
            });
        }
        // if (!userAdmin) {
        //     toast({
        //         description: "Felhasználó nem Admin.",
        //         status:'warning',
        //         isClosable: true,
        //     });
        // }

    }, [dispatch, toast, userRemoval, userAdmin,]);

    const openDeleteConfirmBox = (user) => {
        setUserToDelete(user);
        onOpen();
    };

    const handleAdminChange = (user) => {
        setUserToEdit(user);
        openAdminModal();
    };

    return (
        <Box>
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Upps!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {loading ? (
                <Wrap justify="center">
                    <Stack direction="row" spacing="4">
                        <Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="cyan.500" size="xl" />
                    </Stack>
                </Wrap>
            ) : (
                <Box>
                    <Text my={10} textAlign='center' fontSize='xl' fontWeight='bold'>Felhasználók</Text>
                    <TableContainer>
                        <Table variant="striped" colorScheme="gray" size={{ base: "sm", md: "md" }}>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Név</Th>
                                    <Th>Email</Th>
                                    <Th>Regisztráció</Th>
                                    <Th>Admin</Th>
                                    <Th>Műveletek</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {userList &&
                                    userList.map((user) => (
                                        <Tr key={user._id}>
                                            <Td>{user._id}</Td>
                                            <Td>{user.name} {user._id === userInfo._id ? "(You)" : ""}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{new Date(user.createdAt).toDateString()}</Td>
                                            <Td>
                                                {user.isAdmin ? (
                                                    <CheckCircleIcon color="green.500" />
                                                ) : (
                                                    <FaTimes color="red" />
                                                )}
                                            </Td>
                                            <Td>
                                                <IconButton
                                                    aria-label="Admin státusz módosítása"
                                                    icon={user.isAdmin ? <FaEdit /> : <FaEdit />}
                                                    colorScheme={user.isAdmin ? "blue" : "blue"}
                                                    mr={2}
                                                    onClick={() => handleAdminChange(user)}
                                                />
                                                <IconButton
                                                    aria-label="Törlés"
                                                    icon={<DeleteIcon />}
                                                    colorScheme="red"
                                                    isDisabled={user._id === userInfo._id}
                                                    onClick={() => openDeleteConfirmBox(user)}
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                        <ConfirmRemovalAlert
                            isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}
                            cancelRef={cancelRef}
                            itemToDelete={userToDelete}
                            redirectUrl='/admin/felhasznalok'
                            deleteAction={deleteUser}
                            navigate={navigate}
                        />
                        <ConfirmAdminChangeAlert
                            isOpen={isAdminOpen}
                            onClose={closeAdminModal}
                            cancelRef={cancelRef}
                            updateUser={updateUser}
                            user={userToEdit}
                            redirectUrl='/admin/felhasznalok'
                            navigate={navigate}
                        />
                    </TableContainer>
                </Box>

            )
            }
        </Box >
    );
};

export default AdminUsersScreen;
