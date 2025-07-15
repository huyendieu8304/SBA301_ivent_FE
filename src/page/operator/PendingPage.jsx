import React, {useEffect, useRef, useState} from "react";
import eventApi from "../../api/service/./operatorApi.jsx";
import {useNavigate} from "react-router";
import dayjs from "dayjs";
import {Box, Button, Card, CardContent, Chip, Container, TextField, Typography, useTheme} from "@mui/material";
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
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 160,
            flex: 1,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',        // căn giữa theo chiều dọc
                        justifyContent: 'flex-start',// căn trái theo chiều ngang
                        height: '100%',
                        width: '100%',
                        pl: 1
                    }}
                >
                    <Chip
                        label={params.value === "APPROVED" ? "Approved" : "Denied"}
                        sx={{
                            backgroundColor: params.value === "APPROVED" ? theme.palette.primary.main : "red",
                            color: "white",
                            fontWeight: "bold"
                        }}
                    />
                </Box>
            )
        }
        ,
        {
            field: 'actions',
            headerName: 'Chi tiết',
            width: 120,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleDetailClick(params.row)}
                    sx={{ textTransform: "none" }}
                >
                    Chi tiết
                </Button>
            )
        }


    ];


    useEffect(() => {
        setIsLoading(true);
        eventApi.getPendingEvent(getDataSuccess,getDataFail)
    }, []);

    const handleDetailClick = (row) => {
        navigate(`/operator/events/${row.id}`);
    }

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
    // const fetchEvents = (name = "") => {
    //     setIsLoading(true);
    //     eventApi.getAllOperatorEvents(accountId, page, size, name, getDataSuccess, getDataFail);
    // };
    // const handleSearchSubmit = (e) => {
    //     e.preventDefault();
    //     fetchEvents(eventName);
    // };

    return (
        <>
            (
            <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
                <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                            Tất cả Sự kiện
                        </Typography>
                        {/*<form onSubmit={handleSearchSubmit}>*/}
                        {/*    <Box display="flex" alignItems="center" gap={2} mb={2}>*/}
                        {/*        <TextField*/}
                        {/*            label="Nhập tên sự kiện"*/}
                        {/*            variant="outlined"*/}
                        {/*            value={eventName}*/}
                        {/*            onChange={(e) => setEventName(e.target.value)}*/}
                        {/*            size="small"*/}
                        {/*            sx={{width: 300}}*/}
                        {/*        />*/}
                        {/*        <Button type="submit" variant="contained" color="primary" size="medium"*/}
                        {/*                sx={{color: "white", fontWeight: "bold", textTransform: "none"}}>*/}
                        {/*            Tìm kiếm*/}
                        {/*        </Button>*/}
                        {/*    </Box>*/}
                        {/*</form>*/}
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
