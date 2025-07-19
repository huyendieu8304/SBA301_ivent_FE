import {
    Button,
    Popover,
    Stack,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {
    checkOnlyDateAfter,
    checkOnlyDateBefore,
    checkValidDate
} from "../common/ValidateFunction.jsx";
import {DATE_FORMAT, DATETIME_FORMAT} from "../common/Constant.jsx";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {formatVNDateFromISO} from "../common/FormatFunction.jsx";
import dayjs from "dayjs";

function SearchDates({ searchParams, setSearchParams }) {

    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    const [from, setFrom] = useState(fromParam ? dayjs(fromParam) : null);
    const [to, setTo] = useState(toParam ? dayjs(toParam) : null);
    const [fromError, setFromError] = useState(null);
    const [toError, setToError] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const fromLabel = "Từ"
    const toLable = "Đến"

    const validateEventStartTime = (startValue, endValue) => {
        const error = checkValidDate(fromLabel, startValue, DATE_FORMAT)
            || checkOnlyDateBefore(fromLabel, startValue, endValue, toLable, DATE_FORMAT)

        return error || null;
    }

    const validateEventEndTime = (endValue, startValue) => {
        const error = checkValidDate(toLable, endValue, DATE_FORMAT)
            || checkOnlyDateAfter(toLable, endValue, startValue, fromLabel, DATE_FORMAT);
        return error || null;
    };

    const handleStartEndChange = (fieldName, newValue) => {
        const startVal = fieldName === "from" ? newValue : from;
        const endVal = fieldName === "to" ? newValue : to;

        if (startVal) {
            const startError = validateEventStartTime(startVal, endVal);
            setFromError(startError);
        }
        if (endVal) {
            const endError = validateEventEndTime(endVal, startVal);
            setToError(endError);
        }

        fieldName === "from" ? setFrom(newValue) : setTo(newValue);
    };

    const handleResetDate = () => {
        setFrom(null);
        setTo(null);
        setToError(null);
        setFromError(null);
    }

    const handlePickingDate = () => {
        const newParams = new URLSearchParams(searchParams); // giữ lại các param khác nếu cần

        if (from) {
            newParams.set("from", dayjs(from).format(DATETIME_FORMAT));
        } else {
            newParams.delete("from");
        }

        if (to) {
            newParams.set("to", dayjs(to).format(DATETIME_FORMAT));
        } else {
            newParams.delete("to");
        }

        setSearchParams(newParams);
        handleClose()
    }

    let dateLabel = "Tất cả các ngày";
    if (fromParam && toParam) {
        dateLabel = `${formatVNDateFromISO(fromParam)} - ${formatVNDateFromISO(toParam)}`;
    } else if (fromParam) {
        dateLabel = formatVNDateFromISO(fromParam);
    } else if (toParam) {
        dateLabel = formatVNDateFromISO(toParam);
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{textTransform: "none", borderColor: "white", borderRadius: "20px"}}
                onClick={handleClick}
            >
                <Typography
                    variant="subtitle1"
                    sx={{color: "white", fontFamily: 'Arial', fontSize: "14px"}}
                >
                    {dateLabel}
                </Typography>
            </Button>

            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            width: "90vw",          // gần full màn hình trên thiết bị nhỏ
                            maxWidth: "200px",      // giới hạn ở màn to
                            padding: "10px"
                        },
                    },
                }}
            >
                <Stack spacing={1} mt={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format={DATE_FORMAT}
                            label={fromLabel}
                            value={from}
                            onChange={(val) => handleStartEndChange("from", val)}
                            shouldDisableDate={(date) => {
                                // Nếu "to" đã được chọn thì disable mọi ngày sau "to"
                                return to && date.isAfter(to, 'day');
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    error: !!fromError,
                                    helperText: fromError,
                                },
                            }}
                        />
                        <DatePicker
                            format={DATE_FORMAT}
                            label={toLable}
                            value={to}
                            onChange={(val) => handleStartEndChange("to", val)}
                            shouldDisableDate={(date) => {
                                // Nếu "from" đã được chọn thì disable mọi ngày trước "from"
                                return from && date.isBefore(from, 'day');
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    error: !!toError,
                                    helperText: toError,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Stack>
                <Stack direction="row" spacing={1} mt={1} justifyContent={"end"}>
                    <Button onClick={handleResetDate}>Đặt lại</Button>
                    <Button onClick={handlePickingDate} variant="contained" sx={{color: "white"}}>Áp dụng</Button>
                </Stack>
            </Popover>
        </>
    )
}

export default SearchDates;