import React from 'react';
import Box from "@mui/material/Box";
import {
    checkDateAfter,
    checkDateBefore,
    checkRequiredInput,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import {DATETIME_FORMAT} from "../../common/Constant.jsx";
import {ValidateDateTimePicker} from "../validateInput/ValidateDateTimePicker.jsx";
import {InputLabel, Stack} from "@mui/material";

const GRAY_COLOR = "#3b3b3d"

function EventTicket({ formFields, setFormFields, updateField, updateError}) {

    const validateEventStartTime = (startValue, endValue) => {
        const fieldName = formFields.startSellingTicketTime.label;
        const error = checkRequiredInput(fieldName, startValue)
            || checkValidDate(fieldName, startValue, DATETIME_FORMAT)
            || checkDateBefore(fieldName, startValue, formFields.endTime.value, formFields.endTime.label, DATETIME_FORMAT)
            || checkDateBefore(fieldName, startValue, endValue, formFields.endSellingTicketTime.label, DATETIME_FORMAT);
        return error || null;

    }

    const validateEventEndTime = (endValue, startValue) => {
        const fieldName = formFields.endSellingTicketTime.label;
        const error = checkRequiredInput(fieldName, endValue)
            || checkValidDate(fieldName, endValue, DATETIME_FORMAT)
            || checkDateBefore(fieldName, endValue, formFields.endTime.value, formFields.endTime.label, DATETIME_FORMAT)
            || checkDateAfter(fieldName, endValue, startValue, formFields.startSellingTicketTime.label, DATETIME_FORMAT);

        return error || null;
    };

    const handleStartEndChange = (fieldName, newValue) => {
        const startVal = fieldName === "startSellingTicketTime" ? newValue : formFields.startSellingTicketTime.value;
        const endVal = fieldName === "endSellingTicketTime" ? newValue : formFields.endSellingTicketTime.value;

        updateField(fieldName, newValue);

        const startError = validateEventStartTime(startVal, endVal);
        const endError = validateEventEndTime(endVal, startVal);

        updateError("startSellingTicketTime", startError);
        updateError("endSellingTicketTime", endError);
    };


    return (
        <Box sx={{
            marginTop: '20px',
        }}>
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >
                <InputLabel >
                        <span style={{color: "#027A48"}}>
                            Thời gian bán vé <span style={{color: "red"}}>*</span>
                        </span>
                </InputLabel>
                <Stack direction={'row'} spacing={1} mt={1}>
                    <ValidateDateTimePicker
                        label={formFields.startSellingTicketTime.label}
                        fieldName="startSellingTicketTime"
                        value={formFields.startSellingTicketTime.value}
                        error={formFields.startSellingTicketTime.error}
                        setValue={updateField}
                        setError={updateError}
                        isRequired={true}
                        validatorFunction={(val) => handleStartEndChange("startSellingTicketTime", val)}
                    />
                    <ValidateDateTimePicker
                        label={formFields.endSellingTicketTime.label}
                        fieldName="endSellingTicketTime"
                        value={formFields.endSellingTicketTime.value}
                        error={formFields.endSellingTicketTime.error}
                        setValue={updateField}
                        setError={updateError}
                        isRequired={true}
                        validatorFunction={(val) => handleStartEndChange("endSellingTicketTime", val)}
                    />

                </Stack>
            </Box>
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >
                ticket
            </Box>
        </Box>
    );
}

export default EventTicket;