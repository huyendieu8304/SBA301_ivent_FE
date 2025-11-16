import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import {messageService} from "../service/MessageService.jsx";

const MessageComponent = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    React.useEffect(() => {
        messageService.setMessage((msg, severityType) => {
            setMessage(msg);
            setSeverity(severityType);
            setOpen(true);
        });
    }, []);

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            severity={severity}
            sx={{ zIndex: 10002 }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default MessageComponent;