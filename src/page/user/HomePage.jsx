import {Container, ImageList, Typography} from "@mui/material";
import FakeData from "../../FakeData.jsx";
import EventCard from "../../component/EventCard.jsx";
import CardSliderReactSlick from "../../component/cardSlider/CardSliderReactSlick.jsx";
import {useEffect, useState} from "react";
import eventApi from "../../api/service/eventApi.jsx";
import {useNavigate} from "react-router";
import LoadingComponent from "../../component/LoadingComponent.jsx";

const HomePage = () => {

    const [latestEvents, setLatestEvents] = useState([]);
    const [categoryEvents, setCategoryEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        eventApi.getHomePageData(getDataSuccess, getEventDetailFailure)
    }, []);

    const getDataSuccess = (data) => {
        setLatestEvents(data.latestEvents);
        setCategoryEvents(Object.entries(data.categoryEvents));
        setIsLoading(false)
    }

    const getEventDetailFailure = (error) => {
        setIsLoading(false);
        navigate("/error", {
            state: {
                message: error.response.data.message,
                code: error.status,
            }
        })
    }

    if (isLoading) return <LoadingComponent/>
    return (
        <Container maxWidth="lg">
            <CardSliderReactSlick
                dotDisplay={true}
                infinite={true}
                slidesToShow={3}
                slidesToScroll={1}
                autoplay={false}
                events={latestEvents}
            />

            {categoryEvents?.length > 0 && categoryEvents.map(([categoryName, events]) => (
                <>
                    <Typography
                        key={`${categoryName}-id`}
                        variant="h5"
                        color={"primary"}
                        gutterBottom
                    >
                        {categoryName}
                    </Typography>
                    <ImageList
                        key={categoryName}
                        sx={{width: "100%"}}
                        cols={4}
                        rowHeight="auto"
                        variant="standard"
                        gap={20}
                    >
                        {events.map((item, index) => (
                            <EventCard event={item} key={`${item.id}-${index}`}/>
                        ))}
                    </ImageList>
                </>
            ))}
        </Container>
    )
}
export default HomePage;