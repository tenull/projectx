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
    useToast,
    IconButton,
    Text,
    Container
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, resetErrorAndRemoval } from "../../redux/actions/adminActions";
import ConfirmRemovalAlert from "../../components/ConfirmRemovalAlert";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from 'react-router-dom';
const AdminUsersScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [userToDelete, setUserToDelete] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, userRemoval, userList } = useSelector((state) => state.admin);
    const { userInfo } = useSelector((state) => state.user);
    const toast = useToast();
    console.log(userList)
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
    }, [dispatch, toast, userRemoval]);

    const openDeleteConfirmBox = (user) => {
        setUserToDelete(user);
        onOpen();
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
                <Box minH='2xl'>
                    <Text my={10} textAlign='center' fontSize='xl' fontWeight='bold'>Felhasználók</Text>
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

                        {/* Tartalom */}
                        <Box flex="1" p={4}>
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
                                                            aria-label="Szerkesztés"
                                                            icon={<FaEdit />}
                                                            colorScheme="blue"
                                                            mr={2}
                                                            onClick={() => navigate(`/admin/user/${user._id}/edit`)}
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
                            </TableContainer>
                            <ConfirmRemovalAlert
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onClose={onClose}
                                cancelRef={cancelRef}
                                itemToDelete={userToDelete}
                                deleteAction={deleteUser}
                            />
                        </Box>
                    </Container>
                </Box>

            )
            }
        </Box >
    );
};

export default AdminUsersScreen;
