import {Box, Button, Chip, Divider, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Container} from "@mui/material";
import {Stack} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import {DateRange} from
import {CalendarToday, NavigateNext, Place} from "@mui/icons-material"

import {useEffect, useState} from "react";
import List from "@mui/material/List";
import eventApi from "../api/service/operatorApi.jsx";
import LoadingComponent from "../component/LoadingComponent.jsx";
import {formatDateTimeRange, formatMoney} from "../common/FormatFunction.jsx";
import {isInSellingTicketPeriod} from "../common/ValidateFunction.jsx";
import BuyTicketButton from "../component/BuyTicketButton.jsx";
import {useNavigate, useParams} from "react-router";


function EventDetailsPage(props) {
    const [eventDetails, setEventDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

}