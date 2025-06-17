import {Box, Container, ImageList, Stack} from "@mui/material";
import FakeData from "../FakeData.jsx";
import EventCard from "../component/EventCard.jsx";
import CardSliderReactSlick from "../component/cardSlider/CardSliderReactSlick.jsx";


const HomePage = () => {
    return (
        <>
            <Container maxWidth="lg">
                <CardSliderReactSlick dotDisplay={true} infinite={true} slidesToShow={3} slidesToScroll={1} autoplay={false}/>

                <ImageList sx={{width: "100%"}} cols={4} rowHeight="auto" variant="standard" gap={20}>
                    {FakeData.map((item) => (
                        <EventCard event={item} key={item.id} />
                    ))}
                </ImageList>
            </Container>
        </>
    )
}
export default HomePage;