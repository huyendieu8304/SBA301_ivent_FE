import {Button, Divider, InputBase, Paper, Stack, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const LogoAndSearch = () => {
    const [searchName, setSearchName] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const queryName = searchParams.get("name") || "";
        setSearchName(queryName);
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchName !== "") {
            navigate(`/search?name=${searchName}`);
        }
        else{
            navigate(`/search`);
        }
    };

    return (<>
        <Stack direction="row" spacing={2}>
            <Link to="/" style={{textDecoration: "none"}}>
                {/*<Avatar alt="ivent logo" src="/ivent_logo.png" sx={{height: 40, width: 40}}/>*/}
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{color: "white", fontFamily: 'Comfortaa', fontWeight: 700, margin: 0}}
                >
                    ivent
                </Typography>
            </Link>
        </Stack>
        <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{p: '0px 4px', display: 'flex', alignItems: 'center', width: 400}}
        >
            <SearchIcon sx={{p: '10px', color: "#BDBDBD"}}/>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Bạn tìm gì hôm nay?"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <Button onClick={handleSearch}
                    sx={{
                        textTransform: "none",
                        borderRadius: "10px"
                    }}>
                <Typography
                    variant="subtitle1"
                    sx={{color: "black", fontFamily: 'Arial', fontSize: "14px"}}
                >
                    Tìm kiếm
                </Typography>
            </Button>
        </Paper>
    </>)
}
export default LogoAndSearch;