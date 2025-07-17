import { Box, Text, Stack, Container, useBreakpointValue } from '@chakra-ui/react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import DashboardChart from './DasboardChart';
import { useDispatch } from 'react-redux';
import { getAllOrders, resetErrorAndRemoval } from '../redux/actions/adminActions';

const AdminLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {  loading, orders, } = useSelector((state) => state.admin);
    const isDashboard = location.pathname === "/admin";
    
    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(resetErrorAndRemoval());
    }, [dispatch]);

    // Use Chakra's useBreakpointValue to conditionally apply display property
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box>
            <Text textAlign="center" fontSize="2xl" fontWeight="bold">Admin felület</Text>
            <Container maxW="container.xl" display="flex" flexDirection={isMobile ? "column" : "row"}>
                {/* Sidebar menu visible only on large screens */}
                <Box
                    display={{ base: 'none', md: 'block' }}
                    width="20%"
                    p={4}
                    borderRight="1px solid gray"
                >
                    <Stack spacing={4}>
                        <NavLink to="/admin/rendeles"><Text>Rendelések</Text></NavLink>
                        <NavLink to="/admin/felhasznalok"><Text>Felhasználók</Text></NavLink>
                        <NavLink to="/admin/termekek"><Text>Termékek</Text></NavLink>
                        <NavLink to="/admin/ujtermek"><Text>Új termék hozzáadása</Text></NavLink>
                        <NavLink to="/admin/uzenet"><Text>Üzenet</Text></NavLink>
                    </Stack>
                </Box>

                <Box
                    display={{ base: 'block', md: 'none' }}
                    flexWrap='wrap'
                    width="100%"
                    p={4}
                    borderBottom="1px solid gray"
                    mb={4}
                >
                    <Stack fontSize='xs' direction="row" textAlign='center' spacing={2} justify="center">
                        <NavLink to="/admin/rendeles"><Text>Rendelések</Text></NavLink>
                        <NavLink to="/admin/felhasznalok"><Text>Felhasználók</Text></NavLink>
                        <NavLink to="/admin/termekek"><Text>Termékek</Text></NavLink>
                        <NavLink to="/admin/ujtermek"><Text>Új termék hozzáadása</Text></NavLink>
                        <NavLink to="/admin/uzenet"><Text>Üzenet</Text></NavLink>
                    </Stack>
                </Box>

                {/* Content area */}
                <Box width={{ base: '100%', md: '80%' }} p={4}>
                    {isDashboard && <DashboardChart orders={orders} loading={loading} />}
                    <Outlet />
                </Box>
            </Container>
        </Box>
    );
};

export default AdminLayout;
