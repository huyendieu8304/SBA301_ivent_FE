import FakeData from "../../FakeData.jsx";
import EventCard from "../../component/EventCard.jsx";
import {Box, Container, ImageList} from "@mui/material";
import SearchDates from "../../component/SearchDates.jsx";
import SearchFilter from "../../component/SearchFilter.jsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import categoryApi from "../../api/service/categoryApi.jsx";
import AddressData from "../../AddressData.js";
import eventApi from "../../api/service/eventApi.jsx";


const CATEGORY_TEMP= [
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
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    const scrollContainerRef = useRef(null);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);


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
        setSearchResult([]);
        setHasMore(true);
        searchEvents(1);
    }, [searchParams]);

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
        setHasMore(data.length ===  DEFAULT_PAGE_SIZE); // Nếu ít hơn => không còn nữa
        setIsFetchingNextPage(false);
        setIsLoading(false);
    }
    const searchEventsFail = (error) => {
        console.log("get categories fail")
        console.error(error)
        setIsLoading(false);
    }

    // theo doi cuon xuong
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            console.log("=== SCROLL CHECK ==="); //  Bắt đầu log được
            console.log("ScrollTop:", container.scrollTop);
            console.log("clientHeight:", container.clientHeight);
            console.log("scrollHeight:", container.scrollHeight);

            if (
                container.scrollTop + container.clientHeight >= container.scrollHeight - 100 &&
                hasMore &&
                !isLoading &&
                !isFetchingNextPage
            ) {
                console.log("=== LOAD NEXT PAGE ===");
                setIsFetchingNextPage(true);
                const nextPage = page + 1;
                searchEvents(nextPage);
                setPage(nextPage);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [hasMore, isLoading, isFetchingNextPage, page, searchParams]);

    return (
        <Container maxWidth={"lg"}>
            <Box>
                {/*//todo css lại*/}
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
            </Box>


            {searchResult && (
                <div
                    ref={scrollContainerRef}
                     style={{ height: "80vh", overflowY: "auto" }}
                >
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
                            <EventCard event={item}  key={`${item.id}-${index}`}/>
                        ))}
                    </ImageList>
                </div>
            )}
        </Container>
    );
}

export default SearchEventsPage;