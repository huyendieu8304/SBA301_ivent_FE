import {Card, CardContent, Stack, Typography} from "@mui/material";
import {BarChart} from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import {formatMoney} from "../../common/FormatFunction.jsx";


const fakeData = [
    {name: "Vé loại 1", totalQuantity: 50, remain: 20, price: 100000},
    {name: "Vé loại 2", totalQuantity: 80, remain: 20, price: 100000},
    {name: "Vé loại 3", totalQuantity: 70, remain: 0, price: 100000}
];

function MyEventStatistic({ticketTypes}) {
    // const  ticketTypes = fakeData

    if (ticketTypes.length === 0) {
        return <Typography>Không có dữ liệu</Typography>;
    }

    const labels = ticketTypes.map(item => item.name);

    const soldData = ticketTypes.map(item => ({
        percent: Math.round(((item.totalQuantity - item.remain) / item.totalQuantity) * 100),
        actual: item.totalQuantity - item.remain
    }));

    const remainData = ticketTypes.map(item => ({
        percent: Math.round((item.remain / item.totalQuantity) * 100),
        actual: item.remain
    }));

    const BAR_HEIGHT = 28; // chiều cao mỗi bar (có thể chỉnh: 24-32 tùy mảnh bao nhiêu)
    const chartHeight = ticketTypes.length * BAR_HEIGHT + 60; // +60 để chừa padding/top space


    const revenueData = ticketTypes.map(item => ({
        label: item.name,
        value: (item.totalQuantity - item.remain) * Number(item.price)
    }));

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);

    return (
        <Stack
            direction="row"
            gap={2}
            sx={{
                margin: '20px 10px',
            }}
        >
            <Card
                sx={{width: '100%'}}
            >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Tình hình bán vé
                    </Typography>

                    <BarChart
                        height={chartHeight}
                        barCategoryGap={60}
                        xAxis={[{
                            type: 'number',
                            max: 100,
                            min: 0,
                            // label: 'Phần trăm (%)',
                            valueFormatter: (v) => `${v}%`,
                        }]}
                        yAxis={[{
                            data: labels,
                            scaleType: 'band',
                            // label: 'Loại vé',
                            tickLabelStyle: {
                                fontSize: 14,
                                whiteSpace: 'pre-line',
                                wordBreak: 'break-word',
                            },
                            width: 80  // tăng chiều rộng hiển thị label
                        }]}
                        series={[
                            {
                                data: soldData.map(d => d.percent),
                                label: 'Đã bán',
                                stack: 'total',
                                color: '#388e3c',
                                barSize: 16,
                                valueFormatter: (v, context) => {
                                    const index = context.dataIndex;
                                    const actual = soldData[index].actual;
                                    const total = ticketTypes[index].totalQuantity;
                                    return `${actual} vé / ${total}`;
                                },
                            },
                            {
                                data: remainData.map(d => d.percent),
                                label: 'Còn lại',
                                stack: 'total',
                                color: '#a5d6a7',
                                barSize: 16,
                                // valueFormatter: (v, context) => `${remainData[context.dataIndex].actual} vé`,
                                valueFormatter: (v, context) => {
                                    const index = context.dataIndex;
                                    const actual = remainData[index].actual;
                                    const total = ticketTypes[index].totalQuantity;
                                    return `${actual} vé / ${total}`;
                                }
                            }
                        ]}
                        layout="horizontal"
                        grid={{horizontal: true}}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Doanh thu: <span style={{color: "#2c9a31", fontWeight: 600}}>{formatMoney(totalRevenue)} VND</span>
                    </Typography>

                    <PieChart
                        series={[
                            {
                                data: revenueData,
                                innerRadius: 40,
                                outerRadius: 100,
                                paddingAngle: 3,
                                cornerRadius: 4,
                            }
                        ]}
                        width={300}
                        height={200}
                        legend={{position: 'right'}}
                    />
                </CardContent>
            </Card>
        </Stack>
    );
}

export default MyEventStatistic;