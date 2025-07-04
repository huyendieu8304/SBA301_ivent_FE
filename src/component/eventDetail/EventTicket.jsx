import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {
    checkDateAfter,
    checkDateBefore, checkNumberGreaterThan, checkNumberSmallerThan,
    checkRequiredInput, checkStringMaxLength,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import {DATETIME_FORMAT} from "../../common/Constant.jsx";
import {ValidateDateTimePicker} from "../validateInput/ValidateDateTimePicker.jsx";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    DialogActions,
    DialogContent,
    InputLabel,
    Stack,
    Paper,
    IconButton,
    TextField,
    Typography,
    useTheme
} from "@mui/material";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import ValidationTextField from "../validateInput/ValidationTextField.jsx";
import ValidateNumberField from "../validateInput/ValidateNumberField.jsx";

const GRAY_COLOR = "#3b3b3d"

const TICKET_TYPE= {
    id: "",
    name: "",
    description: "",
    price: "",
    totalQuantity: "",
    minimumOrderQuantity: "",
    maximumOrderQuantity: "",

}

function EventTicket({ formFields, setFormFields, updateField, updateError}) {
    // console.log("ticket ne")
    // console.log(formFields.ticketType.value)


    // const [tickets, setTickets] = useState(formFields.ticketType.value);
    const [openDialog, setOpenDialog] = useState(false);
    const [newTicket, setNewTicket] = useState({
        id: "",
        name: {label: "Tên loại vé", value: "", error: ""},
        description: {label: "Mô tả loại vé", value: "", error: ""},
        price: {label: "Giá vé", value: "", error: ""},
        totalQuantity: {label: "Số lượng vé", value: "", error: ""},
        minimumOrderQuantity: {label: "Lượng vé tối thiểu trong 1 đơn hàng", value: "", error: ""},
        maximumOrderQuantity: {label: "Lượng vé tối đa trong 1 đơn hàng", value: "", error: ""},
    });

    const handleOpenDialog = () => {
        setNewTicket({
            id: "",
            name: {label: "Tên loại vé", value: "", error: ""},
            description: {label: "Mô tả loại vé", value: "", error: ""},
            price: {label: "Giá vé", value: "", error: ""},
            totalQuantity: {label: "Số lượng vé", value: "", error: ""},
            minimumOrderQuantity: {label: "Lượng vé tối thiểu trong 1 đơn hàng", value: "", error: ""},
            maximumOrderQuantity: {label: "Lượng vé tối đa trong 1 đơn hàng", value: "", error: ""},
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveTicket = () => {
        updateField("ticketType", [... formFields.ticketType.value, newTicket]);
        setOpenDialog(false);
    };

    const handleDeleteTicket = (index) => {
        //cần confirm
        const updated = formFields.ticketType.value.filter((_, i) => i !== index);
        updateField("ticketType", updated);
    };

    const updateNewTicketField = (fieldName, newValue) => {
        setNewTicket((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                value: newValue,
            },
        }));
    };

    const updateNewTicketError = (fieldName, errorMsg) => {
        setNewTicket((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                error: errorMsg,
            },
        }));
    };

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

    // VALIDATE TICKET INFORMATION
    const validateTicketName = (value) => {
        const fieldName = newTicket.name.label;
        const error = checkRequiredInput(fieldName, value) || checkStringMaxLength(value, fieldName, 100);
        return error || null;
    }
    const validateTicketDescription = (value) => {
        const fieldName = newTicket.description.label;
        const error = checkRequiredInput(fieldName, value) || checkStringMaxLength(value, fieldName, 250);
        return error || null;
    }

    // todo validate laij price
    const validateTicketPrice = (value) => {
        const fieldName = newTicket.price.label;
        const error = checkRequiredInput(fieldName, value);
        return error || null;
    }


    //VALIDATE TICKET QUANTITY
    const validateTicketTotalQuantity = (total, max) => {
        const fieldName = newTicket.totalQuantity.label;
        const error = checkRequiredInput(fieldName, total)
            || checkNumberGreaterThan(fieldName, total, max, newTicket.maximumOrderQuantity.label)
        ;
        return error || null;
    }

    const validateTicketMinimumOrderQuantity = (min, max) => {
        const fieldName = newTicket.minimumOrderQuantity.label;

        const error = checkRequiredInput(fieldName, min)
            || checkNumberSmallerThan(fieldName, min, max, newTicket.maximumOrderQuantity.label);

        return error || null;
    }

    const validateTicketMaximumOrderQuantity = (max, min, total) => {
        const fieldName = newTicket.maximumOrderQuantity.label;

        const error = checkRequiredInput(fieldName, max)
            || checkNumberGreaterThan(fieldName, max, min, newTicket.minimumOrderQuantity.label)
            || checkNumberSmallerThan(fieldName, max, total, newTicket.totalQuantity.label);

        return error || null;
    }

    const handleTicketQuantityChange = (fieldName, newValue) => {

        const minRaw = fieldName === "minimumOrderQuantity" ? newValue : newTicket.minimumOrderQuantity.value;
        const maxRaw = fieldName === "maximumOrderQuantity" ? newValue : newTicket.maximumOrderQuantity.value;
        const totalRaw = fieldName === "totalQuantity" ? newValue : newTicket.totalQuantity.value;

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
        // todo isFree đồ nữa, free thì thôi khỏi vé
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
                <InputLabel sx={{marginLeft: "4px"}}>
                        <span style={{color: "#027A48"}}>
                            Thời gian bán vé <span style={{color: "red"}}>*</span>
                        </span>
                </InputLabel>
                <Stack direction={'row'} spacing={1} mt={1}>
                    <ValidateDateTimePicker
                        isRequired={true}
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

                {formFields.ticketType?.value.map((ticket, index) => (
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
                                {/*todo edit ticket*/}
                            <IconButton >
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteTicket(index)}>
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}

                <Box display="flex" justifyContent="center">
                <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleOpenDialog}
                >
                    Tạo loại vé mới
                </Button>

                </Box>

                {/* Dialog thêm vé */}
                <Dialog
                    open={openDialog}
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
                                label={newTicket.name.label}
                                fieldName="name"
                                value={newTicket.name.value}
                                error={newTicket.name.error}
                                validatorFunction={validateTicketName}
                                setValue={updateNewTicketField}
                                setError={updateNewTicketError}
                                isRequired={true}
                                type="text"
                            />

                            <ValidationTextField
                                label={newTicket.description.label}
                                fieldName="description"
                                value={newTicket.description.value}
                                error={newTicket.description.error}
                                validatorFunction={validateTicketDescription}
                                setValue={updateNewTicketField}
                                setError={updateNewTicketError}
                                isRequired={true}
                                type="text"
                            />
                        </Stack>

                        <Stack direction={'row'} spacing={1} mt={2}>
                            <ValidateNumberField
                                isRequired={true}
                                label={newTicket.price.label}
                                fieldName="price"
                                value={newTicket.price.value}
                                error={newTicket.price.error}
                                validatorFunction={validateTicketPrice}
                                setValue={updateNewTicketField}
                                setError={updateNewTicketError}
                                minValue={0}
                                maxValue={100000000}
                            />

                            <ValidateNumberField
                                isRequired={true}
                                label={newTicket.totalQuantity.label}
                                fieldName="totalQuantity"
                                value={newTicket.totalQuantity.value}
                                error={newTicket.totalQuantity.error}
                                minValue={1}
                                maxValue={100000}
                                onChange={val => handleTicketQuantityChange("totalQuantity", val)}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={1} mt={2}>
                            <ValidateNumberField
                                isRequired={true}
                                label={newTicket.minimumOrderQuantity.label}
                                fieldName="minimumOrderQuantity"
                                value={newTicket.minimumOrderQuantity.value}
                                error={newTicket.minimumOrderQuantity.error}
                                minValue={1}
                                maxValue={100000}
                                onChange={val => handleTicketQuantityChange("minimumOrderQuantity", val)}
                            />
                            <ValidateNumberField
                                isRequired={true}
                                label={newTicket.maximumOrderQuantity.label}
                                fieldName="maximumOrderQuantity"
                                value={newTicket.maximumOrderQuantity.value}
                                error={newTicket.maximumOrderQuantity.error}
                                minValue={1}
                                maxValue={100000}
                                onChange={(val) => handleTicketQuantityChange("maximumOrderQuantity", val)}
                            />

                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Hủy</Button>
                        {/*todo phải không lỗi mơới cho tạo vé*/}
                        <Button onClick={handleSaveTicket} variant="contained" sx={{color: "white"}}>Lưu</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default EventTicket;