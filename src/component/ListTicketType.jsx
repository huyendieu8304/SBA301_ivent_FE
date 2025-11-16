import {Box, Button, Chip, ListItem, ListItemText, Stack, TextField, Typography} from "@mui/material";
import {formatMoney} from "../common/FormatFunction.jsx";
import List from "@mui/material/List";
import {useEffect} from "react";

const ListTicketPage = ({types = [], quantities, setQuantities}) => {

    useEffect(() => {
        if (types && types.length > 0) {
            const initial = {};
            types.forEach((type) => {
                initial[type.id] = 0;
            });
            setQuantities(initial);
        }
    }, [types]);

    const handleIncrement = (id, ticket) => {
        setQuantities((prev) => {
            const current = prev[id] ?? 0;
            if (current >= ticket.maximumOrderQuantity) return prev;
            if (current < ticket.minimumOrderQuantity){
                return {
                    ...prev,
                    [id]: ticket.minimumOrderQuantity,
                };
            }
            return {
                ...prev,
                [id]: current + 1,
            };
        });
    };

    const handleDecrement = (id, ticket) => {
        setQuantities((prev) => {
            const current = prev[id] ?? 0;
            if (current <= 0) return prev;
            if (current === ticket.minimumOrderQuantity){
                return {
                    ...prev,
                    [id]: 0,
                };
            }
            return {
                ...prev,
                [id]: current - 1,
            };
        });
    };

    return (
        <>
            <Stack
                sx={{
                    background: "#27272a",
                    padding: "24px",
                    borderRadius: "10px",
                    width: "80%",
                }}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "14px"
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Thông tin vé
                    </Typography>
                    <Box sx={{
                        paddingBottom: "4px",
                    }}>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: "2px",
                        background: "#555",
                        margin: "0 -24px !important",
                    }}
                />
                <List sx={{
                    margin: "0 -24px !important",
                    padding: "0",
                }}>
                    {types?.map((ticket, index) => (
                        <ListItem disablePadding key={ticket.id}
                                  sx={{
                                      backgroundColor: index % 2 === 0 ? "#2e2f32" : "#37373c",
                                      padding: "4px 24px",
                                      display: "flex",
                                      justifyContent: "space-between"
                                  }}
                        >
                            <ListItemText
                                primary={ticket.name}
                                sx={{
                                    color: "white",
                                    paddingLeft: "4px"
                                }}
                            />
                            <Stack direction="row" alignItems="right" gap={4}>
                                <ListItemText
                                    primary={`${formatMoney(ticket.price)} đ`}
                                    sx={{
                                        color: `${ticket.remain === 0 ? "#a6a6b0" : "#2dc275"}`,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        minWidth: "100px"
                                    }}
                                />
                                {ticket.remain === 0
                                    ? (<Chip label="Hết vé" size="small" color="error"/>)
                                    : (<>
                                        <Stack direction="row" alignItems="center" gap={1} sx={{color: "white"}}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleDecrement(ticket.id, ticket)}
                                                disabled={quantities[ticket.id] === 0}
                                                sx={{minWidth: "30px", p: "5px", color: "white !important", fontWeight: "bold"}}
                                            >-</Button>
                                            <TextField
                                                hiddenLabel
                                                value={quantities[ticket.id] ?? 0}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    width: "50px",
                                                    input: {
                                                        backgroundColor: "#fff",
                                                        borderRadius: "4px",
                                                        p: "3px",
                                                        textAlign: "center",
                                                    },
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleIncrement(ticket.id, ticket)}
                                                disabled={quantities[ticket.id] >= ticket.remain || quantities[ticket.id] >= ticket.maximumOrderQuantity}
                                                sx={{minWidth: "30px", p: "5px", color: "white !important", fontWeight: "bold"}}
                                            >+</Button>
                                        </Stack>
                                    </>)
                                }
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </>
    )
}
export default ListTicketPage;