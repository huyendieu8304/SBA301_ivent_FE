import {Container, ImageList, Typography} from "@mui/material";
import FakeData from "../../FakeData.jsx";
import EventCard from "../../component/EventCard.jsx";
import CardSliderReactSlick from "../../component/cardSlider/CardSliderReactSlick.jsx";
import {useEffect, useState} from "react";
import eventApi from "../../api/service/eventApi.jsx";
import {useNavigate} from "react-router";
import LoadingComponent from "../../component/LoadingComponent.jsx";



const FAKE_RESULTS = {
    "latestEvents": [
    {
        "id": "04bdfbbf-4d34-11f0-9cac-0242ac140002",
        "name": "Summer Music Fest",
        "isOnline": null,
        "province": null,
        "ward": null,
        "startTime": "2025-08-20T17:00:00",
        "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
    },
    {
        "id": "07f43e1c-5d6a-4b92-8c0e-1f2g3h4i5j6k",
        "name": "Việt Nam Du Ký",
        "isOnline": null,
        "province": "Thành phố Hà Nội",
        "ward": "Phường Phúc Xá",
        "startTime": "2025-08-10T00:00:00",
        "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
    },
    {
        "id": "0a1b2c3d-e4f5-6789-0123-456789abcdef0",
        "name": "Sắc Màu Thời Đại",
        "isOnline": null,
        "province": "Thành phố Hải Phòng",
        "ward": "Phường Máy Chai",
        "startTime": "2025-07-30T00:00:00",
        "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
    },
    {
        "id": "34bd361a-e80b-4c46-a916-6d2fea311f8b",
        "name": "Trải Nghiệm Vẽ Tranh",
        "isOnline": null,
        "province": "Tỉnh Khánh Hòa",
        "ward": "Phường Vĩnh Phước",
        "startTime": "2025-07-24T00:00:00",
        "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
    },
    {
        "id": "3c4d5e6f-a7b8-9012-3456-7890abcdef0123",
        "name": "Giai Điệu Yêu Thương",
        "isOnline": null,
        "province": "Tỉnh Quảng Ninh",
        "ward": "Phường Hồng Gai",
        "startTime": "2025-08-01T00:00:00",
        "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
    }
],
    "categoryEvents": {
    "Nhạc sống": [
        {
            "id": "04bdfbbf-4d34-11f0-9cac-0242ac140002",
            "name": "Summer Music Fest",
            "isOnline": null,
            "province": null,
            "ward": null,
            "startTime": "2025-08-20T17:00:00",
            "bannerUri": "https://salt.tkbcdn.com/ts/ds/54/66/50/3bf692032acbb7a4e48e1ab215b92212.jpg"
        },
        {
            "id": "0a1b2c3d-e4f5-6789-0123-456789abcdef0",
            "name": "Sắc Màu Thời Đại",
            "isOnline": null,
            "province": "Thành phố Hải Phòng",
            "ward": "Phường Máy Chai",
            "startTime": "2025-07-30T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "5f0f42e3-1da7-47d4-b76c-d398307262eb",
            "name": "Hội Chợ Mùa Hè",
            "isOnline": null,
            "province": "Thành phố Hà Nội",
            "ward": "Phường Nguyễn Trung Trực",
            "startTime": "2025-07-21T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "7a8b9c0d-e1f2-3456-7890-abcdef012345678",
            "name": "Innovation Day HCM",
            "isOnline": null,
            "province": "Thành phố Hồ Chí Minh",
            "ward": "Phường 3",
            "startTime": "2025-08-08T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "9b8a7c6d-5e4f-3g2h-1i0j-k1l2m3n4o5p6",
            "name": "Art Connect",
            "isOnline": null,
            "province": "Thành phố Hồ Chí Minh",
            "ward": "Phường 1",
            "startTime": "2025-08-11T00:00:00",
            "bannerUri": "[https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP](https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP)"
        }
    ],
        "Thể thao": [
        {
            "id": "34bd361a-e80b-4c46-a916-6d2fea311f8b",
            "name": "Trải Nghiệm Vẽ Tranh",
            "isOnline": null,
            "province": "Tỉnh Khánh Hòa",
            "ward": "Phường Vĩnh Phước",
            "startTime": "2025-07-24T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "8b9c0d1e-2f34-5678-90ab-cdef0123456789",
            "name": "Hương Vị Cố Đô",
            "isOnline": null,
            "province": "Thành phố Huế",
            "ward": "Phường Phú Cát",
            "startTime": "2025-08-09T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
            "name": "Đà Nẵng Ẩm Thực",
            "isOnline": null,
            "province": "Thành phố Đà Nẵng",
            "ward": "Phường Bình Hiên",
            "startTime": "2025-07-29T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "c3d4e5f6-a7b8-9012-3456-7890abcdef01234",
            "name": "Hội Chợ Ẩm Thực Chay",
            "isOnline": null,
            "province": "Thành phố Hồ Chí Minh",
            "ward": "Phường 2",
            "startTime": "2025-08-05T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        }
    ],
        "Sân khấu & nghệ thuật": [
        {
            "id": "07f43e1c-5d6a-4b92-8c0e-1f2g3h4i5j6k",
            "name": "Việt Nam Du Ký",
            "isOnline": null,
            "province": "Thành phố Hà Nội",
            "ward": "Phường Phúc Xá",
            "startTime": "2025-08-10T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "3c4d5e6f-a7b8-9012-3456-7890abcdef0123",
            "name": "Giai Điệu Yêu Thương",
            "isOnline": null,
            "province": "Tỉnh Quảng Ninh",
            "ward": "Phường Hồng Gai",
            "startTime": "2025-08-01T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "5e6f7a8b-c9d0-1234-5678-90abcdef012345",
            "name": "Acoustic Vibes",
            "isOnline": null,
            "province": "Thành phố Đà Nẵng",
            "ward": "Phường Bình Thuận",
            "startTime": "2025-08-03T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
            "name": "Sách Và Bạn",
            "isOnline": null,
            "province": "Thành phố Hồ Chí Minh",
            "ward": "Phường 1",
            "startTime": "2025-07-27T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "04bd9cef-4d34-11f0-9cac-0242ac140002",
            "name": "Hội chợ Việc Làm 2030",
            "isOnline": null,
            "province": null,
            "ward": null,
            "startTime": "2025-07-13T08:00:00",
            "bannerUri": "https://salt.tkbcdn.com/ts/ds/57/04/b1/bd123932d98c10ea3ede92bb548ca047.png"
        }
    ],
        "Khác": [
        {
            "id": "5h4g3f2e-1d0c-9b8a-7s6d-5c4b3a2f1e0d",
            "name": "Run For The Ocean",
            "isOnline": null,
            "province": "Tỉnh Quảng Ninh",
            "ward": "Phường Bãi Cháy",
            "startTime": "2025-08-12T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "6f7a8b9c-d0e1-2345-6789-0abcdef01234567",
            "name": "Independent Film Fest",
            "isOnline": null,
            "province": "Thành phố Hà Nội",
            "ward": "Phường Cống Vị",
            "startTime": "2025-08-07T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "d4e5f6a7-b8c9-0123-4567-890abcdef012",
            "name": "AI Expo 2025",
            "isOnline": null,
            "province": "Thành phố Hà Nội",
            "ward": "Phường Vĩnh Phúc",
            "startTime": "2025-07-28T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        },
        {
            "id": "e00b560c-293e-4b27-b3cf-7f0ff3dd09c4",
            "name": "Chợ Đêm Ẩm Thực",
            "isOnline": null,
            "province": "Thành phố Huế",
            "ward": "Phường Phú Nhuận",
            "startTime": "2025-07-27T00:00:00",
            "bannerUri": "https://lh3.googleusercontent.com/d/1i6v4Q90u0dkPRr-Y7lPEpFV5lVNDw4eP"
        }
    ]
}
}
const HomePage = () => {

    // const [latestEvents, setLatestEvents] = useState([]);
    // const [categoryEvents, setCategoryEvents] = useState([]);
    const [latestEvents, setLatestEvents] = useState([FAKE_RESULTS.latestEvents]);
    const [categoryEvents, setCategoryEvents] = useState(Object.entries(FAKE_RESULTS.categoryEvents));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     setIsLoading(true);
    //     eventApi.getHomePageData(getDataSuccess, getEventDetailFailure)
    // }, []);
    //
    // const getDataSuccess = (data) => {
    //     setLatestEvents(data.latestEvents);
    //     setCategoryEvents(Object.entries(data.categoryEvents));
    //     setIsLoading(false)
    // }
    //
    // const getEventDetailFailure = (error) => {
    //     setIsLoading(false);
    //     navigate("/error", {
    //         state: {
    //             message: error.response.data.message,
    //             code: error.status,
    //         }
    //     })
    // }

    console.log(latestEvents);
    console.log(categoryEvents)

    if (isLoading) return <LoadingComponent/>
    return (
        <Container maxWidth="lg">
            <CardSliderReactSlick
                dotDisplay={true}
                infinite={true}
                slidesToShow={3}
                slidesToScroll={1}
                autoplay={false}
                data={latestEvents}
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