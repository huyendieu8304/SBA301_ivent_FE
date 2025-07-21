import React, {useEffect, useRef, useState} from "react";
import eventApi from "../../api/service/./operatorApi.jsx";
import {useNavigate} from "react-router";
import dayjs from "dayjs";
import {Box, Button, Card, CardContent, Chip, Container, TextField, Typography, useTheme} from "@mui/material";
import TableComponent from "../../component/TableComponent";
import LoadingComponent from "../../component/LoadingComponent";
import {MESSAGE_TYPES, PAGE_SIZE_OPTIONS} from "../../common/Constant.jsx";
import {messageService} from "../../service/MessageService.jsx";

const EventListPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(PAGE_SIZE_OPTIONS.at(0));
    const [eventName, setEventName] = useState("");
    const theme = useTheme();
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const columns = [
        { field: 'name', headerName: 'Tên sự kiện', width: 330, flex: 1, align: "center" },
        { field: 'province', headerName: 'Thành phố', width: 300, flex: 1, align: "center"},
        { field: 'ward', headerName: 'Địa điểm', width: 300, flex: 1, align: "center"},
        { field: 'organizerName', headerName: 'Tên tổ chức', width: 300, flex: 1, align: "center"},
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


    ];

    useEffect(() => {
        if (page !== undefined && size !== undefined) {
            setIsSearching(false);
            setIsLoading(true);
            eventApi.getAllOperatorEvents(page, size, eventName, getDataSuccess, getDataFail);
        }
    }, [isSearching]);

    const getDataSuccess = (data) => {
        setData(data);
        setPage(data.pageable.pageNumber + 1);
        setSize(data.pageable.pageSize);
        setIsLoading(false);
    }

    const getDataFail = (error) => {
        console.log("error",error);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
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
