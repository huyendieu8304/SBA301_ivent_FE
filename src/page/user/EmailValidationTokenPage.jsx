import {Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import accountSettingApi from "../../api/service/accountSettingApi.jsx";
import {useState} from "react";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";
import ConfirmModal from "../../component/ConfirmModal.jsx";
import ValidationTextField from "../../component/validateInput/ValidationTextField.jsx";
import {checkEmailFormat, checkRequiredInput} from "../../common/ValidateFunction.jsx";

const EmailValidationTokenPage = () => {
    const theme = useTheme();
    const {token} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formFields, setFormFields] = useState({
        email: {value: "", error: ""},
    });


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

    const validateEmail = (value) => {
        const fieldName = "Email";
        const error = checkRequiredInput(fieldName, value) || checkEmailFormat(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const handleValidateToken = () => {
        accountSettingApi.validateEmailToken({token}, handleValidateSuccess, handleFail);
        setIsLoading(true);
    }

    const handleValidateSuccess = (data) => {
        if (data.code === 1000) {
            navigate("/login", {replace: true});
            messageService.showMessage(Messages.MSG_I_00003, MESSAGE_TYPES.INFO);
        } else {
            setIsLoading(false);
            messageService.showMessage(data.message, MESSAGE_TYPES.INFO);
        }
    }

    const handleSuccess = (data) => {
        if (data.code === 1000) {
            navigate("/login", {replace: true});
            messageService.showMessage(Messages.MSG_I_00004, MESSAGE_TYPES.INFO);
        } else {
            setIsLoading(false);
            messageService.showMessage(data.message, MESSAGE_TYPES.INFO);
        }
    }

    const handleFail = (error) => {
        console.log(error);
        setIsLoading(false);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
    }

    const handleResendEmailToken = () => {
        const emailErr = validateEmail(formFields.email.value);
        updateError("email", emailErr || "");
        if (emailErr) {
            return;
        }
        const body = {
            email: formFields.email.value,
        }
        setIsLoading(true);
        accountSettingApi.resendEmailToken(body, handleSuccess, handleFail);
    }

    return (
        <>
            <Container maxWidth="xl" sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                height: "fit-content",
            }}>
                <Card sx={{width: "fit-content", minWidth: "600px", height: "fit-content", borderRadius: "16px",}}>
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
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            marginBottom: 2
                                        }}>
                                Xác thực thông tin đăng ký tài khoản
                            </Typography>
                            <MascotSvg/>
                        </Stack>
                        <Typography variant="subtitle1" color="black">
                            Bạn vui lòng nhấn nút xác thực để xác thực thông tin
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{margin: "24px"}}>
                            <Button variant="outlined" sx={{width: "200px", textTransform: "none"}}
                                    onClick={() => setOpen(true)}>
                                <Typography variant="subtitle1"> Gửi lại mã </Typography>
                            </Button>
                            <Button variant="contained" sx={{width: "200px", textTransform: "none"}}
                                    onClick={handleValidateToken}>
                                <Typography variant="subtitle1" color="white"> Xác thực </Typography>
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
            <ConfirmModal open={open} setOpen={setOpen} title={"Gửi lại mã xác nhận"}
                          handleConfirmSubmit={handleResendEmailToken}
                          content={
                              <Stack direction="column" spacing={2}>
                                  <Typography variant="subtitle1"> Hãy nhập email để nhận mã xác nhận </Typography>
                                  <ValidationTextField label="Email" fieldName="email" value={formFields.email.value}
                                                       setValue={updateField} error={formFields.email.error}
                                                       setError={updateError} isRequired={true} size="small"
                                                       type="text"
                                                       validatorFunction={validateEmail}/>
                              </Stack>
                          }
            />
            {isLoading && <LoadingComponent/>}
        </>
    )
}

export default EmailValidationTokenPage;