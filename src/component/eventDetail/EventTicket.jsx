import React from 'react';
import Box from "@mui/material/Box";

const GRAY_COLOR = "#3b3b3d"

function EventTicket({event}) {
    return (
        <Box sx={{
            marginTop: '20px',
        }}>
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: GRAY_COLOR,
                    borderRadius: '4px',
                    padding: '10px',
                    color: 'white',
                }}
            >
                ticket
            </Box>
        </Box>
    );
}

export default EventTicket;