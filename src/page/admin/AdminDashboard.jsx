import {useOutletContext} from "react-router";
import {useEffect} from "react";
import {BarChart} from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import {Box, Card, CardContent, Container, Stack} from "@mui/material";

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
            width: 60,
        },
    ],
    height: 300,
};

function valueFormatter(value) {
    return `${value}mm`;
}

const dataset = [
    {
        london: 59,
        paris: 57,
        newYork: 86,
        seoul: 21,
        month: 'Jan',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        seoul: 28,
        month: 'Feb',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        seoul: 41,
        month: 'Mar',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        seoul: 73,
        month: 'Apr',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        seoul: 99,
        month: 'May',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        seoul: 144,
        month: 'June',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        seoul: 319,
        month: 'July',
    },
    {
        london: 65,
        paris: 60,
        newYork: 106,
        seoul: 249,
        month: 'Aug',
    },
    {
        london: 51,
        paris: 51,
        newYork: 95,
        seoul: 131,
        month: 'Sept',
    },
    {
        london: 60,
        paris: 65,
        newYork: 97,
        seoul: 55,
        month: 'Oct',
    },
    {
        london: 67,
        paris: 64,
        newYork: 76,
        seoul: 48,
        month: 'Nov',
    },
    {
        london: 61,
        paris: 70,
        newYork: 103,
        seoul: 25,
        month: 'Dec',
    },
];

const AdminDashboard = () => {
    const {setPageTitle} = useOutletContext();
    useEffect(() => {
        setPageTitle("Dashboard");
    }, []);
    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="column" spacing={2}>
                    <Box sx={{width: "100%"}}>
                        <Card variant="outlined">
                            <CardContent sx={{backgroundColor: 'white'}}>
                                <BarChart
                                    dataset={dataset}
                                    xAxis={[{dataKey: 'month'}]}
                                    series={[
                                        {dataKey: 'london', label: 'London', valueFormatter},
                                        {dataKey: 'paris', label: 'Paris', valueFormatter},
                                        {dataKey: 'newYork', label: 'New York', valueFormatter},
                                        {dataKey: 'seoul', label: 'Seoul', valueFormatter},
                                    ]}
                                    {...chartSetting}
                                />
                            </CardContent>
                        </Card>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{width: "50%"}}>
                            <Card variant="outlined">
                                <CardContent sx={{backgroundColor: 'white'}}>
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: 10, label: 'series A' },
                                                    { id: 1, value: 15, label: 'series B' },
                                                    { id: 2, value: 20, label: 'series C' },
                                                ],
                                            },
                                        ]}
                                        width={200}
                                        height={200}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{width: "50%"}}>
                            <Card variant="outlined">
                                <CardContent sx={{backgroundColor: 'white'}}>
                                    <LineChart
                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                        series={[
                                            {
                                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            },
                                        ]}
                                        height={300}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}

export default AdminDashboard;