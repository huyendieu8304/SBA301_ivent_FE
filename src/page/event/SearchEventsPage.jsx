import EventCard from "../../component/EventCard.jsx";
import {Box, Container, ImageList, Stack, Typography} from "@mui/material";
import SearchDates from "../../component/SearchDates.jsx";
import SearchFilter from "../../component/SearchFilter.jsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import categoryApi from "../../api/service/categoryApi.jsx";
import AddressData from "../../AddressData.js";
import eventApi from "../../api/service/eventApi.jsx";


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

    const [page, setPage] = useState(1);
    const pageRef = useRef(page);
    const isFetchingRef = useRef(false);
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
    const getCategoriesFail = (data) => {
        console.log("get categories fail")
        console.error(data)
        setIsLoading(false);
    }

    // Reset khi param aka filter đổi
    useEffect(() => {
        setPage(1);
        pageRef.current = 1;
        setSearchResult([]);
        setHasMore(true);
    }, [searchParams]);

    // Khi page thay đổi → gọi API
    useEffect(() => {
        pageRef.current = page;
        if (page === 1 && searchResult?.length > 0) return; // Tránh gọi lại page 1 sau khi reset
        searchEvents(page);
    }, [page]);


    const searchEvents = (targetPage = 1) => {
        // Nếu đang loading hoặc hết data thì không gọi
        if (!hasMore || isLoading) return;

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
        isFetchingRef.current = false; //Đánh dấu đã fetch xong
        setIsLoading(false);
    }
    const searchEventsFail = (error) => {
        console.log("search events fail")
        console.error(error)
        isFetchingRef.current = false;
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
                hasMore &&
                !isLoading &&
                !isFetchingRef.current
            ) {
                isFetchingRef.current = true;
                setPage(prev => prev + 1);
            }
        };
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [hasMore, isLoading]);

    return (
        <Box ref={scrollContainerRef} sx={{height: "91.5vh", overflowY: "auto"}}>
            <Container maxWidth={"lg"}
                       sx={{minHeight: "85vh", padding: "24px"}}
            >
                <Stack
                    direction="row"
                    justifyContent={"end"}
                    gap={2}
                >
                    {/*todo link với trang home*/}
                    <SearchDates
                        searchParams={searchParams}
                    />
                    <SearchFilter
                        searchParams={searchParams}
                        provinceList={PROVINCE_LIST}
                        categories={categories}
                    />
                </Stack>

                {/*todo trường hợp không có result*/}
                {searchResult && (
                    <ImageList
                        // sx={{
                        //     overflowY: "auto"
                        // }}
                        // ref={scrollContainerRef}
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
    );
}

export default SearchEventsPage;