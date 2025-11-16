import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {
    checkAllFieldsValid,
    checkDateAfter,
    checkDateBefore,
    checkRequiredInput,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import {DATETIME_FORMAT, MESSAGE_TYPES} from "../../common/Constant.jsx";
import {ValidateDateTimePicker} from "../validateInput/ValidateDateTimePicker.jsx";
import {
    Button,
    InputLabel,
    Stack,
    Paper,
    IconButton,
    Typography,
} from "@mui/material";
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';

import TicketModal from "./TicketModal.jsx";
import {messageService} from "../../service/MessageService.jsx";
import ConfirmModal from "../ConfirmModal.jsx";
import ValidateRadioGroup from "../validateInput/ValidateRadioGroup.jsx";

function EventTicket({
                         isDisabled = false,
                         formFields,
                         setFormFields,
                         updateField,
                         updateError}) {

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [deletingIndex, setDeletingIndex] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newTicket, setNewTicket] = useState({
        id: formFields.ticketType?.value? formFields.ticketType.value.length : 0,
        name: {needToCheckBeForSubmit: true, value: "", error: ""},
        description: {needToCheckBeForSubmit: true, value: "", error: ""},
        price: {needToCheckBeForSubmit: true, value: "", error: ""},
        totalQuantity: {needToCheckBeForSubmit: true, value: "", error: ""},
        minimumOrderQuantity: {needToCheckBeForSubmit: true, value: "", error: ""},
        maximumOrderQuantity: {needToCheckBeForSubmit: true, value: "", error: ""},
    });

    const validateIsFree = (value) => {
        const fieldName = formFields.isFree.label;
        const error = checkRequiredInput(fieldName, value);
        return error || null;

    }

    const handleOpenDialog = () => {
        setNewTicket({
            id: formFields.ticketType.value.length,
            name: {needToCheckBeForSubmit: true, value: "", error: ""},
            description: {needToCheckBeForSubmit: true, value: "", error: ""},
            price: {needToCheckBeForSubmit: true, value: "", error: ""},
            totalQuantity: {needToCheckBeForSubmit: true, value: "", error: ""},
            minimumOrderQuantity: {needToCheckBeForSubmit: true, value: "", error: ""},
            maximumOrderQuantity: {needToCheckBeForSubmit: true, value: "", error: ""},
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveTicket = () => {
        const errorMessage = checkAllFieldsValid(newTicket);
        //còn lỗi thì không cho lưu đâu hẹ hẹ :>
        if (errorMessage) {
            messageService.showMessage(errorMessage, MESSAGE_TYPES.ERROR);
            return;
        }

        const updatedTickets = [...formFields.ticketType.value];
        const existingIndex = updatedTickets.findIndex(t => t.id === newTicket.id);

        if (existingIndex !== -1) {
            // Nếu đã tồn tại => cập nhật
            updatedTickets[existingIndex] = newTicket;
        } else {
            // Nếu chưa có => thêm mới
            updatedTickets.push(newTicket);
        }

        updateField("ticketType", updatedTickets);
        setOpenDialog(false);
    };

    const handleDeleteTicket = (index) => {
        setDeletingIndex(index);
        setOpenConfirmModal(true);
    };

    const handleConfirmDeleteTicket = () => {
        if (deletingIndex !== null) {
            const updated = formFields.ticketType.value.filter((_, i) => i !== deletingIndex);
            updateField("ticketType", updated);
            setDeletingIndex(null);          // Reset lại index
            setOpenConfirmModal(false);      // Đóng modal
        }
    }

    const handleEditTicket = (index) => {
        const ticket = formFields.ticketType.value[index];
        setNewTicket(ticket);
        setOpenDialog(true);
    }

    // VALIDATE SELLING TIME
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
                <ValidateRadioGroup
                    label={formFields.isFree.label}
                    fieldName="isFree"
                    value={formFields.isFree.value}
                    error={formFields.isFree.error}
                    validatorFunction={validateIsFree}
                    setValue={updateField}
                    setError={updateError}
                    listOptions={[
                        {value: false, label: "Sự kiện trả phí"},
                        {value: true, label: "Sự kiện miễn phí"},
                    ]}
                    size="medium"
                    isRequired={true}
                    isDisabled={isDisabled}
                    defaultValue={false}
                />
            </Box>

            {!formFields.isFree.value && (
                <Box
                    sx={{
                        margin: "10px 10px",
                        backgroundColor: "white",
                        borderRadius: '4px',
                        padding: '10px',
                    }}
                >
                    <InputLabel sx={{marginLeft: "4px"}}>
                        <span style={{color: "#027A48"}}>
                            Thời gian bán vé <span style={{color: "red"}}>*</span>
                        </span>
                    </InputLabel>
                    <Stack direction={'row'} spacing={1} mt={1}>
                        <ValidateDateTimePicker
                            isRequired={true}
                            isDisabled={isDisabled}
                            label={formFields.startSellingTicketTime.label}
                            fieldName="startSellingTicketTime"
                            value={formFields.startSellingTicketTime.value}
                            error={formFields.startSellingTicketTime.error}
                            // setValue={updateField}
                            // setError={null}
                            // validatorFunction={(val) => handleStartEndChange("startSellingTicketTime", val)}
                            onChange={(val) => handleStartEndChange("startSellingTicketTime", val)}
                        />
                        <ValidateDateTimePicker
                            isRequired={true}
                            isDisabled={isDisabled}
                            label={formFields.endSellingTicketTime.label}
                            fieldName="endSellingTicketTime"
                            value={formFields.endSellingTicketTime.value}
                            error={formFields.endSellingTicketTime.error}
                            // setValue={updateField}
                            // setError={null}
                            // validatorFunction={(val) => handleStartEndChange("endSellingTicketTime", val)}
                            onChange={(val) => handleStartEndChange("endSellingTicketTime", val)}
                        />
                    </Stack>
                    {/*TICKET*/}
                    <InputLabel sx={{marginLeft: "4px", marginTop: "8px"}} >
                        <span style={{color: "#027A48"}}>
                            Loại vé <span style={{color: "red"}}>*</span>
                        </span>
                    </InputLabel>

                    {formFields.ticketType?.value?.map((ticket, index) => (
                        <Paper
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <ConfirmationNumber
                                    sx={{
                                        fontSize: '32px',
                                        color: "#757575",
                                        paddingLeft: "8px",
                                    }}
                                />
                                <Typography sx={{paddingLeft: "8px"}} alignContent={"center"}>
                                    {ticket.name.value}
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleEditTicket(index)} >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    disabled={isDisabled}
                                    onClick={() => handleDeleteTicket(index)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))}

                    {!isDisabled && (
                        <Box display="flex" justifyContent="center">
                            <Button
                                variant="outlined"
                                startIcon={<Add/>}
                                onClick={handleOpenDialog}
                            >
                                Tạo loại vé mới
                            </Button>
                        </Box>
                    )}

                    {/* Dialog thêm vé */}
                    <TicketModal
                        openState={openDialog}
                        handleCloseDialog={handleCloseDialog}
                        handleSaveTicket={handleSaveTicket}
                        ticket={newTicket}
                        setTicket={setNewTicket}
                        isDisabled={isDisabled}
                    />
                    <ConfirmModal
                        open={openConfirmModal}
                        setOpen={setOpenConfirmModal}
                        title={"Xác nhận xóa"}
                        handleConfirmSubmit={handleConfirmDeleteTicket}
                        content={"Bạn xác nhận muốn xóa loại vé này khỏi sự kiện?"}
                    />
                </Box>
            )}
        </Box>
    );
}

export default EventTicket;