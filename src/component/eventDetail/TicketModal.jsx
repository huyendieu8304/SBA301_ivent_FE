import DialogTitle from "@mui/material/DialogTitle";
import {
    Button,
    DialogActions,
    DialogContent,
    Stack
} from "@mui/material";
import ValidationTextField from "../validateInput/ValidationTextField.jsx";
import ValidateNumberField from "../validateInput/ValidateNumberField.jsx";
import Dialog from "@mui/material/Dialog";
import React, {useState} from "react";
import {
    checkNumberGreaterThan,
    checkNumberSmallerThan,
    checkRequiredInput,
    checkStringMaxLength,
} from "../../common/ValidateFunction.jsx";

function TicketModal({
                         openState,
                         handleCloseDialog,
                         handleSaveTicket,
                         ticket,
                         setTicket,
                         isDisabled = false,
                     }) {

    const updateNewTicketField = (fieldName, newValue) => {
        setTicket((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                value: newValue,
            },
        }));
    };

    const updateNewTicketError = (fieldName, errorMsg) => {
        setTicket((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                error: errorMsg,
            },
        }));
    };


    // VALIDATE TICKET INFORMATION
    const validateTicketName = (value) => {
        const fieldName = "Tên loại vé";
        const error = checkRequiredInput(fieldName, value) || checkStringMaxLength(value, fieldName, 100);
        return error || null;
    }
    const validateTicketDescription = (value) => {
        const fieldName = "Mô tả loại vé";
        const error = checkRequiredInput(fieldName, value) || checkStringMaxLength(value, fieldName, 250);
        return error || null;
    }

    const validateTicketPrice = (value) => {
        const fieldName = "Giá vé";
        const error = checkRequiredInput(fieldName, value);
        return error || null;
    }


    //VALIDATE TICKET QUANTITY
    const validateTicketTotalQuantity = (total, max) => {
        const fieldName = "Số lượng vé";
        const error = checkRequiredInput(fieldName, total)
            || checkNumberGreaterThan(fieldName, total, max, "Lượng vé tối đa trong 1 đơn hàng")
        ;
        return error || null;
    }

    const validateTicketMinimumOrderQuantity = (min, max) => {
        const fieldName = "Lượng vé tối thiểu trong 1 đơn hàng";

        const error = checkRequiredInput(fieldName, min)
            || checkNumberSmallerThan(fieldName, min, max, "Lượng vé tối đa trong 1 đơn hàng");

        return error || null;
    }

    const validateTicketMaximumOrderQuantity = (max, min, total) => {
        const fieldName = "Lượng vé tối đa trong 1 đơn hàng";

        const error = checkRequiredInput(fieldName, max)
            || checkNumberGreaterThan(fieldName, max, min, "Lượng vé tối thiểu trong 1 đơn hàng")
            || checkNumberSmallerThan(fieldName, max, total, "Số lượng vé");

        return error || null;
    }

    const handleTicketQuantityChange = (fieldName, newValue) => {

        const minRaw = fieldName === "minimumOrderQuantity" ? newValue : ticket.minimumOrderQuantity.value;
        const maxRaw = fieldName === "maximumOrderQuantity" ? newValue : ticket.maximumOrderQuantity.value;
        const totalRaw = fieldName === "totalQuantity" ? newValue : ticket.totalQuantity.value;

        const min = Number(minRaw);
        const max = Number(maxRaw);
        const total = Number(totalRaw);

        updateNewTicketField(fieldName, newValue);

        const minError = validateTicketMinimumOrderQuantity(min, max);
        const maxError = validateTicketMaximumOrderQuantity(max, min, total);
        const totalError = validateTicketTotalQuantity(total, max);

        updateNewTicketError("minimumOrderQuantity", minError);
        updateNewTicketError("maximumOrderQuantity", maxError);
        updateNewTicketError("totalQuantity", totalError);

    }


    return (
        <Dialog
            open={openState}
            onClose={handleCloseDialog}
            slotProps={{
                paper: {
                    sx: {
                        width: "90vw",          // gần full màn hình trên thiết bị nhỏ
                        maxWidth: "800px",      // giới hạn ở màn to
                    },
                },
            }}
        >
            <DialogTitle>Thêm loại vé mới</DialogTitle>
            <DialogContent>
                <Stack direction={'row'} spacing={1} mt={2}>
                    <ValidationTextField
                        label="Tên loại vé"
                        fieldName="name"
                        value={ticket.name.value}
                        error={ticket.name.error}
                        validatorFunction={validateTicketName}
                        setValue={updateNewTicketField}
                        setError={updateNewTicketError}
                        isRequired={true}
                        isDisabled={isDisabled}
                        type="text"
                    />

                    <ValidationTextField
                        label="Mô tả loại vé"
                        fieldName="description"
                        value={ticket.description.value}
                        error={ticket.description.error}
                        validatorFunction={validateTicketDescription}
                        setValue={updateNewTicketField}
                        setError={updateNewTicketError}
                        isRequired={true}
                        isDisabled={isDisabled}
                        type="text"
                    />
                </Stack>
                <Stack direction={'row'} spacing={1} mt={2}>
                    <ValidateNumberField
                        isRequired={true}
                        isDisabled={isDisabled}
                        label="Giá vé"
                        fieldName="price"
                        value={ticket.price.value}
                        error={ticket.price.error}
                        validatorFunction={validateTicketPrice}
                        setValue={updateNewTicketField}
                        setError={updateNewTicketError}
                        minValue={0}
                        maxValue={100000000}
                    />

                    <ValidateNumberField
                        isRequired={true}
                        isDisabled={isDisabled}
                        label="Số lượng vé"
                        fieldName="totalQuantity"
                        value={ticket.totalQuantity.value}
                        error={ticket.totalQuantity.error}
                        minValue={1}
                        maxValue={100000}
                        onChange={val => handleTicketQuantityChange("totalQuantity", val)}
                    />
                </Stack>
                <Stack direction={'row'} spacing={1} mt={2}>
                    <ValidateNumberField
                        isRequired={true}
                        isDisabled={isDisabled}
                        label="Lượng vé tối thiểu trong 1 đơn hàng"
                        fieldName="minimumOrderQuantity"
                        value={ticket.minimumOrderQuantity.value}
                        error={ticket.minimumOrderQuantity.error}
                        minValue={1}
                        maxValue={100000}
                        onChange={val => handleTicketQuantityChange("minimumOrderQuantity", val)}
                    />
                    <ValidateNumberField
                        isRequired={true}
                        isDisabled={isDisabled}
                        label="Lượng vé tối đa trong 1 đơn hàng"
                        fieldName="maximumOrderQuantity"
                        value={ticket.maximumOrderQuantity.value}
                        error={ticket.maximumOrderQuantity.error}
                        minValue={1}
                        maxValue={100000}
                        onChange={(val) => handleTicketQuantityChange("maximumOrderQuantity", val)}
                    />

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Hủy</Button>
                <Button onClick={handleSaveTicket} variant="contained" sx={{color: "white"}}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TicketModal;