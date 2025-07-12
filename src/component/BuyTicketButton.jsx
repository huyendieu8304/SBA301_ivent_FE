import {Button} from "@mui/material";

const BUTTON_STATE = {
    FREE: {
        isGreyButton: false,
        buttonText: "Đăng kí ngay"
    },
    BUY_NOW: {
        isGreyButton: false,
        buttonText: "Mua vé ngay"
    },
    SOLD_OUT: {
        isGreyButton: true,
        buttonText: "Hết vé"
    },
    NOT_START_SELLING: {
        isGreyButton: true,
        buttonText: "Chưa mở bán vé"
    },
    END_SELLING: {
        isGreyButton: true,
        buttonText: "Ngừng bán vé"
    },
    FINISHED: {
        isGreyButton: true,
        buttonText: "Sự kiện đã kết thúc"
    }
}

function BuyTicketButton({
                             isSoldOut,
                             isFree,
                             endTime,
                             startSellingTicketTime,
                             endSellingTicketTime,
                             navigateToBookingPage
                         }) {

    let state = BUTTON_STATE.FINISHED;

    const now = new Date();
    const starSellingTicketTimeDate = new Date(startSellingTicketTime);
    const endSellingTicketTimeDate = new Date(endSellingTicketTime);
    const endTimeDate = new Date(endTime);

    if (now < starSellingTicketTimeDate) {
        state = BUTTON_STATE.NOT_START_SELLING;
    }

    if (now >= starSellingTicketTimeDate && now <= endSellingTicketTimeDate) {
        if (isFree) {
            state = BUTTON_STATE.FREE;
        } else if (isSoldOut) {
            state = BUTTON_STATE.SOLD_OUT;
        } else {
            state = BUTTON_STATE.BUY_NOW;
        }
    }

    if (now > endSellingTicketTimeDate && now < endTimeDate) {
        state = BUTTON_STATE.END_SELLING;
    }


    if (state.isGreyButton) return (
        <Button
            variant="contained"
            size="small"
            sx={{
                color: "#3b3b3d",
                backgroundColor: "#76767a",
                fontWeight: "bold",
            }}
        >
            {state.buttonText}
        </Button>
    );

    return (
        <Button
            variant="contained"
            sx={{
                color: "white",
                fontWeight: "bold",
            }}
            onClick={navigateToBookingPage}
        >
            {state.buttonText}
        </Button>
    );
}

export default BuyTicketButton;