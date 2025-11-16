import Box from "@mui/material/Box";
import ValidationTextField from "../validateInput/ValidationTextField.jsx";
import React from "react";
import {InputLabel, Stack, Typography} from "@mui/material";
import {checkRequiredInput, checkStringMaxLength} from "../../common/ValidateFunction.jsx";

function EventPayment({
                          isDisabled = false,
                          formFields,
                          setFormFields,
                          updateField,
                          updateError
}) {
     const validateEventBankName = (value) => {
         const fieldName = formFields.bankName.label;
         const error = checkRequiredInput(fieldName, value)
            || checkStringMaxLength(value, fieldName, 200)
         ;
         return error || null;
     }

     const validateEventBankBranch = (value) => {
         const fieldName = formFields.bankBranch.label;
         const error = checkRequiredInput(fieldName, value)
            || checkStringMaxLength(value, fieldName, 200)
         ;
         return error || null;
     }

     const validateEventBankNumber = (value) => {
         const fieldName = formFields.bankNumber.label;
         const error = checkRequiredInput(fieldName, value)
             || checkStringMaxLength(value, fieldName, 200)
         ;
         return error || null;
     }

     const validateEventBankAccountOwner = (value) => {
         const fieldName = formFields.bankAccountOwner.label;
         const error = checkRequiredInput(fieldName, value)
            || checkRequiredInput(fieldName, value)
         ;
         return error || null;
     }

    return (

        <Box sx={{
            marginTop: '20px',
        }}>
            <Stack
                spacing={1}
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                    color: 'white',
                }}
            >
                <InputLabel sx={{marginLeft: "4px"}}>
                        <span style={{color: "#027A48"}}>
                            Thông tin thanh toán <span style={{color: "red"}}>*</span>
                        </span>
                </InputLabel>
                <Typography variant="body2" color="textSecondary">
                    Tiền bán vé (sau khi trừ phí dịch vụ cho ivent)
                    sẽ vào tài khoản của bạn sau khi xác nhận sale report từ 7 - 10 ngày.
                    Nếu bạn muốn nhận được tiền sớm hơn, vui lòng liên hệ chúng tôi
                </Typography>
                <ValidationTextField
                    label={formFields.bankName.label}
                    fieldName="bankName"
                    value={formFields.bankName.value}
                    error={formFields.bankName.error}
                    validatorFunction={validateEventBankName}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    isDisabled={isDisabled}
                    type="text"
                />
                <ValidationTextField
                    label={formFields.bankBranch.label}
                    fieldName="bankBranch"
                    value={formFields.bankBranch.value}
                    error={formFields.bankBranch.error}
                    validatorFunction={validateEventBankBranch}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    isDisabled={isDisabled}
                    type="text"
                />
                <ValidationTextField
                    label={formFields.bankNumber.label}
                    fieldName="bankNumber"
                    value={formFields.bankNumber.value}
                    error={formFields.bankNumber.error}
                    validatorFunction={validateEventBankNumber}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    isDisabled={isDisabled}
                    type="text"
                />
                <ValidationTextField
                    label={formFields.bankAccountOwner.label}
                    fieldName="bankAccountOwner"
                    value={formFields.bankAccountOwner.value}
                    error={formFields.bankAccountOwner.error}
                    validatorFunction={validateEventBankAccountOwner}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    isDisabled={isDisabled}
                    type="text"
                />
            </Stack>

        </Box>

    );
}

export default EventPayment;