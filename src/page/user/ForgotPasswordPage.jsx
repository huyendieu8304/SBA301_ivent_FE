import {useNavigate, useParams} from "react-router";
import {Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import ValidatedIconTextField from "../../component/validateInput/ValidateIconTextField.jsx";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {useState} from "react";
import {
    checkPasswordAndRePasswordInput,
    checkRequiredInput,
} from "../../common/ValidateFunction.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import accountSettingApi from "../../api/service/accountSettingApi.jsx";

const ForgotPasswordPage = () => {
    const {token} = useParams();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        password: {value: "", error: ""},
        rePassword: {value: "", error: ""},
    });
    const navigate = useNavigate();

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

    const validatePassword = (value) => {
        const fieldName = "Mật khẩu";
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validateRePassword = (value, relatedValue) => {
        const fieldName = "Xác nhận mật khẩu";
        const relatedFieldName = "Mật khẩu";
        const error = checkRequiredInput(fieldName, value) || checkPasswordAndRePasswordInput(fieldName, value, relatedFieldName, relatedValue);
        if (error) {
            return error;
        }
        return null;
    }

    const submitForm = () => {
        const passwordErr = validatePassword(formFields.password.value);
        const rePasswordErr = validateRePassword(formFields.rePassword.value, formFields.password.value);
        updateError("password", passwordErr || "");
        updateError("rePassword", rePasswordErr || "");
        if (passwordErr || rePasswordErr) {
            return;
        }
        const body = {
            token: token,
            password: formFields.password.value,
        }
        setIsLoading(true);
        accountSettingApi.setPassword(body, setPasswordSuccess, setPasswordFail);
    };
    const setPasswordSuccess = (data) => {
        messageService.showMessage(Messages.MSG_I_00007, MESSAGE_TYPES.INFO);
        navigate("/login", {replace: true});
    }
    const setPasswordFail = (error) => {
        console.log(error);
        setIsLoading(false);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
    }

    return (
        <>
            <Container maxWidth="lg" sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
                                Tạo mật khẩu mới
                            </Typography>
                            <MascotSvg/>
                        </Stack>
                        <Stack direction="column" spacing={3} sx={{width: "80%"}}>
                            {/*<Stack direction="row" spacing={3} sx={{width: "100%"}}>*/}
                                <ValidatedIconTextField label="Mật khẩu" fieldName="password"
                                                        value={formFields.password.value}
                                                        setValue={updateField} error={formFields.password.error}
                                                        setError={updateError} isRequired={true} size="small"
                                                        type="password"
                                                        validatorFunction={validatePassword}
                                                        endIcon={<VisibilityOffIcon/>}/>
                                <ValidatedIconTextField label="Xác nhận mật khẩu" fieldName="rePassword"
                                                        value={formFields.rePassword.value}
                                                        setValue={updateField} error={formFields.rePassword.error}
                                                        setError={updateError} isRequired={true} size="small"
                                                        type="password"
                                                        isRePasswordInput={true}
                                                        relatedValue={formFields.password.value}
                                                        validatorFunction={validateRePassword}
                                                        endIcon={<VisibilityOffIcon/>}/>
                            {/*</Stack>*/}
                        </Stack>
                        <Button variant="contained" color="primary" sx={{textTransform: "none", margin: "24px"}}
                                onClick={submitForm}>
                            <Typography variant="body1" component="div"
                                        sx={{color: "white", textAlign: "center"}}>
                                Tạo mật khẩu
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            {isLoading && <LoadingComponent/>}
        </>
    );
}

export default ForgotPasswordPage;