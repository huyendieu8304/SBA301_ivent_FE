import {Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {checkPasswordAndRePasswordInput, checkRequiredInput} from "../../common/ValidateFunction.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";
import ValidatedIconTextField from "../../component/validateInput/ValidateIconTextField.jsx";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ConfirmModal from "../../component/ConfirmModal.jsx";
import accountSettingApi from "../../api/service/accountSettingApi.jsx";

const initialState = {
    oldPassword: {value: "", error: ""},
    newPassword: {value: "", error: ""},
    reNewPassword: {value: "", error: ""},
}

const ChangePasswordPage = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState(initialState);
    const [isOpen, setIsOpen] = useState(false);
    const [requestBody, setRequestBody] = useState(null);

    const updateField = (fieldName, newValue) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                value: newValue,
            },
        }));
    };

    const updateError = (fieldName, errorMsg) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                error: errorMsg,
            },
        }));
    };

    const validateOldPassword = (value) => {
        const fieldName = "Mật khẩu cũ";
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validateNewPassword = (value) => {
        const fieldName = "Mật khẩu mới";
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validateReNewPassword = (value, relatedValue) => {
        const fieldName = "Xác nhận mật khẩu mới";
        const relatedFieldName = "Mật khẩu mới";
        const error = checkRequiredInput(fieldName, value) || checkPasswordAndRePasswordInput(fieldName, value, relatedFieldName, relatedValue);
        if (error) {0
            return error;
        }
        return null;
    }

    const submitForm = () => {
        const newPasswordErr = validateNewPassword(formFields.newPassword.value);
        const reNewPasswordErr = validateReNewPassword(formFields.reNewPassword.value, formFields.newPassword.value);
        updateError("newPassword", newPasswordErr || "");
        updateError("reNewPassword", reNewPasswordErr || "");
        if (newPasswordErr || reNewPasswordErr) {
            return;
        }
        const body = {
            oldPassword: formFields.oldPassword.value,
            newPassword: formFields.newPassword.value,
        }
        setRequestBody(body);
        setIsOpen(true);
    };

    const handleChangePassword = () => {
        setIsOpen(false);
        if (requestBody) {
            setIsLoading(true);
            accountSettingApi.changePassword(requestBody, changeSuccess, changeFailure);
        }
    }
    const changeSuccess = (data) => {
        setIsLoading(false);
        setFormFields(initialState);
        messageService.showMessage(Messages.MSG_I_00012, MESSAGE_TYPES.INFO);
    }
    const changeFailure = (error) => {
        console.log(error);
        setIsLoading(false);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
    }

    return (<>
        <ConfirmModal title={"Đổi mật khẩu"} open={isOpen} setOpen={setIsOpen} hasCancel={true}
                      handleConfirmSubmit={handleChangePassword}
                      content={"Bạn có chắc chắn muốn thay đổi mật khẩu?"}
        />
        <Container maxWidth="xl" sx={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            height: "fit-content",
        }}>
            <Card sx={{width: "fit-content", minWidth: "400px", height: "fit-content", borderRadius: "16px",}}>
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 !important"
                }}>
                    <Stack sx={{
                        width: "100%",
                        height: "80px",
                        marginBottom: "24px",
                        backgroundColor: theme.palette.primary.main,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "end"
                    }}>
                        <Typography variant="h5" component="div"
                                    sx={{fontWeight: "bold", color: "white", textAlign: "center", marginBottom: 2}}>
                            Đổi mật khẩu
                        </Typography>
                        <MascotSvg/>
                    </Stack>
                    <Stack direction="column" spacing={3} sx={{width: "80%"}}>
                        {/*<ValidatedIconTextField label="Mật khẩu cũ" fieldName="oldPassword"*/}
                        {/*                        value={formFields.oldPassword.value} setValue={updateField}*/}
                        {/*                        error={formFields.oldPassword.error} setError={updateError}*/}
                        {/*                        isRequired={true} size="small" type="password"*/}
                        {/*                        validatorFunction={validateOldPassword}*/}
                        <ValidatedIconTextField label="Mật khẩu cũ" fieldName="oldPassword"
                                                value={formFields.oldPassword.value} setValue={updateField}
                                                error={formFields.oldPassword.error} setError={updateError}
                                                isRequired={false} size="small" type="password"
                                                validatorFunction={()=>{}}
                                                endIcon={<VisibilityOffIcon/>}/>
                        <ValidatedIconTextField label="Mật khẩu mới" fieldName="newPassword"
                                                value={formFields.newPassword.value} setValue={updateField}
                                                error={formFields.newPassword.error} setError={updateError}
                                                isRequired={true} size="small" type="password"
                                                validatorFunction={validateNewPassword}
                                                endIcon={<VisibilityOffIcon/>}/>
                        <ValidatedIconTextField label="Xác nhận mật khẩu mới" fieldName="reNewPassword"
                                                value={formFields.reNewPassword.value} setValue={updateField}
                                                error={formFields.reNewPassword.error} setError={updateError}
                                                isRequired={true} size="small" type="password"
                                                isRePasswordInput={true}
                                                relatedValue={formFields.newPassword.value}
                                                validatorFunction={validateReNewPassword}
                                                endIcon={<VisibilityOffIcon/>}/>
                    </Stack>
                    <Button variant="contained" color="primary" sx={{textTransform: "none", margin: "24px"}}
                            onClick={submitForm}>
                        <Typography variant="body1" component="div"
                                    sx={{color: "white", textAlign: "center"}}>
                            Đổi mật khẩu
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </Container>
        {isLoading && <LoadingComponent/>}
    </>)
}
export default ChangePasswordPage;