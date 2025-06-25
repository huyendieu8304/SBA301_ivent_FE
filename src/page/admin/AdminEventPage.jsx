import React, {useEffect, useRef, useState} from "react";
import eventApi from "../../api/service/eventAdminApi";
import {useNavigate} from "react-router";
import dayjs from "dayjs";
import {Box, Card, CardContent, Chip, Container, Typography, useTheme} from "@mui/material";
import TableComponent from "../../component/TableComponent";
import LoadingComponent from "../../component/LoadingComponent";

const EventListPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();

    const columns = [
        { field: 'name', headerName: 'Tên sự kiện', width: 330, flex: 1, align: "center" },
        { field: 'province', headerName: 'Địa điểm', width: 300, flex: 1, align: "center"},
        { field: 'startTime', headerName: 'Ngày bắt đầu', width: 300, valueGetter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm'), flex: 1, align: "center"},
        { field: 'endTime', headerName: 'Ngày kết thúc', width: 300, valueGetter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm'), flex: 1, align: "center"},
        { field: 'status', headerName: 'Trạng thái', width: 160, flex: 1, align: "center",
        renderCell: (params) => (
            <Box sx={{height: '100%'}}>
                {params.value === "APPROVED" ? (<Chip label="Approved" sx={{backgroundColor: theme.palette.primary.main, color: "white", fontWeight: "bold"}}/>) : (<Chip label="Denied"  sx={{backgroundColor: "red", color: "white", fontWeight: "bold"}}/>)}
            </Box>
        )}
    ];
    useEffect(() => {
        setIsLoading(true);
        eventApi.getAllAdminEvents(getDataSuccess,getDataFail)
    }, []);

    const getDataSuccess = (data) => {
        setEvents(data);
        setIsLoading(false);
    }

    const getDataFail = (error) => {
        console.log("error",error);
        setIsLoading(false);
        navigate("/error", {
            state: {
                message: error.response.data.message,
                code: error.status,
            }
        })
    }

    return (
        <>
            (
            <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
                <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                           Tất cả Sự kiện
                        </Typography>
                        <TableComponent columns={columns} data={events} handleClickRow={() => {}}/>
                    </CardContent>
                </Card>
                {isLoading && <LoadingComponent />}
            </Container>
            );
        </>
    );

};

export default EventListPage;
