import React, {useEffect, useRef, useState} from "react";
import eventApi from "../../api/service/./operatorApi.jsx";
import {useNavigate} from "react-router";
import dayjs from "dayjs";
import {Box, Button, Card, CardContent, Chip, Container, TextField, Typography, useTheme} from "@mui/material";
import TableComponent from "../../component/TableComponent";
import LoadingComponent from "../../component/LoadingComponent";
import {useAuth} from "../../context/AuthContext.jsx";
import {PAGE_SIZE_OPTIONS} from "../../common/Constant.jsx";

const EventListPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(PAGE_SIZE_OPTIONS.at(1));
    const [eventName, setEventName] = useState("");
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
            renderCell: (params) => {
                let label = "";
                let color = "";

                switch (params.value) {
                    case "APPROVED":
                        label = "Approved";
                        color = theme.palette.primary.main;
                        break;
                    case "REJECTED":
                        label = "Denied";
                        color = "red";
                        break;
                    case "PENDING":
                    default:
                        label = "Pending";
                        color = "orange";
                        break;
                }

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            height: '100%',
                            width: '100%',
                            pl: 1
                        }}
                    >
                        <Chip
                            label={label}
                            sx={{
                                backgroundColor: color,
                                color: "white",
                                fontWeight: "bold"
                            }}
                        />
                    </Box>
                );
            }

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
                    onClick={() => handleDetailClick(params.row.eventId)}
                    sx={{ textTransform: "none" }}
                >
                    Chi tiết
                </Button>
            )
        }


    ];


    useEffect(() => {
        setIsLoading(true);
        eventApi.getAllOperatorEvents(getDataSuccess,getDataFail)
    }, []);


    const getDataSuccess = (data) => {
        setEvents(data);
        setPage(d.pageable.pageNumber + 1);
        setSize(d.pageable.pageSize);
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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        setSize(10);
        setIsSearching(true);
    };
    const handlePaginationChange = (newPage, newSize) => {
        setPage(newPage);
        setSize(newSize);
        setIsSearching(true);
    }

    const handleDetailClick = (eventId) => {
        navigate(`/operator/${eventId}`);
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
                        <form onSubmit={handleSearchSubmit}>
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <TextField label="Tìm theo tên sự kiện" variant="outlined" value={eventName}
                                           onChange={(e) => setEventName(e.target.value)} size="small" sx={{width: 300}}/>
                                <Button type="submit" variant="contained" color="primary" size="medium"
                                        sx={{color: "white", textTransform: 'none'}}>
                                    Tìm kiếm
                                </Button>
                            </Box>
                        </form>
                        <TableComponent columns={columns} rows={data?.content || []} page={page} pageSize={size}
                                        totalRowCount={data?.totalElements || 0}
                                        handleClickRow={(id) => console.log("Click row id:", id)}
                                        handlePaginationChange={handlePaginationChange}/>
                    </CardContent>
                </Card>
                {isLoading && <LoadingComponent />}
            </Container>
            );
        </>
    );

};

export default EventListPage;
