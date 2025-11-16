import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSliderStyle.css"
import {Box, IconButton} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useNavigate} from "react-router";

const images = [
    {id: 1, url: "https://salt.tkbcdn.com/ts/ds/5a/37/c6/b5239073da24a288542c3a3a5aaa21d5.png"},
    {id: 2, url: "https://salt.tkbcdn.com/ts/ds/5a/37/c6/b5239073da24a288542c3a3a5aaa21d5.png"},
    {id: 3, url: "https://salt.tkbcdn.com/ts/ds/5a/37/c6/b5239073da24a288542c3a3a5aaa21d5.png"},
    {id: 4, url: "https://salt.tkbcdn.com/ts/ds/5a/37/c6/b5239073da24a288542c3a3a5aaa21d5.png"},
    {id: 5, url: "https://salt.tkbcdn.com/ts/ds/5a/37/c6/b5239073da24a288542c3a3a5aaa21d5.png"},
    {id: 6, url: "https://salt.tkbcdn.com/ts/ds/5a/37/c6/b5239073da24a288542c3a3a5aaa21d5.png"},
];

const PrevArrow = ({onClick}) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: "absolute", top: "50%", left: 0, zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
        }}
    >
        <ArrowBackIosNewIcon/>
    </IconButton>
);

const NextArrow = ({onClick}) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: "absolute", top: "50%", right: 0, zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
        }}
    >
        <ArrowForwardIosIcon/>
    </IconButton>
);
const CardSliderReactSlick = ({
                                  slidesToShow,
                                  slidesToScroll,
                                  autoplay = false,
                                  dotDisplay = false,
                                  infinite = false,
                                  events,
                              }) => {
    const navigate = useNavigate();
    const settings = {
        dots: dotDisplay,
        infinite: infinite,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: autoplay,
        speed: 500,
        lazyLoad: true,
        autoplaySpeed: 10000,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>,
        responsive: [
            {
                breakpoint: 768,
                settings: {slidesToShow: 1}
            }
        ]
    };

    return (
        <Box sx={{width: "100%", margin: "24px 0 40px"}}>
            <Slider {...settings}>
                {/*{images.map((item, index) => (*/}
                {events && events.map((item, index) => (
                    <Box
                        className="item"
                        key={`${item.id || 'fallback'}-${index}`}
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "12px",
                            display: "block !important",
                        }}
                    >
                        <Box
                             onClick={() => navigate(`/event/${item.id}`)}
                            component="img"
                            src={item.bannerUri}
                            alt={`img-${item.id}`}
                            sx={{
                                position: "relative",
                                width: "100%",
                                borderRadius: "12px",
                            }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

export default CardSliderReactSlick;