import EventCard from "../../component/EventCard.jsx";
import {Box, Container, ImageList, Stack, Typography} from "@mui/material";
import SearchDates from "../../component/SearchDates.jsx";
import SearchFilter from "../../component/SearchFilter.jsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import categoryApi from "../../api/service/categoryApi.jsx";
import AddressData from "../../AddressData.js";
import eventApi from "../../api/service/eventApi.jsx";
import {messageService} from "../../service/MessageService.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";


const CATEGORY_TEMP = [
    {
        "id": "1",
        "name": "Nh?c s?ng"
    },
    {
        "id": "2",
        "name": "Sân kh?u & ngh? thu?t"
    },
    {
        "id": "3",
        "name": "Th? thao"
    },
    {
        "id": "4",
        "name": "Khác"
    }
];

const PROVINCE_LIST = AddressData.map(
    (item, index) => ({
        id: index,
        value: item.province,
        label: item.province
    })
);

const DEFAULT_PAGE_SIZE = 16;

function SearchEventsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const scrollContainerRef = useRef(null);
    const pageRef = useRef(1);
    const year = new Date().getFullYear();

    //GET CATEGORY
    const [categories, setCategories] = useState(CATEGORY_TEMP);
    useEffect(() => {
        setIsLoading(true);
        categoryApi.getCategories(getCategoriesSuccess, getCategoriesFail)
    }, [])
    const getCategoriesSuccess = (data) => {
        setCategories(data)
        setIsLoading(false);
    }
    const getCategoriesFail = (error) => {
        console.error(error);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
        setIsLoading(false);
    }

    // Reset khi param aka filter đổi
    useEffect(() => {
        pageRef.current = 1;
        searchEvents(1);
    }, [searchParams]);

    const searchEvents = (targetPage = 1) => {
        // Nếu đang loading hoặc hết data thì không gọi
        setIsLoading(true);
        const params = {
            ...Object.fromEntries(searchParams.entries()),
            page: targetPage,
            size: DEFAULT_PAGE_SIZE
        };
        eventApi.searchEventDetails(
            params,
            (data) => searchEventsSuccess(data, targetPage),
            searchEventsFail)
    }
    const searchEventsSuccess = (data, targetPage) => {
        if (targetPage === 1) {
            setSearchResult(data);
        } else {
            setSearchResult(prev => [...prev, ...data]);
        }
        setHasMore(data.length === DEFAULT_PAGE_SIZE); // Nếu ít hơn => không còn nữa
        setIsLoading(false);
    }
    const searchEventsFail = (error) => {
        console.error(error);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
        setIsLoading(false);
    }

    // theo doi cuon xuong
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const container = scrollContainerRef.current;
            if (!container) return;
            if (
                container.scrollTop + container.clientHeight >= container.scrollHeight - 100 &&
                hasMore
            ) {
                pageRef.current = pageRef.current + 1;
                searchEvents(pageRef.current);
            }
        };
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (<>
        <Box ref={scrollContainerRef} sx={{height: "91.5vh", overflowY: "auto"}}>
            <Container maxWidth={"lg"}
                       sx={{minHeight: "85vh", padding: "24px"}}
            >
                <Stack
                    direction="row"
                    justifyContent={"end"}
                    gap={2}
                >
                    {/*todo cho trang home có search box*/}
                    <SearchDates
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                    <SearchFilter
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        provinceList={PROVINCE_LIST}
                        categories={categories}
                    />
                </Stack>

                {searchResult && searchResult.length > 0 ? (
                    <ImageList
                        sx={{width: "100%"}}
                        cols={4}
                        rowHeight="auto"
                        variant="standard"
                        gap={20}
                    >
                        {searchResult.map((item, index) => (
                            <EventCard event={item} key={`${item.id}-${index}`}/>
                        ))}
                    </ImageList>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", // căn giữa theo chiều ngang
                            textAlign: "center",  // căn giữa nội dung text trong Typography
                            mt: 4
                        }}
                    >
                        <Typography variant="h5" sx={{color: "white"}}>Rất tiếc! Không tìm thấy kết quả
                            nào </Typography>
                        <Typography sx={{color: "white"}}>Bạn hãy thử điều chỉnh lại bộ lọc, sử dụng các từ khóa phổ
                            biến hơn </Typography>
                    </Box>
                )}
            </Container>
            <Box
                component="footer"
                sx={{
                    height: "6.5vh",
                    backgroundColor: "#1D1D1D",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="body2" sx={{color: "#B3B3B3", margin: 0}} gutterBottom>
                    © {year} Bản quyền thuộc công ty ivent
                </Typography>
            </Box>
        </Box>
        {isLoading && <LoadingComponent/>}
    </>);
}

export default SearchEventsPage;