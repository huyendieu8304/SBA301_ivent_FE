import {Box, Container, Stack} from "@mui/material";
import FakeData from "../FakeData.jsx";
import EventCard from "../component/EventCard.jsx";


const HomePage = () => {
    return (
        <>
            <Container maxWidth="lg">
                {/*<Stack direction="row" spacing={3} useFlexGap={true}*/}
                {/*       sx={{flexWrap: "wrap", justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>*/}
                {/*    {FakeData.map((item) => (*/}
                {/*        <EventCard event={item} key={item.id} />*/}
                {/*    ))}*/}
                {/*</Stack>*/}
                <Stack
                    direction="row"
                    useFlexGap
                    spacing={3}
                    sx={{
                        flexWrap: "wrap",
                        // justifyContent: "space-between", // giãn đều
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "100%",
                        rowGap: 1,
                    }}
                >
                    {FakeData.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                // width: "calc(25% - 24px)",
                                // minWidth: "20%",
                                width: "23%",
                            }}
                        >
                            <EventCard event={item} />
                        </Box>
                    ))}
                </Stack>
            </Container>
        </>
    )
}
export default HomePage;