import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const processData = (orders) => {
    if (!Array.isArray(orders) || orders.length === 0) return []; 

    const summary = {};
  
    orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const month = date.toLocaleString("hu-HU", { month: "short" });

        if (!summary[month]) {
            summary[month] = { month, orders: 0, revenue: 0 };
        }

        summary[month].orders += 1;
        summary[month].revenue += order.totalPrice;
    });

    return Object.values(summary);
};

const DashboardChart = ({ orders, loading }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (Array.isArray(orders) && orders.length > 0) {
            setChartData(processData(orders));
        }
    }, [orders]); 

    if (loading || !Array.isArray(orders)) {
        return <Text textAlign="center">Adatok betöltése...</Text>;
    }

    return (
        <Box p={4} boxShadow="md" borderRadius="lg" bg="white">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Rendelések statisztikája</Text>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#3182CE" name="Rendelések száma" />
                    <Bar dataKey="revenue" fill="#82ca9d" name="Bevétel (Ft)" />
                </BarChart>
            </ResponsiveContainer>
            <Box>
                <Text>Összes Rendelés: {chartData.reduce((sum, chart) => sum + chart.orders, 0)}</Text>
                <Text>Összes bevétel: {chartData.reduce((sum, chart) => sum + chart.revenue, 0)} Ft</Text>
            </Box>
        </Box>
    );
};

export default DashboardChart;
