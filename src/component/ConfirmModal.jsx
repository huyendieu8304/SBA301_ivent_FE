import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmModal = ({
                          title = "確認してください！",
                          content = "",
                          open,
                          setOpen,
                          confirmButtonColor = "primary",
                          handleConfirmSubmit,
                          hasCancel = true,
                      }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            closeAfterTransition={false}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    padding: "16px 24px 0px !important",
                    fontWeight: "bold",
                    minWidth: "300px",
                }}
            >
                {title}
            </DialogTitle>
            {hasCancel && (
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
            )}

            <DialogContent sx={{ padding: "16px 24px !important" }}>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginBottom: 1,
                    }}
                >
                    {hasCancel && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                            sx={{ width: "150px" }}
                        >
                            いいえ
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color={confirmButtonColor}
                        sx={{
                            width: "150px",
                        }}
                        onClick={handleConfirmSubmit}
                        autoFocus
                    >
                        はい
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;