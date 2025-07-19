import {Card, CardContent, CardMedia, Tooltip, Typography, useTheme} from "@mui/material";
import {formatVNDateFromISO} from "../common/FormatFunction.jsx";
import {NavLink} from "react-router";

const EventCard = ({event}) => {
    const theme = useTheme();
    return (
        <Card sx={{
            width: "100%", height: "270px",
            backgroundColor: theme.palette.backgroundColor.main, boxShadow: "none",
        }}>
            <CardMedia
                component="img"
                alt="event banner"
                height="140"
                image={event.bannerUri}
                sx={{ borderRadius: "10px" }}
            />
            <CardContent sx={{height: "fit-content", padding: "8px 0 0 0 !important", color: "white"}}>
                <Tooltip title={event.name} placement="top" arrow>
                    <NavLink to={`/event/${event.id}`}
                             style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            fontFamily: "Arial",
                            display: "-webkit-box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            height: "50px",
                        }}
                    >
                        {event.name}
                    </Typography>
                    </NavLink>
                </Tooltip>

                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                        fontSize: "14px",
                        color: "#12B76A",
                        fontFamily: "Arial",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {event.isOnline ? "Sự kiện online" : `${event.province}, ${event.ward}`}
                </Typography>

                <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{
                        fontSize: "13px",
                        fontFamily: "Arial",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {formatVNDateFromISO(event.startTime)}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default EventCard;