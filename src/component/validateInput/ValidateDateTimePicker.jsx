import dayjs from "dayjs";
import {DATE_FORMAT, DATETIME_FORMAT} from "../../common/Constant.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, DateTimePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import React from "react";

export const ValidateDateTimePicker = ({
                                       fieldName,
                                       label,
                                       value,
                                       setValue,
                                       error,
                                       setError,
                                       size = "medium",
                                       isRequired = false,
                                       validatorFunction,
                                           onChange,
                                   }) => {

    const handleDateTimeChange = (newValue) => {
        // Nếu có onChange từ ngoài truyền vào thì ưu tiên
        if (onChange) {
            onChange(newValue);
            return;
        }

        if (!newValue) {
            setError(fieldName, validatorFunction(newValue));
            setValue(fieldName, null);
            return;
        }
        const formattedValue = dayjs(newValue);
        const errorMessage = validatorFunction(formattedValue);
        setValue(fieldName, newValue);
        setError(fieldName, errorMessage);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                format={DATETIME_FORMAT}
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
                onChange={handleDateTimeChange}
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
}