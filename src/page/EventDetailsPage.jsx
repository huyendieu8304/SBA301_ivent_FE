import {Box, Divider, Typography} from "@mui/material";
import {Container} from "@mui/material";
import {Stack} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import {DateRange} from
import { CalendarToday, Place } from "@mui/icons-material"

import {useState} from "react";

const EVENT = {
    "name": "Hội chợ Việc Làm 2025",
    "isOnline": "false",
    "province": "Hà Nội",
    "ward": "Nam Từ Liêm",
    "location": "Trường ĐH Quốc gia",
    "startTime": "2025-07-10T08:00:00",
    "endTime": "2025-07-10T17:00:00",
    "startSellingTicketTime": "2025-06-01T00:00:00",
    "endSellingTicketTime": "2025-07-09T23:59:59",
    "eventLogoUrl": "https://salt.tkbcdn.com/ts/ds/99/8a/d8/1886112c146bb363db5a80d66fd6a3c4.jpg",
    "bannerUrl": "https://salt.tkbcdn.com/ts/ds/99/8a/d8/1886112c146bb363db5a80d66fd6a3c4.jpg",
    "description": "Hội chợ giúp sinh viên kết nối với nhà tuyển dụng.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos\n" +
        "        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,\n" +
        "        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum\n" +
        "        quasi quidem quibusdam.",
    "organizerLogoUrl": "https://salt.tkbcdn.com/ts/ds/36/f9/e8/225e653d49cff35c218bf1b898558d1c.png",
    "organizerName": "Bộ GD & ĐT",
    "organizerInformation": "Tổ chức bởi Bộ Giáo dục và các doanh nghiệp liên kết"
}

function EventDetailsPage(props) {

    const [eventDetails, setEventDetails] = useState(EVENT);

    return (
        <>
            <Box sx={{
                margin: "-24px !important",
                height: "100%",
                background: 'linear-gradient(to bottom, #2b2b2e 0%, #000000 100%)'
                // width: "100%",
            }}>
                {/*todo:responsive*/}
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
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                zIndex: 1
                            },
                            '&::before': {
                                backgroundColor: '#27272a',
                                top: '30px',
                                right: '66.5%',
                            },
                            '&::after': {
                                backgroundColor: '#030303',
                                bottom: '30px',
                                right: '66.5%'
                            }
                        }}
                    >

                        <Box id={"left-content"} sx={{
                            flex: {
                                md: "0 0 100%", //column 100%
                                lg: "0 0 30%"  //row 70%
                            },
                            maxWidth: {md: '100%', lg: '30%'},
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
                                                gutterBottom={"1"}
                                                sx={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontFamily: "Arial",
                                                }}
                                    >
                                        {eventDetails.name}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <CalendarToday sx={{ fontSize: 20, color: "#b0b0b0" }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#4caf50",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {/*todo: format date*/}
                                            17:00 - 19:00, 22 Tháng 06, 2025
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 3 }}>
                                        <Place sx={{ fontSize: 20, color: "#4caf50", mt: 0.2 }} />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#4caf50",
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
                                                {`${eventDetails.ward}, ${eventDetails.province}`}
                                            </Typography>
                                        </Box>
                                    </Stack>


                                </Stack>

                                <Stack>
                                    <Box
                                        sx={{
                                            height: "3px",
                                            background: "#555",
                                            // mb: 3,
                                        }}
                                    />
                                    <Typography variant="body2"
                                                sx={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontFamily: "Arial",
                                                }}
                                    >
                                        {eventDetails.name}
                                    </Typography>
                                    <Typography variant="body2"
                                                sx={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontFamily: "Arial",

                                                }}
                                    >
                                        {eventDetails.name}
                                    </Typography>

                                </Stack>
                            </Stack>
                        </Box>
                        <Box id="right-content"
                             component="img"
                             src={eventDetails.bannerUrl}
                             alt={eventDetails.name}
                             loading="lazy"
                             sx={{
                                 flex: {
                                     md: '0 0 100%',
                                     lg: '0 0 70%'
                                 },
                                 maxWidth: {
                                     md: '100%',
                                     lg: '70%'
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
                                gutterBottom={"4"}
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                Giới thiệu
                            </Typography>
                            <Divider/>
                            <Typography variant="body1" sx={{
                                marginTop: "24px",
                            }}>
                                {eventDetails.description}
                            </Typography>
                        </Stack>
                        <Stack
                            id="event-ticket-box"
                            sx={{
                                marginTop: "40px",
                                background: "#ffffff",
                                padding: "24px",
                                borderRadius: "10px",
                            }}
                        >
                            {/*//todo: handle ticket type*/}
                        </Stack>
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
                                gutterBottom={"4"}
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                Ban tổ chức
                            </Typography>
                            <Divider/>
                            <Stack direction={"row"} sx={{}}>
                                <Box
                                    id="organizer-logo"
                                    component="img"
                                    src={eventDetails.organizerLogoUrl}
                                    sx={{}}
                                ></Box>
                                <Box
                                    id="organizer-description"
                                    sx={{}}
                                >
                                    <Typography
                                        id="organizer-name"
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
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