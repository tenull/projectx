import { Box, Text, Stack, Container } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <Box>
            <Text textAlign="center" fontSize="2xl" fontWeight="bold">Admin Console</Text>
            <Container maxW="container.xl" display="flex">
                <Box width="20%" p={4} borderRight="1px solid gray">
                    <Stack spacing={4}>
                        <NavLink to="/rendeles"><Text>Rendelések</Text></NavLink>
                        <NavLink to="/admin/legutolsorendeles"><Text>Legutolsó Rendelés</Text></NavLink>
                        <NavLink to="/felhasznalok"><Text>Felhasználók</Text></NavLink>
                        <NavLink to="/termekek"><Text>Termékek</Text></NavLink>
                        <NavLink to="/ujtermek"><Text>Új termék hozzáadása</Text></NavLink>
                        <NavLink to="/admin/uzenet"><Text>Kiírás</Text></NavLink>
                    </Stack>
                </Box>
                <Box width="80%" p={4}>
                    <Outlet />
                </Box>
                
            </Container> 
        </Box>
    );
};

export default AdminLayout;
