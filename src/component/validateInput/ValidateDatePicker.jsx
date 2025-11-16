import React from "react";
import {TextField} from "@mui/material";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DATE_FORMAT} from "../../common/Constant.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";

export const ValidateDatePicker = ({
                                       fieldName,
                                       label,
                                       value,
                                       setValue,
                                       error,
                                       setError,
                                       size = "medium",
                                       isRequired = false,
                                       validatorFunction,
                                   }) => {

    const handleDateChange = (newValue) => {
        if (!newValue) {
            setError(fieldName, validatorFunction(newValue));
            setValue(fieldName, null);
            return;
        }
        const formattedValue = dayjs(newValue).format(DATE_FORMAT);
        const errorMessage = validatorFunction(formattedValue);
        setValue(fieldName, newValue);
        setError(fieldName, errorMessage);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format={DATE_FORMAT}
                name={fieldName}
                label={
                    isRequired ? (
                        <span style={{color: "#027A48"}}>
                            {label} <span style={{color: "red"}}>*</span>
                        </span>
                    ) : (
                        label
                    )
                }
                value={value}
                onChange={handleDateChange}
                textField={(params) => <TextField {...params} />}
                slotProps={{
                    textField: {
                        size: size,
                        fullWidth: true,
                        error: !!error,
                        helperText: error || "",
                    },
                }}
            />
        </LocalizationProvider>
    );
};