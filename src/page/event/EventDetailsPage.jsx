import {Box, Chip, Divider, ListItem, ListItemText, Typography} from "@mui/material";
import {Container} from "@mui/material";
import {Stack} from "@mui/material";
import {CalendarToday, NavigateNext, Place} from "@mui/icons-material"
import {useEffect, useState} from "react";
import List from "@mui/material/List";
import eventApi from "../../api/service/eventApi.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {formatDateTimeRange, formatMoney} from "../../common/FormatFunction.jsx";
import BuyTicketButton from "../../component/BuyTicketButton.jsx";
import {useNavigate, useParams} from "react-router";

const GREEN_TEXT = "#4caf50"

const areAllTicketsSoldOut = (ticketTypes) => {
    if (!Array.isArray(ticketTypes)) return true; // nếu không có vé => coi như hết

    return ticketTypes.every(ticket => parseInt(ticket.remain) === 0);
};

function EventDetailsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [eventDetails, setEventDetails] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    const minPrice = eventDetails.ticketTypes?.length
        ? Math.min(...eventDetails.ticketTypes.map(ticket => parseFloat(ticket.price)))
        : null;
    const isSoldOut = areAllTicketsSoldOut(eventDetails.ticketTypes);

    useEffect(() => {
        setIsLoading(true);
        eventApi.getEventDetails(
            id,
            getEventDetailsSuccess,
            getEventDetailsFailure
        )
    }, [])

    const getEventDetailsSuccess = (data) => {
        setEventDetails(data);
        setIsLoading(false);
    }

    const getEventDetailsFailure = (data) => {
        setIsLoading(false);
        navigate("/error", {
            state: {
                message: data.response.data.message,
                code: data.status,
            }
        })
    }

    const navigateToBookingPage = () => {
        navigate(`/booking/${id}`);
    }

    //  1. check cái format date của sự kiện
    // : 2. load data từ backend
    //: 3. navigate to error page
    //: 4. Check nuts mua vé
    // : 5. check số lượng vé còn lại của từng vé
    //: 7. fix url navigate from home to this page
    //todo: 6. Responsive
    if (isLoading) return <LoadingComponent/>
    return (
        <>
            <Box sx={{
                margin: "-24px !important",
                height: "100%",
                background: 'linear-gradient(to bottom, #2b2b2e 0%, #000000 100%)'
                // width: "100%",
            }}>
                <Container maxWidth={"lg"}>
                    <Stack
                        direction={{md: 'column', lg: 'row'}}
                        sx={{
                            padding: "60px 0",
                            height: '40vh !important',
                            position: "relative",
                            '&::before, &::after': {
                                content: '""',
                                position: 'absolute',
                                right: 0,
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                zIndex: 1
                            },
                            '&::before': {
                                backgroundColor: '#27272a',
                                top: '30px',
                                right: '57%',
                            },
                            '&::after': {
                                backgroundColor: '#030303',
                                bottom: '30px',
                                right: '57%'
                            }
                        }}
                    >
                        <Box id={"left-content"} sx={{
                            flex: {
                                md: "0 0 100%", //column 100%
                                lg: "0 0 40%"  //row 70%
                            },
                            maxWidth: {md: '100%', lg: '40%'},
                            borderRadius: "30px 0 0 30px", //from top left clockwise
                            backgroundColor: "#38383D",
                            height: "100%",
                            overflowY: "hidden",

                        }}>
                            <Stack id={"text-bounding"} sx={{
                                // margin: "32px 32px 32px 32px",
                                padding: "32px 32px 32px 32px",
                                boxSizing: "border-box",
                                height: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            }}>
                                <Stack>
                                    <Typography variant="h4"
                                                gutterBottom={true}
                                                sx={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontFamily: "Arial",
                                                }}
                                    >
                                        {eventDetails.name}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{mb: 1}}>
                                        <CalendarToday sx={{fontSize: 20, color: "#b0b0b0"}}/>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: GREEN_TEXT,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {eventDetails.startTime && eventDetails.endTime && (
                                                formatDateTimeRange(eventDetails.startTime, eventDetails.endTime)
                                            )}
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" alignItems="flex-start" spacing={1} sx={{mb: 3}}>
                                        <Place sx={{fontSize: 20, color: GREEN_TEXT, mt: 0.2}}/>
                                        <Box>

                                            {eventDetails.isOnline ? (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: GREEN_TEXT,
                                                        fontWeight: "bold",
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    Online
                                                </Typography>
                                            ) : (
                                                <>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: GREEN_TEXT,
                                                            fontWeight: "bold",
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {eventDetails.location}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: "#b0b0b0",
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {eventDetails.ward && eventDetails.province && (
                                                            `${eventDetails.ward}, ${eventDetails.province}`
                                                        )}
                                                    </Typography>
                                                </>
                                            )}

                                        </Box>
                                    </Stack>
                                </Stack>

                                <Stack>
                                    <Box
                                        sx={{
                                            height: "3px",
                                            background: "#555",
                                        }}
                                    />
                                    {minPrice === null ? (
                                        <>
                                            <Stack direction="row" alignItems="center">
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        color: GREEN_TEXT,
                                                        fontWeight: "bold",
                                                        // paddingLeft: "4px",
                                                    }}
                                                >
                                                    Miễn phí
                                                </Typography>
                                                <NavigateNext fontSize={"large"}
                                                              sx={{color: GREEN_TEXT, marginLeft: "-8px"}}/>
                                            </Stack>
                                            <BuyTicketButton
                                                isSoldOut={isSoldOut}
                                                isFree={true}
                                                endTime={eventDetails.endTime}
                                                startSellingTicketTime={eventDetails.startSellingTicketTime}
                                                endSellingTicketTime={eventDetails.endSellingTicketTime}
                                                navigateToBookingPage={navigateToBookingPage}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography variant="body1" sx={{
                                                    marginTop: "10px",
                                                    fontWeight: "bold",
                                                    color: "white",
                                                }}>
                                                    Giá từ
                                                </Typography>
                                                <Stack direction="row" alignItems="center">
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            color: GREEN_TEXT,
                                                            fontWeight: "bold",
                                                            // paddingLeft: "4px",
                                                        }}
                                                    >
                                                        {formatMoney(minPrice.toString())} đ
                                                    </Typography>
                                                    <NavigateNext fontSize={"large"}
                                                                  sx={{color: GREEN_TEXT, marginLeft: "-8px"}}/>
                                                </Stack>
                                            </Stack>
                                            <BuyTicketButton
                                                isSoldOut={isSoldOut}
                                                isFree={false}
                                                endTime={eventDetails.endTime}
                                                startSellingTicketTime={eventDetails.startSellingTicketTime}
                                                endSellingTicketTime={eventDetails.endSellingTicketTime}
                                                navigateToBookingPage={navigateToBookingPage}
                                            />
                                        </>
                                    )
                                    }
                                </Stack>
                            </Stack>
                        </Box>
                        <Box id="right-content"
                             component="img"
                             src={eventDetails.bannerUri}
                             alt={eventDetails.name}
                             loading="lazy"
                             sx={{
                                 flex: {
                                     md: '0 0 100%',
                                     lg: '0 0 60%'
                                 },
                                 maxWidth: {
                                     md: '100%',
                                     lg: '60%'
                                 },
                                 height: "100%",
                                 objectFit: "cover",
                                 objectPosition: "50% 50%",
                                 borderRadius: "0 30px 30px 0", //from top left clockwise
                             }}
                        />
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                margin: "-24px !important",
                height: "100%",
                background: "#f5f7fc",
                // width: "100%",
                paddingBottom: "40px"
            }}>
                <Container maxWidth={"lg"}>
                    <Stack sx={{}}>
                        <Stack
                            id="event-description-box"
                            sx={{
                                marginTop: "40px",
                                background: "#ffffff",
                                padding: "24px",
                                borderRadius: "10px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom={true}
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                Giới thiệu
                            </Typography>
                            <Divider/>
                            <Typography
                                variant="body1"
                                sx={{ marginTop: "24px" }}
                                dangerouslySetInnerHTML={{ __html: eventDetails.description }}
                            />
                        </Stack>
                        {/*ticket types*/}
                        {eventDetails.ticketTypes?.length > 0 ? (
                            <Stack
                                id="event-ticket-box"
                                sx={{
                                    marginTop: "40px",
                                    background: "#27272a",
                                    padding: "24px",
                                    borderRadius: "10px",
                                }}
                            >
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "14px"
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        Thông tin vé
                                    </Typography>
                                    <Box sx={{
                                        paddingBottom: "4px",
                                    }}>
                                        {/*chèn nút mua vé vào đây*/}
                                        <BuyTicketButton
                                            isSoldOut={isSoldOut}
                                            isFree={minPrice === null}
                                            endTime={eventDetails.endTime}
                                            startSellingTicketTime={eventDetails.startSellingTicketTime}
                                            endSellingTicketTime={eventDetails.endSellingTicketTime}
                                            navigateToBookingPage={navigateToBookingPage}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        height: "2px",
                                        background: "#555",
                                        margin: "0 -24px !important",
                                    }}
                                />
                                <List sx={{
                                    margin: "0 -24px !important",
                                    padding: "0",
                                }}>
                                    {eventDetails?.ticketTypes?.map((ticket, index) => (
                                        <ListItem disablePadding key={index}
                                                  sx={{
                                                      backgroundColor: index % 2 === 0 ? "#2e2f32" : "#37373c",
                                                      padding: "4px 24px",
                                                      display: "flex",
                                                      justifyContent: "space-between"
                                                  }}
                                        >
                                            <ListItemText
                                                primary={ticket.name}
                                                sx={{
                                                    color: "white",
                                                    paddingLeft: "4px"
                                                }}
                                            />
                                            <Stack sx={{
                                                display: "flex",
                                                alignItems: "right",
                                                direction: "column",
                                            }}>
                                                <ListItemText
                                                    primary={`${formatMoney(ticket.price)} đ`}
                                                    sx={{
                                                        color: `${ticket.remain === 0 ? "#a6a6b0" : "#2dc275"}`,
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        minWidth: "100px"
                                                    }}
                                                />
                                                {ticket.remain === 0 &&
                                                    <Chip label="Hết vé" size="small" color="error"/>}
                                            </Stack>
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack>
                        ) : (
                            <Stack
                                id="event-ticket-box"
                                sx={{
                                    marginTop: "40px",
                                    background: "#27272a",
                                    padding: "24px",
                                    borderRadius: "10px",
                                }}
                            >
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        Thông tin vé
                                    </Typography>
                                    <Box sx={{
                                        paddingBottom: "4px",
                                    }}>
                                        <BuyTicketButton
                                            isSoldOut={isSoldOut}
                                            isFree={minPrice === null}
                                            endTime={eventDetails.endTime}
                                            startSellingTicketTime={eventDetails.startSellingTicketTime}
                                            endSellingTicketTime={eventDetails.endSellingTicketTime}
                                            navigateToBookingPage={navigateToBookingPage}
                                        />
                                    </Box>
                                </Box>
                            </Stack>
                        )}
                        <Stack
                            id="event-organizer-box"
                            sx={{
                                marginTop: "40px",
                                background: "#ffffff",
                                padding: "24px",
                                borderRadius: "10px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom={true}
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                Ban tổ chức
                            </Typography>
                            <Divider/>
                            <Stack direction="row" sx={{
                                marginTop: "24px",
                            }}>
                                <Box
                                    id="organizer-logo"
                                    component="img"
                                    src={eventDetails.organizerLogoUri}
                                    sx={{
                                        maxWidth: "20%",
                                        borderRadius: "10px",
                                    }}
                                ></Box>
                                <Box
                                    id="organizer-description"
                                    sx={{
                                        paddingLeft: "12px"
                                    }}
                                >
                                    <Typography
                                        id="organizer-name"
                                        variant="h6"
                                        gutterBottom={true}
                                        sx={{
                                            fontWeight: "bold",
                                            fontFamily: "'Roboto','Segoe UI','Noto Sans','sans-serif'"
                                        }}
                                    >
                                        {eventDetails.organizerName}
                                    </Typography>
                                    <Typography id="organizer-information">
                                        {eventDetails.organizerInformation}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default EventDetailsPage;