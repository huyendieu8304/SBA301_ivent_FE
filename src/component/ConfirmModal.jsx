import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack, useTheme,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmModal = ({
                          title = "Hãy xác nhận lại!",
                          content = "abc",
                          open,
                          setOpen,
                          confirmButtonColor = "primary",
                          handleConfirmSubmit,
                          hasCancel = true,
                      }) => {
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            closeAfterTransition={false}
            PaperProps={{
                sx: {
                    borderRadius: "10px",
                }
            }}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    padding: "16px 24px !important",
                    minWidth: "300px",
                    backgroundColor: theme.palette.primary.main,
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                {title}
            </DialogTitle>
            {hasCancel && (
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "white",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}

            <DialogContent sx={{ padding: "16px 24px !important" }}>
                {/*<DialogContentText id="alert-dialog-description">*/}
                    {content}
                {/*</DialogContentText>*/}
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
                            sx={{width: "150px", textTransform: "none", color: theme.palette.primary.main, }}
                        >
                            Hủy
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color={confirmButtonColor}
                        sx={{width: "150px", textTransform: "none", color:"white"}}
                        onClick={handleConfirmSubmit}
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;